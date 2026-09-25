/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SimulationProvider, useSimulation } from './context/SimulationContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { DemoTourBar } from './components/DemoTourBar';
import { HomeScreen } from './components/HomeScreen';
import { ComparisonScreen } from './components/ComparisonScreen';
import { TrackingScreen } from './components/TrackingScreen';
import { AlertsScreen } from './components/AlertsScreen';
import { AIDetailsScreen } from './components/AIDetailsScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { SimulationModal } from './components/SimulationModal';
import { ToastContainer } from './components/ToastContainer';
import { OneHandedQuickDial } from './components/OneHandedQuickDial';
import { OneHandedShortcutsModal } from './components/OneHandedShortcutsModal';
import { ThreeSplashAnimation } from './components/ThreeSplashAnimation';
import { useTouchSwipe } from './hooks/useTouchSwipe';
import { Sliders, Sparkles, Heart, School, Smartphone, ArrowRight, ArrowLeft } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    goToNextTab,
    goToPrevTab,
    isGesturesModalOpen,
    setIsGesturesModalOpen,
    handMode,
    toggleHandMode,
    selectedTrackingRoute,
    setSelectedTrackingRoute,
    vkuWeather,
    changeWeather,
    traffic,
    simulateTrafficCongested,
    simulateSensorScanned,
    showSplash,
    setShowSplash,
  } = useSimulation();

  const [isSimModalOpen, setIsSimModalOpen] = useState(false);

  // Enable mobile touch swipe gestures across screens
  useTouchSwipe({
    onSwipeLeft: goToNextTab,
    onSwipeRight: goToPrevTab,
    threshold: 55,
    maxPerpendicularDistance: 75,
  });

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not trigger shortcuts when user is typing in form inputs
      const target = e.target as HTMLElement | null;
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.tagName === 'SELECT') {
        return;
      }

      switch (e.key.toLowerCase()) {
        case '1':
        case 'h':
          e.preventDefault();
          setActiveTab('home');
          break;
        case '2':
        case 'c':
          e.preventDefault();
          setActiveTab('compare');
          break;
        case '3':
        case 't':
          e.preventDefault();
          setActiveTab('track');
          break;
        case '4':
        case 'a':
          e.preventDefault();
          setActiveTab('alerts');
          break;
        case '5':
        case 'd':
          e.preventDefault();
          setActiveTab('ai_details');
          break;
        case '6':
        case 'l':
          e.preventDefault();
          setActiveTab('history');
          break;
        case 'r':
          e.preventDefault();
          setSelectedTrackingRoute(selectedTrackingRoute === 'route_13' ? 'route_6' : 'route_13');
          break;
        case 'w':
          e.preventDefault();
          const nextWeather =
            vkuWeather.condition === 'sunny'
              ? 'cloudy'
              : vkuWeather.condition === 'cloudy'
              ? 'rain'
              : vkuWeather.condition === 'rain'
              ? 'heavy_rain'
              : 'sunny';
          changeWeather(nextWeather);
          break;
        case 'j':
          e.preventDefault();
          simulateTrafficCongested(traffic !== 'jammed');
          break;
        case 's':
          e.preventDefault();
          simulateSensorScanned();
          break;
        case 'm':
          e.preventDefault();
          setIsSimModalOpen((prev) => !prev);
          break;
        case '?':
        case 'g':
          e.preventDefault();
          setIsGesturesModalOpen(!isGesturesModalOpen);
          break;
        case 'escape':
          setIsSimModalOpen(false);
          setIsGesturesModalOpen(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    activeTab,
    selectedTrackingRoute,
    vkuWeather.condition,
    traffic,
    isGesturesModalOpen,
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-36 md:pb-24 select-text">
      {/* 3D Three.js Interactive Splash Animation */}
      {showSplash && <ThreeSplashAnimation onComplete={() => setShowSplash(false)} />}

      {/* Toast Notification Stream (Floating Top-Right) */}
      <ToastContainer />

      {/* Top Header */}
      <Header />

      {/* Guided Demo Tour Bar (Visible when demo mode is active) */}
      <DemoTourBar />

      {/* Desktop Navigation */}
      <Navigation onOpenSimulationModal={() => setIsSimModalOpen(true)} />

      {/* Main Screen Container with Touch Gestures Enabled */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-4 md:py-6">
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'compare' && <ComparisonScreen />}
        {activeTab === 'track' && <TrackingScreen />}
        {activeTab === 'alerts' && <AlertsScreen />}
        {activeTab === 'ai_details' && <AIDetailsScreen />}
        {activeTab === 'history' && <HistoryScreen />}

        {/* Mobile Swipe Gesture Helper Bar */}
        <div className="mt-8 md:hidden flex items-center justify-between px-3 py-2 rounded-2xl bg-slate-900/70 border border-slate-800 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Vuốt ngang 1 tay để chuyển tab</span>
          </div>
          <button
            onClick={() => setIsGesturesModalOpen(true)}
            className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 underline"
          >
            <span>Xem cử chỉ</span>
          </button>
        </div>
      </main>

      {/* One-Handed Ergonomic Quick Dial Floating Widget (Mobile & Desktop) */}
      <OneHandedQuickDial />

      {/* Floating Simulation Controls Pill (Placed opposite to the thumb dial on mobile) */}
      <div
        className={`fixed bottom-20 md:bottom-6 z-30 ${
          handMode === 'right' ? 'left-4' : 'right-4'
        }`}
      >
        <button
          onClick={() => setIsSimModalOpen(true)}
          className="flex items-center gap-2 px-3 py-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 font-bold text-xs shadow-xl border border-amber-500/30 active:scale-95 transition-all backdrop-blur-md"
          title="Mở bảng mô phỏng dữ liệu (Nhấn M)"
        >
          <Sliders className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">Mô phỏng dữ liệu</span>
          <span className="sm:hidden">Mô phỏng</span>
        </button>
      </div>

      {/* Simulation Control Modal */}
      <SimulationModal isOpen={isSimModalOpen} onClose={() => setIsSimModalOpen(false)} />

      {/* One-Handed Shortcuts and Gestures Modal */}
      <OneHandedShortcutsModal
        isOpen={isGesturesModalOpen}
        onClose={() => setIsGesturesModalOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 py-6 px-4 text-center text-xs text-slate-400">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 text-slate-300 font-semibold">
            <School className="w-4 h-4 text-emerald-400" />
            <span>NexMile • Giải pháp AI Trợ lý Xe Buýt Thông minh VKU Đà Nẵng</span>
          </div>
          <p className="text-[11px] text-slate-400 max-w-xl mx-auto leading-relaxed">
            Dành cho sinh viên Trường Đại học Công nghệ Thông tin và Truyền thông Việt - Hàn (VKU). 
            Ứng dụng sử dụng mô phỏng dữ liệu viễn thám GPS và cảm biến trạm thông minh để trình diễn giải pháp công nghệ.
          </p>
          <div className="pt-2 flex items-center justify-center gap-1 text-[11px] text-slate-400">
            <span>Xây dựng vì cộng đồng sinh viên VKU</span>
            <Heart className="w-3 h-3 text-rose-500 inline fill-rose-500" />
            <span>• Phiên bản thi đấu & Trình diễn ý tưởng 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <SimulationProvider>
      <AppContent />
    </SimulationProvider>
  );
}
