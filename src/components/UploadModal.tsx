import { useState, useRef } from 'react';
import { X, Camera, Sparkles, Hourglass, Heart, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { MemoryType, MemoryUploadPayload } from '../types';
import { compressImage } from '../lib/compression';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: MemoryUploadPayload) => Promise<boolean>;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [tipo, setTipo] = useState<MemoryType>('fiesta');
  const [autor, setAutor] = useState('');
  const [relacion, setRelacion] = useState('Familia');
  const [mensaje, setMensaje] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.type.startsWith('image/')) {
      setIsCompressing(true);
      try {
        const compressed = await compressImage(selectedFile);
        setFile(compressed);
        setPreviewUrl(URL.createObjectURL(compressed));
      } catch {
        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
      } finally {
        setIsCompressing(false);
      }
    } else {
      // Video or other
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const clearFile = () => {
    setFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!autor.trim()) return;

    setIsSubmitting(true);
    const success = await onSubmit({
      autor: autor.trim(),
      relacion,
      mensaje: mensaje.trim(),
      tipo,
      file,
    });

    setIsSubmitting(false);

    if (success) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#f43f5e', '#fbbf24', '#38bdf8', '#a855f7'],
      });
      // Reset form
      setAutor('');
      setMensaje('');
      clearFile();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/60">
          <div>
            <h3 className="font-bold text-stone-900 text-base sm:text-lg font-serif">
              Dejar un recuerdo para Laila
            </h3>
            <p className="text-xs text-stone-500">
              {tipo === 'capsula_18'
                ? '🔒 Se guardará para cuando cumpla 18 años'
                : '🌸 Se verá en directo en el muro de su 2º cumpleaños'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-200 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {/* Segmented type selector */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-2">
              ¿Qué tipo de recuerdo quieres dejar?
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-100 rounded-2xl text-xs font-medium">
              <button
                type="button"
                onClick={() => setTipo('fiesta')}
                className={`py-2 px-2 rounded-xl transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  tipo === 'fiesta'
                    ? 'bg-white text-rose-600 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>Foto Fiesta</span>
              </button>

              <button
                type="button"
                onClick={() => setTipo('capsula_18')}
                className={`py-2 px-2 rounded-xl transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  tipo === 'capsula_18'
                    ? 'bg-amber-500 text-white shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Hourglass className="w-4 h-4" />
                <span>Para sus 18</span>
              </button>

              <button
                type="button"
                onClick={() => setTipo('dedicatoria')}
                className={`py-2 px-2 rounded-xl transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  tipo === 'dedicatoria'
                    ? 'bg-white text-purple-600 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>Dedicatoria</span>
              </button>
            </div>
          </div>

          {/* Author Name */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Tu Nombre o Quién eres <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              placeholder="Ej: Tía Carmen, Abuelo Pedro, Carlos y Marta..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-sm text-stone-900 bg-white"
            />
          </div>

          {/* Relationship */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Relación con Laila o la familia
            </label>
            <select
              value={relacion}
              onChange={(e) => setRelacion(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-sm text-stone-900 bg-white"
            >
              <option value="Familia">Familia</option>
              <option value="Papis">Papis</option>
              <option value="Abuelos">Abuelos</option>
              <option value="Tíos">Tíos</option>
              <option value="Primos">Primos</option>
              <option value="Amigos de la familia">Amigos de la familia</option>
              <option value="Amigo del cole/parque">Amigo del cole/parque</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {tipo === 'capsula_18'
                ? 'Tu mensaje, carta o deseo para cuando Laila tenga 18 años:'
                : 'Dedicatoria o frase bonita para Laila:'}
            </label>
            <textarea
              rows={3}
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder={
                tipo === 'capsula_18'
                  ? 'Querida Laila, cuando estés leyendo esto tendrás 18 años...'
                  : '¡Muchas felicidades Laila! Eres una alegría para todos...'
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-sm text-stone-900 bg-white resize-none"
            />
          </div>

          {/* Photo / Video upload */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Añadir Foto o Vídeo (opcional)
            </label>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*,video/mp4,video/quicktime,video/webm"
              onChange={handleFileChange}
              className="hidden"
            />

            {!previewUrl ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-stone-300 hover:border-rose-400 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-stone-50/60 hover:bg-rose-50/30"
              >
                <div className="flex items-center justify-center gap-2 text-stone-600 mb-1">
                  <Camera className="w-5 h-5 text-rose-500" />
                  <span className="text-xs font-semibold">Toma una foto o elígela de tu galería</span>
                </div>
                <p className="text-[11px] text-stone-400">
                  Fotos o vídeos cortos de hasta 50MB (optimización automática)
                </p>
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 max-h-48 flex items-center justify-center">
                {file?.type.startsWith('video/') ? (
                  <video
                    src={previewUrl}
                    controls
                    className="max-h-48 w-full object-contain"
                  />
                ) : (
                  <img
                    src={previewUrl}
                    alt="Previsualización"
                    className="max-h-48 w-full object-contain"
                  />
                )}
                <button
                  type="button"
                  onClick={clearFile}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors cursor-pointer"
                  title="Quitar archivo"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {isCompressing && (
              <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                Optimizando foto para que suba en un segundo...
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || isCompressing || !autor.trim()}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-sm shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Guardando recuerdo...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {tipo === 'capsula_18'
                      ? 'Guardar en la Cápsula del Futuro 🔒'
                      : 'Publicar Recuerdo en el Muro 🌸'}
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
