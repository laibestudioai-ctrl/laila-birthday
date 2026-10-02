import React, { useState } from 'react';
import { Heart, Sparkles, Hourglass, Video, Eye } from 'lucide-react';
import type { Memory } from '../types';

interface MemoryCardProps {
  memory: Memory;
  onLike: (id: string, currentLikes: number) => void;
  onOpenMedia: (url: string, type: 'image' | 'video', title: string) => void;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({ memory, onLike, onOpenMedia }) => {
  const [likes, setLikes] = useState(memory.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (hasLiked) return;
    setHasLiked(true);
    setLikes((prev) => prev + 1);
    onLike(memory.id, likes);
  };

  const isCapsule = memory.tipo === 'capsula_18';

  return (
    <div
      className={`group rounded-3xl p-4 transition-all duration-300 ${
        isCapsule
          ? 'bg-gradient-to-b from-amber-50/90 to-rose-50/80 border-2 border-amber-200/80 shadow-md shadow-amber-100/50'
          : 'bg-white border border-stone-200/80 shadow-sm hover:shadow-md'
      }`}
    >
      {/* Author & Badge header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white ${
              isCapsule
                ? 'bg-gradient-to-tr from-amber-500 to-rose-500'
                : 'bg-gradient-to-tr from-rose-400 to-pink-500'
            }`}
          >
            {memory.autor.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-stone-900 text-sm leading-tight">
              {memory.autor}
            </div>
            <div className="text-[11px] text-stone-500">
              {memory.relacion || 'Amigo/Familia'}
            </div>
          </div>
        </div>

        {/* Badge by type */}
        {isCapsule ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
            <Hourglass className="w-3 h-3 text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Para sus 18</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-100">
            <Sparkles className="w-2.5 h-2.5 text-rose-500" />
            <span>Recuerdo</span>
          </span>
        )}
      </div>

      {/* Media item (Photo or Video) */}
      {memory.mediaUrl && (
        <div
          onClick={() => onOpenMedia(memory.mediaUrl!, memory.mediaType || 'image', `Recuerdo de ${memory.autor}`)}
          className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden mb-3 bg-stone-100 cursor-pointer group/media"
        >
          {memory.mediaType === 'video' ? (
            <div className="relative w-full h-full flex items-center justify-center bg-stone-900">
              <video
                src={memory.mediaUrl}
                className="w-full h-full object-cover opacity-90"
                preload="metadata"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover/media:bg-black/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-lg group-hover/media:scale-110 transition-transform">
                  <Video className="w-5 h-5 text-rose-500" />
                </div>
              </div>
            </div>
          ) : (
            <>
              <img
                src={memory.mediaUrl}
                alt={`Foto de ${memory.autor}`}
                className="w-full h-full object-cover group-hover/media:scale-102 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 text-white opacity-0 group-hover/media:opacity-100 transition-opacity">
                <Eye className="w-3.5 h-3.5" />
              </div>
            </>
          )}
        </div>
      )}

      {/* Message Text */}
      {memory.mensaje && (
        <p className="text-stone-700 text-sm leading-relaxed mb-3 whitespace-pre-line font-normal italic">
          "{memory.mensaje}"
        </p>
      )}

      {/* Footer: Date and Like Button */}
      <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
        <span>
          {new Date(memory.created).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>

        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all cursor-pointer ${
            hasLiked
              ? 'bg-rose-50 text-rose-600 font-semibold scale-105'
              : 'hover:bg-stone-100 text-stone-600'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              hasLiked ? 'fill-rose-500 text-rose-500' : 'text-stone-400 group-hover:text-rose-400'
            }`}
          />
          <span>{likes}</span>
        </button>
      </div>
    </div>
  );
};
