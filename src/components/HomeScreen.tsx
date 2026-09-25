import React from 'react';
import {
  MapPin,
  Clock,
  Zap,
  DollarSign,
  Hourglass,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Bus,
  Compass,
  AlertTriangle,
  Building,
  Bell,
  Radio,
  Hand,
  Smartphone,
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';
import { COMMON_ORIGINS } from '../data/mockRoutes';
import { PriorityMode } from '../types';
import { VKUWeatherModule } from './VKUWeatherModule';

export const HomeScreen: React.FC = () => {
  const {
    originName,
    setOriginName,
    destinationName,
    desiredArrivalTime,
    setDesiredArrivalTime,
    priority,
    setPriority,
    analyzeCommute,
    isAnalyzing,
    route6Telemetry,
    route13Telemetry,
    setActiveTab,
    setSelectedTrackingRoute,
    simulateSensorScanned,
    simulateTrafficCongested,
    simulateRoute13Approaching,
    setIsGesturesModalOpen,
  } = useSimulation();

  const priorityOptions: { id: PriorityMode; title: string; desc: string; icon: any; color: string }[] = [
    {
      id: 'fastest',
      title: 'Nhanh nhất',
      desc: 'Tối thiểu tổng thời gian di chuyển',
      icon: Zap,
      color: 'amber',
    },
    {
      id: 'cheapest',
      title: 'Tiết kiệm nhất',
      desc: 'Vé buýt sinh viên chỉ 5.000đ',
      icon: DollarSign,
      color: 'emerald',
    },
    {
      id: 'min_wait',
      title: 'Ít chờ nhất',
      desc: 'Đến trạm là có xe, giảm rủi ro',
      icon: Hourglass,
      color: 'blue',
    },
    {
      id: 'safest',
      title: 'An toàn & ổn định',
      desc: 'Đúng giờ, không lo nắng mưa & gửi xe',
      icon: ShieldCheck,
      color: 'teal',
    },
  ];

  const quickTimes = ['07:00', '07:15', '07:30', '07:45', '08:00', '13:00', '13:30'];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950/60 border border-slate-700/80 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trợ lý AI Đón Xe Buýt Thông Minh Cho Sinh Viên VKU</span>
            </div>
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
              Dữ liệu mô phỏng cho prototype
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            Đến trường VKU đúng giờ, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              không còn nỗi lo lỡ chuyến
            </span>
          </h1>

          <p className="mt-2.5 text-sm md:text-base text-slate-300 leading-relaxed">
            AI tự động so sánh Tuyến 06 & Tuyến 13 với xe máy cá nhân, dự đoán chính xác thời gian chờ và đề xuất thời điểm rời nhà tối ưu nhất.
          </p>

          {/* Quick Route Status Indicators */}
          <div className="mt-5 grid grid-cols-2 gap-2.5 max-w-lg">
            {/* Route 6 status snippet */}
            <div
              onClick={() => {
                setSelectedTrackingRoute('route_6');
                setActiveTab('track');
              }}
              className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-2xl p-3 cursor-pointer transition-all hover:border-blue-500/50"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  Tuyến 06
                </span>
                <span className="text-[10px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded font-mono">
                  {route6Telemetry.confidencePercent}% tin cậy
                </span>
              </div>
              <div className="mt-1 text-xs text-slate-300 font-medium">
                Chờ {route6Telemetry.estimatedArrivalMinMinutes}–{route6Telemetry.estimatedArrivalMaxMinutes} phút
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {route6Telemetry.delayMinutes > 0 ? (
                  <span className="text-amber-400 font-semibold">Trễ {route6Telemetry.delayMinutes} phút</span>
                ) : (
                  'Đang di chuyển ổn định'
                )}
              </div>
            </div>

            {/* Route 13 status snippet */}
            <div
              onClick={() => {
                setSelectedTrackingRoute('route_13');
                setActiveTab('track');
              }}
              className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-2xl p-3 cursor-pointer transition-all hover:border-emerald-500/50"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Tuyến 13
                </span>
                <span className="text-[10px] bg-slate-700 text-emerald-300 px-1.5 py-0.5 rounded font-mono">
                  {route13Telemetry.confidencePercent}% tin cậy
                </span>
              </div>
              <div className="mt-1 text-xs text-slate-200 font-medium">
                Chờ {route13Telemetry.estimatedArrivalMinMinutes}–{route13Telemetry.estimatedArrivalMaxMinutes} phút
              </div>
              <div className="text-[10px] text-emerald-400 truncate font-semibold">
                {route13Telemetry.delayMinutes > 0 ? `Trễ ${route13Telemetry.delayMinutes} ph` : 'Khuyến nghị tốt nhất'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time VKU Campus Weather Integration Module */}
      <VKUWeatherModule />

      {/* Main Journey Planning Form Card */}
      <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-5 md:p-7 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400" />
            <span>Thiết lập hành trình đến VKU</span>
          </h2>
          <span className="text-xs text-slate-400">Sinh viên VKU</span>
        </div>

        {/* Origin & Destination */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Origin */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Bạn đang ở đâu?</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={originName}
                onChange={(e) => setOriginName(e.target.value)}
                placeholder="Nhập địa chỉ hoặc khu vực xuất phát..."
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
              />
            </div>
            {/* Quick origin presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {COMMON_ORIGINS.slice(0, 3).map((orig) => (
                <button
                  key={orig.name}
                  onClick={() => setOriginName(orig.name)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                    originName === orig.name
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-semibold'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {orig.name.replace('Khu vực ', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Destination (Default: VKU) */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-blue-400" />
              <span>Điểm đến (Mặc định)</span>
            </label>
            <div className="relative flex items-center bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2 shrink-0 animate-ping"></div>
              <span className="font-semibold text-white truncate">{destinationName}</span>
              <span className="ml-auto bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                Đã khóa
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Khu Đô thị Đại học Đà Nẵng, Đường Nam Kỳ Khởi Nghĩa, Phường Hòa Quý
            </p>
          </div>
        </div>

        {/* Desired Arrival Time */}
        <div className="space-y-2.5 border-t border-slate-800/80 pt-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Bạn cần có mặt tại VKU lúc mấy giờ?</span>
            </label>
            <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
              {desiredArrivalTime}
            </span>
          </div>

          {/* Quick preset buttons */}
          <div className="flex flex-wrap gap-2">
            {quickTimes.map((t) => (
              <button
                key={t}
                onClick={() => setDesiredArrivalTime(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                  desiredArrivalTime === t
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-950/40 scale-105'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {t}
              </button>
            ))}
            {/* Custom input */}
            <input
              type="time"
              value={desiredArrivalTime}
              onChange={(e) => setDesiredArrivalTime(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* User Priority Selector */}
        <div className="space-y-2.5 border-t border-slate-800/80 pt-4">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Mức độ ưu tiên của bạn:</span>
            </span>
            <span className="text-[11px] text-slate-400 font-normal">
              AI sẽ tối ưu thuật toán theo lựa chọn này
            </span>
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {priorityOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = priority === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setPriority(opt.id)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-600/15 border-emerald-500 shadow-lg shadow-emerald-950/30'
                      : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-xs font-bold ${isSelected ? 'text-emerald-400' : 'text-slate-200'}`}>
                      {opt.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5 line-clamp-2">{opt.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Analyze Commute Button */}
        <div className="pt-2">
          <button
            onClick={analyzeCommute}
            disabled={isAnalyzing}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-base flex items-center justify-center gap-3 transition-all shadow-xl shadow-emerald-950/50 hover:shadow-emerald-900/60 disabled:opacity-60 active:scale-[0.99]"
          >
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-3 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                <span>AI đang phân tích luồng giao thông & ETA...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-slate-950" />
                <span>Phân tích hành trình & Đề xuất tối ưu</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

        {/* Quick Push Notification Triggers Strip */}
        <div className="pt-3 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 text-amber-400" />
              <span>Thử nghiệm thông báo đẩy (Toast):</span>
            </span>
            <span className="text-[11px] text-slate-500">Cập nhật tức thì không cần chuyển tab</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={simulateSensorScanned}
              className="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-teal-500/40 text-teal-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <Radio className="w-3.5 h-3.5 text-teal-400" />
              <span>Bắn thông báo: "Xe tuyến 13 đã đến trạm"</span>
            </button>

            <button
              onClick={() => simulateTrafficCongested(true)}
              className="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>Bắn thông báo: "Cảnh báo kẹt xe bất ngờ"</span>
            </button>
          </div>
        </div>

        {/* Mobile One-Handed Quick Access & Gesture Assist Card */}
        <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/30 p-3 rounded-2xl border border-slate-800/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">Chế độ Sử dụng 1 Tay & Cử chỉ Vuốt</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-bold">
                  One-Hand Reach
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Vuốt ngang màn hình để đổi tab hoặc dùng phím nổi hình bàn tay góc dưới để thao tác nhanh bằng ngón cái.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsGesturesModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-all self-start sm:self-auto shrink-0 shadow-sm"
          >
            <Hand className="w-3.5 h-3.5" />
            <span>Xem cử chỉ & phím tắt (?)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
