const fs = require('fs');
const path = require('path');

const b64 = fs.readFileSync(path.join(__dirname, 'template_b64.txt'), 'utf8');

const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Invitación 2º Cumpleaños Laila</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Caveat:wght@700&family=Dancing+Script:wght@700&family=Great+Vibes&family=Montserrat:wght@500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600&family=Quicksand:wght@500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1152px;
      height: 2048px;
      font-family: 'Quicksand', sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .card-wrapper {
      position: relative;
      width: 1152px;
      height: 2048px;
      background-image: url('data:image/jpeg;base64,${b64}');
      background-size: cover;
      background-position: center;
      overflow: hidden;
    }

    /* Soft cover layer matching template layout (scale 2x) */
    .soft-cover-layer {
      position: absolute;
      top: 638px;
      left: 226px;
      width: 700px;
      height: 940px;
      background: radial-gradient(ellipse at 50% 45%, rgba(255, 246, 249, 0.98) 0%, rgba(255, 241, 246, 0.95) 70%, rgba(254, 236, 242, 0.90) 100%);
      border-radius: 56px;
      border: 3px dashed rgba(228, 120, 160, 0.45);
      box-shadow: 0 8px 35px rgba(215, 100, 148, 0.14);
      backdrop-filter: blur(2px);
      z-index: 10;
      padding: 30px 28px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    /* Sparkle accents */
    .sparkle {
      position: absolute;
      color: #e5a458;
      font-size: 24px;
      pointer-events: none;
    }

    /* Name: Laila */
    .name-title {
      font-family: 'Great Vibes', 'Alex Brush', cursive;
      font-size: 168px;
      line-height: 0.9;
      color: #cf4578;
      text-shadow: 0 4px 18px rgba(255, 255, 255, 0.95), 0 6px 12px rgba(207, 69, 120, 0.22);
      margin-top: -6px;
      margin-bottom: 6px;
      transform: rotate(-1deg);
      letter-spacing: 1px;
    }

    /* Subtitle: celebra su segundo añito */
    .subtitle {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 37px;
      font-weight: 700;
      color: #b03666;
      margin-bottom: 18px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .heart-icon {
      color: #e84d85;
      font-size: 30px;
    }

    /* Invitation message */
    .invitation-msg {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 30px;
      line-height: 1.35;
      color: #634350;
      margin-bottom: 22px;
      max-width: 610px;
    }

    /* Event Details Box */
    .details-box {
      width: 100%;
      max-width: 640px;
      background: rgba(255, 255, 255, 0.82);
      border: 2px solid rgba(235, 145, 180, 0.5);
      border-radius: 30px;
      padding: 18px 26px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 22px;
      box-shadow: 0 4px 16px rgba(220, 110, 155, 0.10);
    }

    .detail-row {
      display: flex;
      align-items: center;
      gap: 18px;
      text-align: left;
    }

    .detail-icon-wrap {
      width: 56px;
      height: 56px;
      background: #fdeaf1;
      border: 2px solid #f29bbd;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      flex-shrink: 0;
    }

    .detail-text-main {
      font-size: 31px;
      font-weight: 700;
      color: #a83567;
      line-height: 1.2;
    }

    .detail-text-sub {
      font-size: 23px;
      font-weight: 600;
      color: #7d5967;
      line-height: 1.2;
    }

    /* Emotional phrase */
    .emotional-phrase {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 27px;
      line-height: 1.3;
      color: #634350;
      margin-bottom: 12px;
    }

    /* Te esperamos */
    .te-esperamos {
      font-family: 'Dancing Script', cursive;
      font-size: 48px;
      font-weight: 700;
      color: #d14478;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    /* RSVP */
    .rsvp-box {
      font-size: 23px;
      font-weight: 600;
      color: #634350;
      line-height: 1.3;
    }
    .rsvp-phone {
      font-size: 28px;
      font-weight: 700;
      color: #a82e60;
    }
  </style>
</head>
<body>
  <div class="card-wrapper">
    <div class="soft-cover-layer">
      <!-- Sparkle accents -->
      <span class="sparkle" style="top: 30px; left: 40px;">✦</span>
      <span class="sparkle" style="top: 45px; right: 45px;">✦</span>
      <span class="sparkle" style="bottom: 80px; right: 35px;">✨</span>
      <span class="sparkle" style="bottom: 140px; left: 35px;">✨</span>

      <!-- Name -->
      <div class="name-title">Laila</div>

      <!-- Subtitle -->
      <div class="subtitle">
        celebra su segundo añito <span class="heart-icon">🩷</span>
      </div>

      <!-- Invitation message -->
      <div class="invitation-msg">
        Ven a compartir una tarde divertida de juegos y merienda.
      </div>

      <!-- Details Box -->
      <div class="details-box">
        <!-- Date -->
        <div class="detail-row">
          <div class="detail-icon-wrap">📅</div>
          <div>
            <div class="detail-text-main">7 / 11 / 2026</div>
          </div>
        </div>

        <!-- Time -->
        <div class="detail-row">
          <div class="detail-icon-wrap">⏰</div>
          <div>
            <div class="detail-text-main">17:30 h</div>
          </div>
        </div>

        <!-- Location -->
        <div class="detail-row">
          <div class="detail-icon-wrap">📍</div>
          <div>
            <div class="detail-text-main">El Parque de Beltrán</div>
            <div class="detail-text-sub">C/ Pedro de Valdivia 2, Arroyo de la Encomienda</div>
          </div>
        </div>
      </div>

      <!-- Emotional phrase -->
      <div class="emotional-phrase">
        Tu presencia hará este día aún más especial ✨
      </div>

      <!-- Te esperamos -->
      <div class="te-esperamos">
        🩷 ¡Te esperamos! 🩷
      </div>

      <!-- RSVP -->
      <div class="rsvp-box">
        Confirmar asistencia a:<br>
        <span class="rsvp-phone">📞 616 88 55 07 (Natalia)</span>
      </div>
    </div>
  </div>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'invitacion_final.html'), html, 'utf8');
console.log('2x Ultra-HD HTML written successfully');
