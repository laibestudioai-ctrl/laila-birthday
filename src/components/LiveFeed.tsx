import React, { useState } from 'react';
import { Sparkles, Camera, Plus, Filter } from 'lucide-react';
import type { Memory } from '../types';
import { MemoryCard } from './MemoryCard';

interface LiveFeedProps {
  memories: Memory[];
  onLike: (id: string, currentLikes: number) => void;
  onOpenMedia: (url: string, type: 'image' | 'video', title: string) => void;
  onOpenUpload: () => void;
}

export const LiveFeed: React.FC<LiveFeedProps> = ({
  memories,
  onLike,
  onOpenMedia,
  onOpenUpload,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'photos' | 'capsule'>('all');

  const filteredMemories = memories.filter((m) => {
    if (activeFilter === 'photos') return !!m.mediaUrl;
    if (activeFilter === 'capsule') return m.tipo === 'capsula_18';
    return true;
  });

  return (
    <div className="max-w-xl mx-auto px-4 pb-24">
      {/* Header of Feed & Filters */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 font-serif">
            Muro de Recuerdos
          </h2>
          <p className="text-xs text-stone-500">
            Fotos y mensajes en directo para el 2º cumple de Laila
          </p>
        </div>

        <button
          onClick={onOpenUpload}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500 text-white text-xs font-semibold shadow-sm hover:bg-rose-600 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Añadir</span>
        </button>
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1 text-xs">
        <Filter className="w-3.5 h-3.5 text-stone-400 shrink-0" />
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 rounded-full font-medium transition-all shrink-0 cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          Todos ({memories.length})
        </button>
        <button
          onClick={() => setActiveFilter('photos')}
          className={`px-3 py-1.5 rounded-full font-medium transition-all shrink-0 cursor-pointer ${
            activeFilter === 'photos'
              ? 'bg-rose-500 text-white shadow-xs'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          📸 Con fotos ({memories.filter((m) => !!m.mediaUrl).length})
        </button>
        <button
          onClick={() => setActiveFilter('capsule')}
          className={`px-3 py-1.5 rounded-full font-medium transition-all shrink-0 cursor-pointer ${
            activeFilter === 'capsule'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          ⏳ Para sus 18 ({memories.filter((m) => m.tipo === 'capsula_18').length})
        </button>
      </div>

      {/* Grid of memories */}
      {filteredMemories.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white/60 rounded-3xl border border-dashed border-stone-300">
          <Camera className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="text-stone-700 font-semibold text-base mb-1">
            Aún no hay fotos en esta sección
          </h3>
          <p className="text-stone-500 text-xs max-w-xs mx-auto mb-4">
            ¡Sé el primero en dejar una foto o un mensaje de cariño para Laila!
          </p>
          <button
            onClick={onOpenUpload}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500 text-white text-xs font-semibold shadow-sm hover:bg-rose-600 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Publicar primer recuerdo</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredMemories.map((memory) => (
            <MemoryCard
              key={memory.id}
              memory={memory}
              onLike={onLike}
              onOpenMedia={onOpenMedia}
            />
          ))}
        </div>
      )}
    </div>
  );
};
