# 🚀 Guía de Despliegue: PocketBase en Easypanel (VPS 76.13.152.6)

Esta guía te muestra cómo desplegar en **2 minutos** el backend de PocketBase para la Cápsula del Tiempo de **Laila** en tu servidor con Easypanel.

---

## 1. Crear el Servicio en Easypanel

1. Entra a tu Easypanel (`http://76.13.152.6:3000`).
2. Entra en tu proyecto o crea uno nuevo llamado `laila` (o `laibe-events`).
3. Haz clic en **+ Service** -> **App**.
4. Rellena los datos básicos:
   * **App Name:** `laila-pb` (o `capsula-laila-api`).
   * **Docker Image:** `ghcr.io/muchobien/pocketbase:latest`
5. **Configuración de Puertos (Ports):**
   * Puerto de la aplicación: `8090` (el puerto por defecto de PocketBase).
6. **Dominio (Domains):**
   * Añade el dominio: `api-laila.laibestudioai.com` (o el que prefieras dentro de tus dominios).
   * Traefik generará el certificado SSL / HTTPS de Let's Encrypt automáticamente.
7. **Persistencia / Volúmenes (Volumes):**
   * Añade un volumen para que las fotos y la base de datos SQLite no se borren al reiniciar:
     * **Name / Volume:** `laila_pb_data`
     * **Mount Path:** `/pb_data`
8. Haz clic en **Deploy**.

---

## 2. Crear tu Cuenta de Administrador

1. Una vez desplegado, abre en tu navegador:  
   `https://api-laila.laibestudioai.com/_/`
2. Te pedirá crear el primer usuario **Super Admin**:
   * Email: tu email habitual de Laibe Studio.
   * Contraseña: tu contraseña segura.

---

## 3. Crear la Colección `recuerdos`

En el panel lateral izquierdo de PocketBase:
1. Haz clic en **New collection**.
2. **Name:** `recuerdos`
3. **Type:** `Base collection`

### Campos (Fields):
Haz clic en **New field** y añade estos campos:

| Campo | Tipo | Requerido | Opciones |
| :--- | :--- | :--- | :--- |
| `autor` | **Plain text** | ✅ Sí | Longitud mín: 1, máx: 100 |
| `relacion` | **Plain text** | ❌ No | (Ej: Familia, Papis, Tíos...) |
| `mensaje` | **Plain text** | ❌ No | Multiline activado |
| `tipo` | **Select** | ✅ Sí | Valores: `fiesta`, `capsula_18`, `dedicatoria` (Max select: 1) |
| `media` | **File** | ❌ No | Max files: 1, Max size: 50MB. Mime types: `image/*`, `video/*` |
| `likes` | **Number** | ❌ No | Default: 0 |
| `destacado` | **Bool** | ❌ No | Default: false |

### Reglas de Acceso API (API Rules):
Haz clic en la pestaña **API Rules** de la colección `recuerdos` y déjalas así:

* **List/Search rule:** `""` *(Dejar vacío o desbloqueado para que los invitados puedan ver el muro en vivo)*
* **View rule:** `""` *(Desbloqueado)*
* **Create rule:** `""` *(Desbloqueado para que cualquier invitado pueda subir una foto sin tener que crearse una cuenta)*
* **Update rule:** `""` *(Para que el botón de dar "Like" funcione sin login)*
* **Delete rule:** `@request.auth.id != ""` *(Bloqueado: SOLO tú como administrador puedes borrar recuerdos desde el panel)*

Haz clic en **Save changes**. ¡Y listo!

---

## 4. Desplegar el Frontend (La WebApp)

Tienes 2 opciones para tener la WebApp en vivo:

### Opción A (En tu Easypanel como App Estática con Nginx / Caddy):
* Creas otro servicio en Easypanel: `laila-web` con dominio `laila.laibestudioai.com`.
* Le asocias el repositorio o la carpeta `dist` compilada con el Dockerfile incluido en el proyecto.

### Opción B (Cloudflare Pages - 100% Gratis en 30 segundos):
* Conectas el repositorio de Git a Cloudflare Pages.
* Comando de build: `npm run build`
* Carpeta de salida: `dist`
* Variable de entorno: `VITE_POCKETBASE_URL = https://api-laila.laibestudioai.com`
* ¡Tendrás CDN global con velocidad instantánea en cualquier móvil!

---

## 5. El Panel de Control para los Padres (Tú y tu Pareja)

Durante o después de la fiesta del 7 de noviembre:
* Entras a `https://api-laila.laibestudioai.com/_/` desde tu móvil o portátil.
* Puedes ver todas las fotos que suban los invitados en una tabla visual.
* Puedes borrar fotos repetidas o borrosas.
* Puedes descargar todas las fotos y vídeos originales para guardarlos en un disco duro o en Google Drive.
