import React, { useState } from 'react';
import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  Wind,
  Droplets,
  Thermometer,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  Gauge,
  Info,
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';
import { WeatherCondition } from '../types';

interface VKUWeatherModuleProps {
  compact?: boolean;
}

export const VKUWeatherModule: React.FC<VKUWeatherModuleProps> = ({ compact = false }) => {
  const { vkuWeather, changeWeather, setActiveTab } = useSimulation();
  const [showHourly, setShowHourly] = useState(false);

  const getWeatherIcon = (cond: WeatherCondition, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-10 h-10',
    };
    const cls = sizeClasses[size];

    switch (cond) {
      case 'heavy_rain':
        return <CloudLightning className={`${cls} text-cyan-400 animate-bounce`} />;
      case 'rain':
        return <CloudRain className={`${cls} text-blue-400`} />;
      case 'cloudy':
        return <Cloud className={`${cls} text-slate-300`} />;
      case 'sunny':
      default:
        return <Sun className={`${cls} text-amber-400 animate-[spin_12s_linear_infinite]`} />;
    }
  };

  const weatherOptions: {
    id: WeatherCondition;
    label: string;
    temp: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      id: 'sunny',
      label: 'Nắng ráo',
      temp: '32°C',
      icon: <Sun className="w-4 h-4 text-amber-400" />,
      color: 'hover:border-amber-400',
    },
    {
      id: 'cloudy',
      label: 'Nhiều mây',
      temp: '28°C',
      icon: <Cloud className="w-4 h-4 text-slate-300" />,
      color: 'hover:border-slate-400',
    },
    {
      id: 'rain',
      label: 'Mưa rào',
      temp: '25°C',
      icon: <CloudRain className="w-4 h-4 text-blue-400" />,
      color: 'hover:border-blue-400',
    },
    {
      id: 'heavy_rain',
      label: 'Mưa to / Ngập',
      temp: '23°C',
      icon: <CloudLightning className="w-4 h-4 text-cyan-400" />,
      color: 'hover:border-cyan-400',
    },
  ];

  return (
    <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border border-slate-700/80 p-5 shadow-xl transition-all duration-300 relative overflow-hidden">
      {/* Background ambient glow based on weather condition */}
      <div
        className={`absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-20 ${
          vkuWeather.condition === 'heavy_rain'
            ? 'bg-cyan-500'
            : vkuWeather.condition === 'rain'
            ? 'bg-blue-500'
            : vkuWeather.condition === 'cloudy'
            ? 'bg-slate-400'
            : 'bg-amber-500'
        }`}
      ></div>

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3 relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Trạm Khí tượng VKU (Hòa Quý • Ngũ Hành Sơn)
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <p className="text-[11px] text-slate-400">
              Quan trắc vi khí hậu khuôn viên trường phục vụ thuật toán AI
            </p>
          </div>
        </div>

        {/* Flood or Weather Warning Badge */}
        {vkuWeather.floodRisk !== 'none' && (
          <div
            className={`self-start sm:self-auto px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 border animate-pulse ${
              vkuWeather.floodRisk === 'high'
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>
              {vkuWeather.floodRisk === 'high'
                ? 'Cảnh báo ngập đường Nam Kỳ Khởi Nghĩa (15-25cm)'
                : 'Nguy cơ đọng nước đoạn rẽ vào VKU'}
            </span>
          </div>
        )}
      </div>

      {/* Main Weather Information Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 relative z-10">
        {/* Left: Temperature & Condition Summary */}
        <div className="flex items-center gap-4 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
          <div className="shrink-0">{getWeatherIcon(vkuWeather.condition, 'lg')}</div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white font-mono">
                {vkuWeather.temperatureC}°C
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Cảm giác {vkuWeather.feelsLikeC}°C
              </span>
            </div>
            <div className="text-xs font-bold text-emerald-400 mt-0.5">
              {vkuWeather.conditionLabel}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              AQI: <strong className="text-emerald-300">{vkuWeather.airQualityAqi}</strong> (Tốt) • UV:{' '}
              <strong className={vkuWeather.uvIndex >= 6 ? 'text-amber-400' : 'text-slate-300'}>
                {vkuWeather.uvIndex}
              </strong>
            </div>
          </div>
        </div>

        {/* Center: Real-time environmental metrics */}
        <div className="grid grid-cols-2 gap-2 text-xs bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60">
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-800/80">
            <Droplets className="w-4 h-4 text-blue-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block">Độ ẩm</span>
              <span className="font-bold text-white font-mono">{vkuWeather.humidityPercent}%</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-800/80">
            <CloudRain className="w-4 h-4 text-cyan-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block">Xác suất mưa</span>
              <span className="font-bold text-cyan-300 font-mono">
                {vkuWeather.rainProbabilityPercent}%
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-800/80">
            <Wind className="w-4 h-4 text-teal-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block">Gió</span>
              <span className="font-bold text-white text-[11px] truncate block">
                {vkuWeather.windSpeedKmh} km/h
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-800/80">
            <Gauge className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block">Mặt đường</span>
              <span className="font-bold text-slate-200 text-[10px] truncate block">
                {vkuWeather.condition === 'sunny'
                  ? 'Khô ráo'
                  : vkuWeather.condition === 'heavy_rain'
                  ? 'Ngập trũng'
                  : 'Trơn ướt'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: AI Decision Impact Card */}
        <div className="bg-gradient-to-br from-emerald-950/40 via-slate-800/80 to-slate-800 p-3.5 rounded-2xl border border-emerald-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-1 mb-1.5">
              <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tác động trực tiếp vào AI</span>
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono font-bold">
                {vkuWeather.aiModeWeightImpact.busBonusPercent >= 20 ? 'Ưu tiên Xe Buýt' : 'Cân bằng'}
              </span>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-3">
              {vkuWeather.aiCommuteAdvice}
            </p>
          </div>

          <div className="pt-2 mt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">
                Xe buýt: +{vkuWeather.aiModeWeightImpact.busBonusPercent}%
              </span>
              {vkuWeather.aiModeWeightImpact.motorbikePenaltyPercent > 0 && (
                <span className="text-rose-400 font-semibold">
                  Xe máy: -{vkuWeather.aiModeWeightImpact.motorbikePenaltyPercent}%
                </span>
              )}
            </div>
            <button
              onClick={() => setActiveTab('compare')}
              className="text-emerald-300 hover:text-white flex items-center gap-0.5 font-bold transition-colors"
            >
              <span>Xem bảng điểm</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Weather Simulation Switcher Row */}
      <div className="pt-4 mt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>Thử nghiệm điều kiện thời tiết tại VKU:</span>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {weatherOptions.map((opt) => {
            const isSelected = vkuWeather.condition === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => changeWeather(opt.id)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                  isSelected
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold shadow-md shadow-emerald-950/40'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {opt.icon}
                <span>{opt.label}</span>
                <span className="text-[10px] font-mono opacity-80">({opt.temp})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hourly Forecast Toggle Button */}
      <div className="pt-2 text-center relative z-10">
        <button
          onClick={() => setShowHourly(!showHourly)}
          className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-emerald-400 font-medium transition-colors"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>
            {showHourly ? 'Ẩn dự báo theo ca học tại VKU' : 'Xem dự báo thời tiết theo ca học tại VKU'}
          </span>
          {showHourly ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Collapsible Hourly Forecast Strip */}
      {showHourly && (
        <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 animate-in fade-in slide-in-from-top-2 duration-200 relative z-10">
          {vkuWeather.hourlyForecast.map((h, i) => (
            <div
              key={i}
              className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-2.5 text-center space-y-1"
            >
              <span className="text-[10px] font-mono text-slate-400 block font-semibold">
                {h.time} {i === 0 ? '(Ca 1)' : i === 1 ? '(Ca 2)' : i === 2 ? '(Tan ca)' : '(Ca chiều)'}
              </span>
              <div className="flex items-center justify-center py-0.5">
                {getWeatherIcon(h.condition, 'sm')}
              </div>
              <div className="text-xs font-bold text-white font-mono">{h.tempC}°C</div>
              <div className="text-[10px] text-cyan-400 font-medium">Mưa: {h.rainProb}%</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
