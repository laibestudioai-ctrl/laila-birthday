import React, { useEffect } from 'react';
import { X, Download } from 'lucide-react';

interface MediaLightboxProps {
  url: string | null;
  type: 'image' | 'video';
  title?: string;
  onClose: () => void;
}

export const MediaLightbox: React.FC<MediaLightboxProps> = ({
  url,
  type,
  title,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!url) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Top action bar */}
      <div className="absolute top-4 inset-x-4 max-w-2xl mx-auto flex items-center justify-between text-white z-10">
        <span className="text-xs sm:text-sm font-medium truncate max-w-xs opacity-80">
          {title || 'Recuerdo de Laila'}
        </span>
        <div className="flex items-center gap-2">
          <a
            href={url}
            download="recuerdo-laila"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            title="Descargar archivo"
          >
            <Download className="w-5 h-5" />
          </a>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main media display */}
      <div className="max-w-3xl max-h-[85vh] w-full flex items-center justify-center">
        {type === 'video' ? (
          <video
            src={url}
            controls
            autoPlay
            className="max-h-[85vh] max-w-full rounded-2xl shadow-2xl object-contain"
          />
        ) : (
          <img
            src={url}
            alt={title || 'Foto de recuerdo'}
            className="max-h-[85vh] max-w-full rounded-2xl shadow-2xl object-contain select-none"
          />
        )}
      </div>
    </div>
  );
};
