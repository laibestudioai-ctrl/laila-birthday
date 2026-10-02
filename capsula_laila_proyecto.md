# 🌸 Cápsula del Tiempo: 2º Cumpleaños de Laila

> **Fecha oficial:** 4 de Noviembre de 2026  
> **Celebración de la fiesta:** Sábado 7 de Noviembre de 2026  
> **Ubicación del código:** `C:\Users\NuevoNatal\.gemini\antigravity\scratch\capsula-laila`

---

## 📱 ¿Qué incluye la WebApp?

1. **Header & Hero de Bienvenida:**
   * Foto y avatar con anillo festivo y botón de **Confeti interactivo**.
   * Contador hacia atrás en vivo hasta el **sábado 7 de noviembre a las 17:00 h**.
   * Indicador visual de conexión (🟢 En vivo con PocketBase / 🟡 Modo local de prueba).
   * Contador de recuerdos, fotos y cartas a los 18.

2. **📸 Muro en Vivo (Live Feed):**
   * Vista estilo Polaroid con fotos y dedicatorias de los invitados.
   * Filtros dinámicos: *Todos*, *Solo con fotos*, *Para sus 18*.
   * Botón interactivo de **"Me gusta" ❤️** con contador.
   * Visor de fotos y vídeos a pantalla completa (Lightbox).

3. **⏳ Cápsula del Tiempo "Para sus 18" (Año 2042):**
   * Tarjeta especial con candado digital.
   * Cuenta atrás calculada hasta el **04.11.2042** (cuando Laila cumpla 18).
   * Preguntas y sugerencias emotivas para los invitados.

4. **👣 Línea de Vida: "Los Primeros 24 Meses":**
   * Cronología visual con hitos desde su nacimiento (noviembre 2024) hasta hoy (noviembre 2026).
   * Fácilmente editable con vuestras fotos familiares favoritas.

5. **🎈 La Fiesta (Información Práctica):**
   * Fecha, hora (17:00 h), detalles de la merienda, tarta y juegos.
   * Botón directo para **confirmar asistencia por WhatsApp con un solo clic**.

6. **🖨️ Soporte Físico (Tarjeta NFC & Carteles de Mesa):**
   * Vista maquetada lista para imprimir con el botón **"Imprimir Carteles de Mesa (PDF)"**.
   * Código QR dinámico autogenerado con la URL de la web.
   * Guía paso a paso para programar chips o tarjetas NFC con la app gratuita *NFC Tools*.

7. **⚡ Subida Ultra-Rápida con Compresión en Cliente:**
   * Compresión automática con `browser-image-compression` para que fotos pesadas de iPhone/Android de 15MB suban en 1 segundo incluso con cobertura débil en la fiesta.

---

## 🛠️ Arquitectura y Archivos Clave

```
capsula-laila/
├── POCKETBASE_SETUP.md      <-- Guía paso a paso para tu Easypanel
├── Dockerfile               <-- Multi-stage build con Nginx listo para Easypanel
├── nginx.conf               <-- Configuración de Nginx con compresión gzip y SPA routing
├── .env.example             <-- Variable VITE_POCKETBASE_URL
├── src/
│   ├── types.ts             <-- Definiciones TypeScript
│   ├── lib/
│   │   ├── pocketbase.ts    <-- Conexión PB con fallback automático a localStorage
│   │   └── compression.ts   <-- Compresor de imágenes en el navegador
│   ├── data/
│   │   └── initialMilestones.ts <-- Hitos de los 24 meses de Laila
│   ├── components/
│   │   ├── Header.tsx       <-- Cuenta atrás, confeti y estadísticas
│   │   ├── Navigation.tsx   <-- Menú de pestañas mobile-first
│   │   ├── LiveFeed.tsx     <-- Muro de fotos polaroid
│   │   ├── MemoryCard.tsx   <-- Tarjeta individual con likes
│   │   ├── TimeCapsuleView.tsx <-- Sección del candado y cartas al futuro
│   │   ├── MilestonesTimeline.tsx <-- Línea de vida de los 24 meses
│   │   ├── PartyInfo.tsx    <-- Detalles de la fiesta y botón WhatsApp
│   │   ├── PrintCardView.tsx <-- Carteles de mesa y QR para imprimir
│   │   ├── UploadModal.tsx  <-- Modal para subir fotos/vídeos/dedicatorias
│   │   └── MediaLightbox.tsx<-- Visor a pantalla completa
│   └── App.tsx
```

---

## 🚀 Cómo ponerlo en marcha

### 1. Probar en Local:
```powershell
cd C:\Users\NuevoNatal\.gemini\antigravity\scratch\capsula-laila
cmd /c npm run dev
```
Abre `http://localhost:5173` en tu navegador (o emúlalo como vista móvil con F12 en Chrome).

### 2. Desplegar PocketBase en tu Easypanel (VPS `76.13.152.6`):
Sigue las instrucciones detalladas en `POCKETBASE_SETUP.md`:
* **Imagen Docker:** `ghcr.io/muchobien/pocketbase:latest`
* **Puerto:** `8090`
* **Volumen:** `/pb_data`
* **Dominio:** `api-laila.laibestudioai.com`
