const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ffmpeg = path.join(__dirname, 'node_modules', 'ffmpeg-static', 'ffmpeg.exe');
const publicDir = path.join(__dirname, 'public');
const imgDir = path.join(publicDir, 'img');
const videoDir = path.join(publicDir, 'video');

if (!fs.existsSync(videoDir)) fs.mkdirSync(videoDir, { recursive: true });

console.log('🚀 Iniciando renderizado del vídeo mágico para Laila...');

// Input images
const forestImg = path.join(imgDir, 'laila_bosque_encantado.png');
const paperImg = path.join(imgDir, 'invitacion_papel_laila.png');

// Output clips
const clip1 = path.join(videoDir, 'c1_envelope.mp4');
const clip2 = path.join(videoDir, 'c2_forest.mp4');
const clip3 = path.join(videoDir, 'c3_paper.mp4');
const audioTrack = path.join(videoDir, 'magic_audio.wav');
const finalVideo = path.join(videoDir, 'invitacion_laila_magica.mp4');

// --- 1. Generar Clip 1: El Sobre Rosa Mágico (5 segundos) ---
// Usamos el render de Chrome / SVG animado o imagen del sobre con zoom y transición
console.log('🎬 Generando Clip 1: El Sobre Mágico...');
const envelopeImg = path.join(imgDir, 'test_envelope.png');

// Si no existe, usamos un generador de fondo rosa con el sobre
const cmdClip1 = `"${ffmpeg}" -y -loop 1 -i "${envelopeImg}" -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='min(zoom+0.0015,1.2)':x='iw/2-(iw/zoom/2)':y='ih*0.4-(ih/zoom/2)*0.4':d=150:s=1080x1920:fps=30,fade=t=out:st=4.5:d=0.5" -c:v libx264 -t 5 -pix_fmt yuv420p "${clip1}"`;
execSync(cmdClip1, { stdio: 'inherit' });

// --- 2. Generar Clip 2: Laila en el Bosque Encantado (7 segundos) ---
console.log('🎬 Generando Clip 2: Laila en el Bosque Encantado...');
const fontPath = 'C\\:/Windows/Fonts/segoeui.ttf';
const fontScript = 'C\\:/Windows/Fonts/segoeuib.ttf';

const filterClip2 = [
  "scale=1080:1920:force_original_aspect_ratio=increase",
  "crop=1080:1920",
  "zoompan=z='min(zoom+0.0008,1.15)':x='iw/2-(iw/zoom/2)':y='ih*0.22-(ih/zoom/2)*0.22':d=210:s=1080x1920:fps=30",
  "fade=t=in:st=0:d=0.5",
  "fade=t=out:st=6.5:d=0.5",
  // Banner de texto inferior estilizado
  `drawbox=y=ih-420:color=black@0.45:width=iw:height=420:t=fill:enable='between(t,0.5,7)'`,
  `drawtext=fontfile='${fontScript}':text='🌸 LAILA CELEBRA SU 2º AÑITO 🌸':fontcolor=white:fontsize=46:x=(w-text_w)/2:y=h-360:enable='between(t,0.8,7)'`,
  `drawtext=fontfile='${fontPath}':text='Sábado 7 de Noviembre · 17\\:30 h':fontcolor=0xFFD7E6:fontsize=38:x=(w-text_w)/2:y=h-290:enable='between(t,1.2,7)'`,
  `drawtext=fontfile='${fontPath}':text='El Parque de Beltrán (Arroyo de la Encomienda)':fontcolor=white:fontsize=32:x=(w-text_w)/2:y=h-230:enable='between(t,1.6,7)'`,
  `drawtext=fontfile='${fontPath}':text='Ven a pasar una maravillosa tarde de juegos y merienda':fontcolor=0xFFE680:fontsize=30:x=(w-text_w)/2:y=h-165:enable='between(t,2.0,7)'`
].join(',');

const cmdClip2 = `"${ffmpeg}" -y -loop 1 -i "${forestImg}" -vf "${filterClip2}" -c:v libx264 -t 7 -pix_fmt yuv420p "${clip2}"`;
execSync(cmdClip2, { stdio: 'inherit' });

// --- 3. Generar Clip 3: La Invitación en Papel Oficial (6 segundos) ---
console.log('🎬 Generando Clip 3: La Invitación en Papel Oficial...');
const filterClip3 = [
  "scale=1080:1920:force_original_aspect_ratio=increase",
  "crop=1080:1920",
  "zoompan=z='min(zoom+0.0006,1.08)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=180:s=1080x1920:fps=30",
  "fade=t=in:st=0:d=0.5",
  `drawbox=y=ih-180:color=0xA02050@0.65:width=iw:height=180:t=fill:enable='between(t,0.5,6)'`,
  `drawtext=fontfile='${fontScript}':text='✨ Tu presencia hará este día aún más especial ✨':fontcolor=white:fontsize=40:x=(w-text_w)/2:y=h-135:enable='between(t,0.8,6)'`,
  `drawtext=fontfile='${fontPath}':text='Confirmar asistencia a Natalia · 616 88 55 07':fontcolor=0xFFD7E6:fontsize=32:x=(w-text_w)/2:y=h-80:enable='between(t,1.2,6)'`
].join(',');

const cmdClip3 = `"${ffmpeg}" -y -loop 1 -i "${paperImg}" -vf "${filterClip3}" -c:v libx264 -t 6 -pix_fmt yuv420p "${clip3}"`;
execSync(cmdClip3, { stdio: 'inherit' });

// --- 4. Generar Pista de Audio Mágica (Celesta & Campanitas de Hadas - 18 segundos) ---
console.log('🎵 Generando melodía mágica de cuento de hadas...');
// Generamos arpegios de campanas mágicas de cuento usando síntesis sinusoidal en FFmpeg
const audioSynth = [
  "aevalsrc='0.08*sin(2*PI*523.25*t)*exp(-0.8*mod(t,2)) + ",
  "0.08*sin(2*PI*659.25*t)*exp(-0.8*mod(t+0.5,2)) + ",
  "0.08*sin(2*PI*783.99*t)*exp(-0.8*mod(t+1.0,2)) + ",
  "0.08*sin(2*PI*1046.5*t)*exp(-0.8*mod(t+1.5,2)) + ",
  "0.04*sin(2*PI*1318.5*t)*exp(-1.5*mod(t+0.25,1)) + ",
  "0.03*sin(2*PI*1567.9*t)*exp(-1.5*mod(t+0.75,1))':s=44100:d=18"
].join('');

const cmdAudio = `"${ffmpeg}" -y -f lavfi -i "${audioSynth}" -af "afade=t=in:st=0:d=1,afade=t=out:st=16.5:d=1.5" -c:a pcm_s16le "${audioTrack}"`;
execSync(cmdAudio, { stdio: 'inherit' });

// --- 5. Concatenar y Muxing Final ---
console.log('🔗 Concatenando clips y mezclando audio final...');
const concatList = path.join(videoDir, 'concat_list.txt');
fs.writeFileSync(concatList, `file '${clip1.replace(/\\/g, '/')}'\nfile '${clip2.replace(/\\/g, '/')}'\nfile '${clip3.replace(/\\/g, '/')}'\n`, 'utf8');

const cmdFinal = `"${ffmpeg}" -y -f concat -safe 0 -i "${concatList}" -i "${audioTrack}" -c:v copy -c:a aac -b:a 192k -shortest "${finalVideo}"`;
execSync(cmdFinal, { stdio: 'inherit' });

console.log('🎉 ¡VÍDEO MÁGICO GENERADO CON ÉXITO EN:', finalVideo);
