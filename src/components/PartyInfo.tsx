import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Cake, Gift, MessageCircle, Download, Share2, Phone, ExternalLink } from 'lucide-react';

export const PartyInfo: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const invitationImageUrl = '/img/invitacion_laila_final.jpg';
  const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=El+Parque+de+Beltrán+Calle+Pedro+de+Valdivia+2+Arroyo+de+la+Encomienda';
  const whatsappNataliaUrl = 'https://wa.me/34616885507?text=¡Hola%20Natalia!%20Te%20confirmo%20nuestra%20asistencia%20al%20cumple%20de%20Laila%20el%207%20de%20noviembre%20🎉';

  const shareText = `🌸 ¡LAILA celebra su segundo añito! 🌸\n\nVen a compartir una tarde divertida de juegos y merienda.\n\n📅 Fecha: 7 / 11 / 2026\n⏰ Hora: 17:30 h\n📍 Lugar: El Parque de Beltrán (C/ Pedro de Valdivia 2, Arroyo de la Encomienda)\n\nTu presencia hará este día aún más especial ✨\n¡Te esperamos!\n\nConfirmar asistencia a Natalia: 616 88 55 07`;

  const handleShareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-xl mx-auto px-4 pb-24 space-y-6">
      {/* Hero party card */}
      <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-amber-500 rounded-3xl p-6 text-white shadow-lg shadow-rose-300/40">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3">
          <Cake className="w-3.5 h-3.5 text-amber-200" />
          <span>¡La Fiesta de los 2 Añitos!</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif mb-2">
          LAILA celebra su segundo añito
        </h2>
        <p className="text-rose-100 text-xs sm:text-sm leading-relaxed">
          Ven a compartir una tarde divertida de juegos y merienda. Tu presencia hará este día aún más especial.
        </p>
      </div>

      {/* Official Invitation Showcase */}
      <div className="bg-white rounded-3xl p-5 border border-pink-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎀</span>
            <h3 className="font-bold text-stone-900 text-sm sm:text-base">
              Invitación Oficial Minnie Mouse
            </h3>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700">
            Diseño Oficial
          </span>
        </div>

        {/* Invitation Preview Frame */}
        <div className="relative rounded-2xl overflow-hidden shadow-md border border-rose-100 group">
          <img
            src={invitationImageUrl}
            alt="Invitación 2º Cumpleaños Laila"
            className="w-full h-auto object-cover max-h-[520px] mx-auto block transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
            <a
              href={invitationImageUrl}
              download="Invitacion_Laila_2_Cumpleaños.jpg"
              className="px-4 py-2 rounded-xl bg-white text-rose-600 font-bold text-xs shadow-lg flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Descargar en Alta Calidad
            </a>
          </div>
        </div>

        {/* Action Buttons for Invitation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          <a
            href={invitationImageUrl}
            download="Invitacion_Laila_2_Cumpleaños.jpg"
            className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 font-semibold text-xs hover:bg-rose-100 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Descargar Imagen</span>
          </a>

          <button
            onClick={handleShareWhatsApp}
            className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-xs hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Compartir por WhatsApp</span>
          </button>
        </div>

        {/* Quick copy text */}
        <div className="text-center">
          <button
            onClick={handleCopyText}
            className="text-[11px] text-stone-500 hover:text-rose-600 underline font-medium transition-colors"
          >
            {copied ? '✅ ¡Texto copiado al portapapeles!' : '📋 Copiar texto de la invitación'}
          </button>
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-stone-500 font-medium">Fecha</div>
            <div className="font-bold text-stone-900 text-sm">Sábado 7 / 11 / 2026</div>
            <div className="text-[11px] text-rose-600 font-medium">¡Guardad la fecha!</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-stone-500 font-medium">Hora de inicio</div>
            <div className="font-bold text-stone-900 text-sm">17:30 h</div>
            <div className="text-[11px] text-stone-500">Merienda y juegos toda la tarde</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs flex items-start gap-3 sm:col-span-2">
          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-stone-500 font-medium">Lugar de la Fiesta</div>
            <div className="font-bold text-stone-900 text-sm">El Parque de Beltrán</div>
            <div className="text-xs text-stone-600 mt-0.5">
              C/ Pedro de Valdivia 2, Arroyo de la Encomienda (Valladolid)
            </div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-purple-700 hover:text-purple-800"
            >
              <span>Abrir en Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Special Highlights */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-xs space-y-3">
        <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
          <Gift className="w-4 h-4 text-rose-500" />
          <span>Durante la tarde:</span>
        </h3>
        <div className="space-y-2 text-xs text-stone-600">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-50">
            <span className="text-base">🍰</span>
            <span><strong>Merienda & Tarta:</strong> Deliciosa merienda para peques y mayores y soplado de las 2 velas.</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-50">
            <span className="text-base">🎈</span>
            <span><strong>Juegos en el Parque:</strong> Espacio libre y juegos para pasarlo en grande.</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-50">
            <span className="text-base">📸</span>
            <span><strong>Muro de Recuerdos NFC:</strong> Toca la tarjeta de mesa con tu móvil y sube tus fotos al instante.</span>
          </div>
        </div>
      </div>

      {/* RSVP Section - Natalia */}
      <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-3xl p-5 border border-rose-200 space-y-3">
        <div className="text-center">
          <span className="text-xs uppercase tracking-wider font-bold text-rose-600">
            Confirmación de Asistencia
          </span>
          <h4 className="text-base font-bold text-stone-900 mt-0.5">
            ¡Por favor avísanos para preparar tu sitio!
          </h4>
          <p className="text-xs text-stone-600 mt-1">
            Contacta directamente con Natalia para confirmar cuántos venís:
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <a
            href={whatsappNataliaUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-600 text-white font-semibold text-xs sm:text-sm shadow-md hover:bg-emerald-700 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Confirmar por WhatsApp</span>
          </a>

          <a
            href="tel:+34616885507"
            className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white text-stone-800 border border-stone-300 font-semibold text-xs sm:text-sm hover:bg-stone-50 transition-colors"
          >
            <Phone className="w-4 h-4 text-rose-600" />
            <span>Llamar: 616 88 55 07</span>
          </a>
        </div>
      </div>
    </div>
  );
};
