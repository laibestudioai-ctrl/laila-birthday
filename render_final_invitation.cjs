const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ffmpeg = path.join(__dirname, 'node_modules', 'ffmpeg-static', 'ffmpeg.exe');

const videoDir = 'C:\\Users\\NuevoNatal\\Documents\\antigravity\\Generador de videos e imagenes';
const vGirl = path.join(videoDir, 'Generar_video_invitación_cumpleaños_1080p_20261009003730.mp4');
const vInvite = path.join(videoDir, 'Invitation_appearing_with_magic_…_20261009003328.mp4');

const outputFinal = path.join(videoDir, 'Invitacion_Laila_Magica_CapCut_Final.mp4');
const outputDownloads = 'C:\\Users\\NuevoNatal\\Downloads\\Invitacion_Laila_Magica_CapCut_Final.mp4';

console.log('🎬 Procesando ensamblado con transición fluida a los 4.5s...');

// Duraciones:
// Clip 1 (Laila tarta y aplausos): 0 a 4.5 segundos
// Transición: fade de 0.5s en offset 4.0s
// Clip 2 (Invitación mágica): 8 segundos
// Duración total resultante: 4.0 + 8.0 = 12.0 segundos

const fontBold = 'C\\:/Windows/Fonts/segoeuib.ttf';

// Filtros de subtítulos estilo Reels / CapCut profesional:
// Letra blanca nítida, contorno magenta/rosa profundo y sombra suave para máxima legibilidad
const subtitles = [
  // Clip 1 - Laila celebrando
  `drawtext=fontfile='${fontBold}':text='¡Hola! Soy Laila':fontsize=54:fontcolor=white:borderw=6:bordercolor=0xC2185B:shadowx=2:shadowy=2:shadowcolor=black@0.4:x=(w-text_w)/2:y=h-260:enable='between(t,0.5,2.3)'`,
  `drawtext=fontfile='${fontBold}':text='¡Y cumplo mi segundo añito!':fontsize=52:fontcolor=0xFFF3D0:borderw=6:bordercolor=0xAD1457:shadowx=2:shadowy=2:shadowcolor=black@0.4:x=(w-text_w)/2:y=h-260:enable='between(t,2.4,4.2)'`,
  
  // Clip 2 - Transición y revelación de la invitación
  `drawtext=fontfile='${fontBold}':text='¡Estás invitado a mi fiesta mágica!':fontsize=50:fontcolor=white:borderw=6:bordercolor=0xC2185B:shadowx=2:shadowy=2:shadowcolor=black@0.4:x=(w-text_w)/2:y=h-260:enable='between(t,4.6,7.4)'`,
  `drawtext=fontfile='${fontBold}':text='Sábado 7 de Noviembre · 17\\:30 h':fontsize=52:fontcolor=0xFFF3D0:borderw=6:bordercolor=0x880E4F:shadowx=2:shadowy=2:shadowcolor=black@0.4:x=(w-text_w)/2:y=h-260:enable='between(t,7.5,9.8)'`,
  `drawtext=fontfile='${fontBold}':text='El Parque de Beltrán · ¡Te esperamos!':fontsize=50:fontcolor=white:borderw=6:bordercolor=0xC2185B:shadowx=2:shadowy=2:shadowcolor=black@0.4:x=(w-text_w)/2:y=h-260:enable='between(t,9.9,12.0)'`
].join(',');

const filterComplex = [
  // Recorte clip 1 de 0 a 4.5s a 24fps exactos
  `[0:v]trim=start=0:end=4.5,setpts=PTS-STARTPTS,fps=24[v0]`,
  `[0:a]atrim=start=0:end=4.5,asetpts=PTS-STARTPTS[a0]`,
  
  // Clip 2 completo a 24fps exactos
  `[1:v]trim=start=0:end=8.0,setpts=PTS-STARTPTS,fps=24[v1]`,
  `[1:a]atrim=start=0:end=8.0,asetpts=PTS-STARTPTS[a1]`,
  
  // Transición suave xfade de 0.5s
  `[v0][v1]xfade=transition=fade:duration=0.5:offset=4.0[v_trans]`,
  `[a0][a1]acrossfade=d=0.5:c1=tri:c2=tri[a_trans]`,
  
  // Incrustar subtítulos sobre el vídeo transicionado
  `[v_trans]${subtitles}[v_final]`
].join(';');

const cmd = `"${ffmpeg}" -y -i "${vGirl}" -i "${vInvite}" -filter_complex "${filterComplex}" -map "[v_final]" -map "[a_trans]" -c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k "${outputFinal}"`;

console.log('🚀 Ejecutando renderizado FFmpeg...');
execSync(cmd, { stdio: 'inherit' });

console.log('📋 Copiando a Descargas...');
fs.copyFileSync(outputFinal, outputDownloads);

console.log('🎉 ¡VÍDEO COMPLETO CREADO CON ÉXITO!');
console.log('Ubicación 1:', outputFinal);
console.log('Ubicación 2:', outputDownloads);
