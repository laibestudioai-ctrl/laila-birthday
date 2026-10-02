import React from 'react';
import { INITIAL_MILESTONES } from '../data/initialMilestones';
import { Sparkles, Calendar, Heart } from 'lucide-react';

interface MilestonesTimelineProps {
  onOpenMedia: (url: string, type: 'image' | 'video', title: string) => void;
}

export const MilestonesTimeline: React.FC<MilestonesTimelineProps> = ({ onOpenMedia }) => {
  return (
    <div className="max-w-xl mx-auto px-4 pb-24">
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>Línea de Vida</span>
        </span>
        <h2 className="text-2xl font-bold text-stone-900 font-serif">
          Los Primeros 24 Meses de Laila
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-sm mx-auto">
          Dos años de descubrimientos, sonrisas y momentos que nos cambiaron la vida.
        </p>
      </div>

      {/* Timeline items */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-rose-200/80 space-y-8 ml-2 sm:ml-4">
        {INITIAL_MILESTONES.map((item) => (
          <div key={item.id} className="relative group">
            {/* Timeline node icon */}
            <div className="absolute -left-[35px] sm:-left-[43px] top-1 w-9 h-9 rounded-full bg-white border-2 border-rose-400 shadow-sm flex items-center justify-center text-base group-hover:scale-110 transition-transform">
              {item.icono}
            </div>

            {/* Milestone Card */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-rose-600 font-semibold text-xs mb-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.edadTexto}</span>
              </div>

              <h3 className="text-base font-bold text-stone-900 mb-2">
                {item.titulo}
              </h3>

              {/* Photo preview */}
              {item.fotoUrl && (
                <div
                  onClick={() => onOpenMedia(item.fotoUrl, 'image', item.titulo)}
                  className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden mb-3 bg-stone-100 cursor-pointer relative group/img"
                >
                  <img
                    src={item.fotoUrl}
                    alt={item.titulo}
                    className="w-full h-full object-cover group-hover/img:scale-102 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover/img:bg-black/20 transition-colors flex items-end p-2.5">
                    <span className="text-[10px] text-white bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
                      <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                      <span>Momento inolvidable</span>
                    </span>
                  </div>
                </div>
              )}

              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                {item.descripcion}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
