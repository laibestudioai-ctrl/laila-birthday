import { Calendar, Clock, MapPin, Cake, Gift, MessageCircle } from 'lucide-react';

export const PartyInfo: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto px-4 pb-24 space-y-5">
      {/* Hero party card */}
      <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-amber-500 rounded-3xl p-6 text-white shadow-lg shadow-rose-300/40">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3">
          <Cake className="w-3.5 h-3.5 text-amber-200" />
          <span>¡La Fiesta de los 2 Añitos!</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif mb-2">
          Celebramos el 2º Cumpleaños de Laila
        </h2>
        <p className="text-rose-100 text-xs sm:text-sm leading-relaxed">
          Queremos juntar a la familia y amigos más queridos para merendar, jugar, soplar las velas y hacer que este día sea un recuerdo mágico para toda la vida.
        </p>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-stone-500 font-medium">Fecha</div>
            <div className="font-bold text-stone-900 text-sm">Sábado 7 Noviembre 2026</div>
            <div className="text-[11px] text-rose-600 font-medium">(El cumple oficial es el 4 Nov)</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-stone-500 font-medium">Hora</div>
            <div className="font-bold text-stone-900 text-sm">A partir de las 17:00 h</div>
            <div className="text-[11px] text-stone-500">Tarde de merienda y juegos</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs flex items-start gap-3 sm:col-span-2">
          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-stone-500 font-medium">Lugar / Ubicación</div>
            <div className="font-bold text-stone-900 text-sm">Valladolid (España)</div>
            <div className="text-xs text-stone-500 mt-0.5">
              Zona de juegos y merienda familiar. Escríbenos si necesitas ubicación exacta en Maps.
            </div>
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
            <span><strong>Merienda & Tarta:</strong> Tarta casera para soplar su vela del número 2.</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-50">
            <span className="text-base">📸</span>
            <span><strong>Photocall & Recuerdos:</strong> Usa tu móvil con la tarjeta NFC para subir fotos al instante al muro.</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-50">
            <span className="text-base">🎈</span>
            <span><strong>Rincón de Juegos:</strong> Zona habilitada para que los peques jueguen a gusto.</span>
          </div>
        </div>
      </div>

      {/* Contact button */}
      <div className="text-center pt-2">
        <a
          href="https://wa.me/34600000000?text=Hola!%20Os%20confirmo%20para%20el%20cumple%20de%20Laila"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl bg-emerald-600 text-white font-semibold text-xs sm:text-sm shadow-md hover:bg-emerald-700 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Avisar a papá y mamá por WhatsApp</span>
        </a>
        <p className="text-[11px] text-stone-400 mt-2">
          Creado con amor por Papá y Mamá · Laibe Studio AI
        </p>
      </div>
    </div>
  );
};
