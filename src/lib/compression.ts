import imageCompression from 'browser-image-compression';

export async function compressImage(file: File): Promise<File> {
  // If not an image (e.g. video), return as-is
  if (!file.type.startsWith('image/')) {
    return file;
  }

  // If already under 1MB, keep it
  if (file.size < 1024 * 1024) {
    return file;
  }

  const options = {
    maxSizeMB: 1.2,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: 'image/jpeg',
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.warn('Compresión falló, usando archivo original:', error);
    return file;
  }
}
