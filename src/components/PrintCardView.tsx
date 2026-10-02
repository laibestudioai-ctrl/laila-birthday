import { useState } from 'react';
import { Smartphone, QrCode, Printer, Check, Copy, Sparkles } from 'lucide-react';

export const PrintCardView: React.FC = () => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://laila.laibestudioai.com';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Generate QR code URL using standard public QR API
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
    currentUrl
  )}&bgcolor=ffffff&color=292524&margin=1`;

  return (
    <div className="max-w-xl mx-auto px-4 pb-24 space-y-6">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 mb-2">
          <QrCode className="w-3.5 h-3.5 text-purple-600" />
          <span>Soporte Físico</span>
        </span>
        <h2 className="text-2xl font-bold text-stone-900 font-serif">
          Tarjeta NFC & Carteles de Mesa
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-sm mx-auto">
          Imprime estos carteles para las mesas de la fiesta o programa tu chip NFC en 1 minuto.
        </p>
      </div>

      {/* URL bar to copy */}
      <div className="p-3 bg-white rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between gap-2 text-xs">
        <div className="truncate text-stone-600 font-mono select-all">
          {currentUrl}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium transition-colors shrink-0 cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copiado' : 'Copiar URL'}</span>
        </button>
      </div>

      {/* Action to print */}
      <button
        onClick={handlePrint}
        className="w-full py-3 px-4 rounded-2xl bg-stone-900 text-white font-semibold text-xs sm:text-sm shadow-md hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
      >
        <Printer className="w-4 h-4" />
        <span>Imprimir Carteles de Mesa para la Fiesta (PDF)</span>
      </button>

      {/* PREVIEW: Physical Table Display (Printable) */}
      <div className="print-area bg-gradient-to-b from-stone-50 to-rose-50/50 p-6 rounded-3xl border-2 border-stone-300 shadow-lg text-center space-y-4">
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-stone-700 text-[11px] font-semibold border border-stone-200 shadow-xs">
          <Sparkles className="w-3 h-3 text-rose-500" />
          <span>Display para las Mesas del Cumple</span>
        </div>

        <div className="space-y-1">
          <h3 className="text-2xl font-bold font-serif text-stone-900">
            ¡El 2º Cumple de Laila! 🌸
          </h3>
          <p className="text-xs text-stone-600 max-w-xs mx-auto">
            Ayúdanos a guardar este día para siempre en su cápsula digital.
          </p>
        </div>

        {/* The QR Code Container */}
        <div className="inline-block p-4 bg-white rounded-3xl shadow-md border border-rose-100 mx-auto">
          <img
            src={qrUrl}
            alt="Código QR Cápsula Laila"
            className="w-44 h-44 object-contain mx-auto"
          />
          <div className="mt-2 text-[11px] font-bold text-stone-700 tracking-wide">
            ESCANEA CON LA CÁMARA
          </div>
        </div>

        {/* NFC instructions */}
        <div className="max-w-xs mx-auto p-3 bg-white/90 rounded-2xl border border-stone-200 text-xs text-stone-700 space-y-1">
          <div className="font-semibold text-rose-600 flex items-center justify-center gap-1.5">
            <Smartphone className="w-4 h-4" />
            <span>O acerca tu móvil al chip NFC</span>
          </div>
          <p className="text-[11px] text-stone-500">
            Sube fotos de la fiesta al momento y déjale un mensaje que leerá cuando cumpla 18 años.
          </p>
        </div>

        <div className="text-[10px] text-stone-400 font-serif">
          04.11.2026 · Celebración 7 de Noviembre
        </div>
      </div>

      {/* Guide: How to write the NFC tag */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-xs space-y-3">
        <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-purple-600" />
          <span>Cómo programar la tarjeta o pegatina NFC en 1 minuto:</span>
        </h4>
        <ol className="space-y-2 text-xs text-stone-600 list-decimal list-inside leading-relaxed">
          <li>
            Descarga en tu iPhone o Android la app gratuita <strong>NFC Tools</strong>.
          </li>
          <li>
            Abre la app, toca en <strong>Escribir</strong> -&gt; <strong>Añadir un registro</strong> -&gt; <strong>URL / Enlace web</strong>.
          </li>
          <li>
            Pega el enlace de la web de Laila (ej: <code className="bg-stone-100 px-1 py-0.5 rounded text-[11px] font-mono">{currentUrl}</code>).
          </li>
          <li>
            Pulsa en <strong>Escribir</strong> y acerca la tarjeta o pegatina NFC a la parte trasera de tu móvil.
          </li>
          <li>
            ¡Listo! A partir de ese momento, cualquier persona que acerque su móvil abrirá la cápsula directamente sin instalar nada.
          </li>
        </ol>
      </div>
    </div>
  );
};
