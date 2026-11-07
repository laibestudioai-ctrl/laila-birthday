import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Clock, Image as ImageIcon, Mail, Calendar } from 'lucide-react';

interface HeaderProps {
  totalMemories: number;
  totalPhotos: number;
  totalCapsule: number;
  isLivePocketBase: boolean;
  onOpenUpload: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalMemories,
  totalPhotos,
  totalCapsule,
  isLivePocketBase,
  onOpenUpload,
}) => {
  // Target: Sábado 7 de Noviembre de 2026 a las 17:00
  const partyDate = new Date('2026-11-07T17:00:00');
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const diff = partyDate.getTime() - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#fb7185', '#fcd34d', '#38bdf8', '#c084fc'],
    });
  };

  return (
    <header className="relative overflow-hidden pt-6 pb-8 px-4 sm:px-6">
      {/* Background soft glowing blur spheres */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-20 right-0 w-72 h-72 bg-amber-100/50 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-xl mx-auto text-center">
        {/* Connection status tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/80 backdrop-blur shadow-sm border border-rose-100 mb-4 text-stone-600">
          <span className={`w-2 h-2 rounded-full ${isLivePocketBase ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
          {isLivePocketBase ? 'Servidor VPS Conectado' : 'Modo Vista Previa · Laibe Studio'}
        </div>

        {/* Avatar / Photo with celebratory ring */}
        <div className="relative inline-block mb-3">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-rose-400 via-amber-300 to-pink-500 shadow-xl shadow-rose-200/50 mx-auto">
            <img
              src="/photos/timeline/laila_recuerdo_30.jpg"
              alt="Laila"
              className="w-full h-full object-cover rounded-full border-2 border-white"
            />
          </div>
          <button
            onClick={triggerConfetti}
            title="¡Tirar confeti!"
            className="absolute -bottom-1 -right-1 p-2 bg-white rounded-full shadow-md border border-rose-100 text-rose-500 hover:scale-110 active:scale-95 transition-transform"
          >
            <Sparkles className="w-4 h-4 fill-rose-400 text-rose-500" />
          </button>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 font-serif">
          Laila <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500">2 Añitos</span>
        </h1>
        <p className="mt-1 text-sm sm:text-base text-stone-600 font-medium">
          Cápsula del Tiempo & Recuerdos de su Fiesta
        </p>

        {/* Event Date badge */}
        <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/60 text-rose-800 text-xs sm:text-sm font-medium">
          <Calendar className="w-4 h-4 text-rose-500" />
          <span>Cumple: <strong>4 Nov</strong> · Fiesta: <strong>Sábado 7 Nov 2026</strong></span>
        </div>

        {/* Countdown Box */}
        <div className="mt-4 p-3 rounded-2xl bg-white/70 backdrop-blur border border-stone-200/60 shadow-sm max-w-md mx-auto">
          <div className="text-xs text-stone-500 font-medium mb-1.5 flex items-center justify-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>Cuenta atrás para la fiesta de Laila:</span>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-stone-50/80 rounded-xl py-1.5 px-1 border border-stone-100">
              <span className="block text-lg font-bold text-stone-800">{timeLeft.days}</span>
              <span className="text-[10px] text-stone-500 uppercase tracking-wider">Días</span>
            </div>
            <div className="bg-stone-50/80 rounded-xl py-1.5 px-1 border border-stone-100">
              <span className="block text-lg font-bold text-stone-800">{timeLeft.hours}</span>
              <span className="text-[10px] text-stone-500 uppercase tracking-wider">Horas</span>
            </div>
            <div className="bg-stone-50/80 rounded-xl py-1.5 px-1 border border-stone-100">
              <span className="block text-lg font-bold text-stone-800">{timeLeft.minutes}</span>
              <span className="text-[10px] text-stone-500 uppercase tracking-wider">Min</span>
            </div>
            <div className="bg-stone-50/80 rounded-xl py-1.5 px-1 border border-stone-100">
              <span className="block text-lg font-bold text-rose-600">{timeLeft.seconds}</span>
              <span className="text-[10px] text-stone-500 uppercase tracking-wider">Seg</span>
            </div>
          </div>
        </div>

        {/* Stats Pill Bar */}
        <div className="mt-4 flex items-center justify-center gap-3 text-xs text-stone-600">
          <div className="flex items-center gap-1 bg-white/80 px-2.5 py-1 rounded-full border border-stone-200/70 shadow-xs">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span className="font-semibold text-stone-800">{totalMemories}</span> Recuerdos
          </div>
          <div className="flex items-center gap-1 bg-white/80 px-2.5 py-1 rounded-full border border-stone-200/70 shadow-xs">
            <ImageIcon className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-semibold text-stone-800">{totalPhotos}</span> Fotos
          </div>
          <div className="flex items-center gap-1 bg-white/80 px-2.5 py-1 rounded-full border border-stone-200/70 shadow-xs">
            <Mail className="w-3.5 h-3.5 text-purple-500" />
            <span className="font-semibold text-stone-800">{totalCapsule}</span> Cartas a los 18
          </div>
        </div>

        {/* Action Button: Upload Memory */}
        <div className="mt-5">
          <button
            onClick={onOpenUpload}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-rose-300/40 hover:shadow-xl hover:shadow-rose-300/60 active:scale-98 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
          >
            <Sparkles className="w-5 h-5" />
            <span>Subir mi Foto o Mensaje a la Cápsula</span>
          </button>
        </div>
      </div>
    </header>
  );
};
