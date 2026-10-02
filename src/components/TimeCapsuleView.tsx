import { Lock, Hourglass, Sparkles, Send, Gift, Calendar } from 'lucide-react';
import type { Memory } from '../types';
import { MemoryCard } from './MemoryCard';

interface TimeCapsuleViewProps {
  memories: Memory[];
  onOpenUpload: () => void;
  onLike: (id: string, currentLikes: number) => void;
  onOpenMedia: (url: string, type: 'image' | 'video', title: string) => void;
}

export const TimeCapsuleView: React.FC<TimeCapsuleViewProps> = ({
  memories,
  onOpenUpload,
  onLike,
  onOpenMedia,
}) => {
  const capsuleMemories = memories.filter((m) => m.tipo === 'capsula_18');

  // Target 18th birthday: 4 de Noviembre de 2042
  const eighteenthBirthday = new Date('2042-11-04T00:00:00');
  const now = new Date();
  const diffYears = eighteenthBirthday.getFullYear() - now.getFullYear();

  return (
    <div className="max-w-xl mx-auto px-4 pb-24">
      {/* Vault Card Banner */}
      <div className="relative rounded-3xl p-6 mb-6 overflow-hidden bg-gradient-to-br from-amber-500 via-amber-600 to-rose-600 text-white shadow-xl shadow-amber-500/20">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-100 text-xs font-semibold mb-3">
            <Lock className="w-3.5 h-3.5 text-amber-200" />
            <span>Cápsula Digital Cerrada</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-serif leading-tight">
            Para cuando Laila cumpla 18 Años
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-amber-100/90 leading-relaxed font-sans">
            Todo lo que escribas o subas aquí se guardará en un archivo de memoria protegido.
            Laila podrá abrir esta cápsula el <strong>4 de Noviembre de 2042</strong>.
          </p>

          <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-200" />
              <span>Apertura: <strong>04.11.2042</strong></span>
            </div>
            <div className="flex items-center gap-1 bg-white/20 px-2.5 py-1 rounded-full font-bold">
              <Hourglass className="w-3.5 h-3.5" />
              <span>Faltan ~{diffYears} años</span>
            </div>
          </div>
        </div>
      </div>

      {/* Prompts for guests */}
      <div className="bg-white rounded-3xl p-5 border border-amber-200/80 shadow-xs mb-6">
        <div className="flex items-center gap-2 mb-3 text-amber-900 font-semibold text-sm">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Ideas para dejarle en su cápsula:</span>
        </div>
        <ul className="space-y-2 text-xs text-stone-600">
          <li className="flex items-start gap-2">
            <span className="text-amber-500 font-bold">•</span>
            <span>¿Cómo es el mundo hoy y qué canciones o cosas te hacen pensar en ella?</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 font-bold">•</span>
            <span>Un consejo de vida o una anécdota divertida con sus padres.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 font-bold">•</span>
            <span>Un vídeo o audio corto de 20 segundos diciéndole cuánto la quieres.</span>
          </li>
        </ul>

        <div className="mt-4">
          <button
            onClick={onOpenUpload}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-semibold text-xs shadow-sm hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Escribir Carta o Grabar Mensaje al Futuro</span>
          </button>
        </div>
      </div>

      {/* Feed of letters */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
          <span>Mensajes Custodiados</span>
          <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-sans font-bold">
            {capsuleMemories.length}
          </span>
        </h3>
      </div>

      {capsuleMemories.length === 0 ? (
        <div className="text-center py-12 px-4 bg-white/70 rounded-3xl border border-dashed border-amber-300">
          <Gift className="w-10 h-10 text-amber-300 mx-auto mb-2" />
          <p className="text-stone-700 font-medium text-sm">Aún no hay cartas para sus 18</p>
          <p className="text-stone-500 text-xs mt-1 mb-3">
            Sé el primero en dejarle un mensaje inolvidable a la pequeña Laila.
          </p>
          <button
            onClick={onOpenUpload}
            className="px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-semibold hover:bg-amber-600 transition-colors cursor-pointer"
          >
            Escribir primera carta
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {capsuleMemories.map((mem) => (
            <MemoryCard
              key={mem.id}
              memory={mem}
              onLike={onLike}
              onOpenMedia={onOpenMedia}
            />
          ))}
        </div>
      )}
    </div>
  );
};
