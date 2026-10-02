import PocketBase from 'pocketbase';
import type { Memory, MemoryUploadPayload } from '../types';

// Default PB URL or from Vite env
export const PB_URL = import.meta.env.VITE_POCKETBASE_URL || 'https://api-laila.laibestudioai.com';

export const pb = new PocketBase(PB_URL);

// Disable auto-cancellation so multiple rapid calls don't cancel each other
pb.autoCancellation(false);

const LOCAL_STORAGE_KEY = 'laila_memories_fallback_v1';

// Initial heartwarming seed memories for preview & offline mode
const INITIAL_FALLBACK_MEMORIES: Memory[] = [
  {
    id: 'demo-1',
    autor: 'Papá y Mamá',
    relacion: 'Papis',
    mensaje: 'Hija de mi corazón, verte cumplir 2 años es el mayor regalo que la vida nos ha dado. Cada día aprendemos de tu alegría infinita. ¡Feliz segundo cumpleaños!',
    tipo: 'capsula_18',
    mediaUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    likes: 12,
    destacado: true,
    created: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    autor: 'Los Abuelos Pedro y Carmen',
    relacion: 'Familia',
    mensaje: 'Para nuestra nieta preciosa: que nunca se te borre esa sonrisa traviesa. Cuando seas mayor y leas esto, recuerda que tus abuelos siempre estuvieron y estarán orgullosos de ti.',
    tipo: 'capsula_18',
    mediaUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    likes: 9,
    destacado: true,
    created: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'demo-3',
    autor: 'Tía Sofía',
    relacion: 'Familia',
    mensaje: '¡La reina de la casa cumple 2 años! Ya tengo listos tus regalitos y muchas ganas de jugar toda la tarde el sábado en la fiesta. ¡Te adoro Laila!',
    tipo: 'fiesta',
    mediaUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    mediaType: 'image',
    likes: 7,
    created: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 'demo-4',
    autor: 'Tío David & Laura',
    relacion: 'Amigos de la familia',
    mensaje: '¡Muchas felicidades terremoto! Sigue bailando como bailas y haciéndonos reír tanto a todos.',
    tipo: 'dedicatoria',
    likes: 5,
    created: new Date(Date.now() - 14400000).toISOString(),
  },
];

function getStoredLocalMemories(): Memory[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_FALLBACK_MEMORIES));
      return INITIAL_FALLBACK_MEMORIES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_FALLBACK_MEMORIES;
  }
}

function saveLocalMemories(memories: Memory[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(memories));
  } catch (e) {
    console.error('Error saving local memories:', e);
  }
}

export function getPbMediaUrl(record: { id: string; collectionId?: string; collectionName?: string; media?: string }): string {
  if (!record.media) return '';
  return pb.files.getURL(record as any, record.media);
}

export async function fetchMemories(): Promise<{ memories: Memory[]; isLivePocketBase: boolean }> {
  try {
    // Attempt health check or direct list
    const result = await pb.collection('recuerdos').getList<any>(1, 50, {
      sort: '-created',
      requestKey: null,
    });

    const mapped: Memory[] = result.items.map((item) => {
      const mediaFilename = item.media || '';
      const isVideo = mediaFilename.match(/\.(mp4|mov|webm)$/i);
      const mediaUrl = mediaFilename ? pb.files.getURL(item, mediaFilename) : undefined;

      return {
        id: item.id,
        autor: item.autor || 'Anónimo',
        relacion: item.relacion || 'Amigo/Familia',
        mensaje: item.mensaje || '',
        tipo: (item.tipo as any) || 'fiesta',
        mediaUrl,
        mediaType: isVideo ? 'video' : mediaUrl ? 'image' : undefined,
        mediaFile: mediaFilename,
        collectionId: item.collectionId,
        likes: item.likes || 0,
        destacado: item.destacado || false,
        created: item.created || new Date().toISOString(),
      };
    });

    return { memories: mapped, isLivePocketBase: true };
  } catch (error) {
    // PocketBase not deployed yet or server down -> fallback seamlessly
    console.info('PocketBase aún no está conectado. Usando almacén local/demo.', error);
    return { memories: getStoredLocalMemories(), isLivePocketBase: false };
  }
}

export async function createMemory(payload: MemoryUploadPayload): Promise<{ success: boolean; memory: Memory; isLive: boolean }> {
  const formData = new FormData();
  formData.append('autor', payload.autor);
  formData.append('relacion', payload.relacion);
  formData.append('mensaje', payload.mensaje);
  formData.append('tipo', payload.tipo);
  formData.append('likes', '0');

  if (payload.file) {
    formData.append('media', payload.file);
  }

  try {
    const record = await pb.collection('recuerdos').create(formData);
    const isVideo = payload.file?.type.startsWith('video/') || false;
    const mediaUrl = record.media ? pb.files.getURL(record, record.media) : undefined;

    const newMem: Memory = {
      id: record.id,
      autor: record.autor,
      relacion: record.relacion,
      mensaje: record.mensaje,
      tipo: record.tipo,
      mediaUrl,
      mediaType: isVideo ? 'video' : mediaUrl ? 'image' : undefined,
      mediaFile: record.media,
      collectionId: record.collectionId,
      likes: 0,
      created: record.created,
    };

    return { success: true, memory: newMem, isLive: true };
  } catch (error) {
    console.warn('No se pudo guardar en PocketBase directamente, guardando en local:', error);

    // Create a local object with objectURL if file exists
    let localMediaUrl: string | undefined = undefined;
    let mediaType: 'image' | 'video' | undefined = undefined;

    if (payload.file) {
      localMediaUrl = URL.createObjectURL(payload.file);
      mediaType = payload.file.type.startsWith('video/') ? 'video' : 'image';
    }

    const fallbackMem: Memory = {
      id: 'local-' + Date.now(),
      autor: payload.autor,
      relacion: payload.relacion,
      mensaje: payload.mensaje,
      tipo: payload.tipo,
      mediaUrl: localMediaUrl,
      mediaType,
      likes: 0,
      created: new Date().toISOString(),
    };

    const current = getStoredLocalMemories();
    const updated = [fallbackMem, ...current];
    saveLocalMemories(updated);

    return { success: true, memory: fallbackMem, isLive: false };
  }
}

export async function toggleLike(memoryId: string, currentLikes: number): Promise<number> {
  const newLikes = currentLikes + 1;
  try {
    await pb.collection('recuerdos').update(memoryId, {
      'likes+': 1,
    });
  } catch {
    // Update local storage
    const list = getStoredLocalMemories().map((m) => (m.id === memoryId ? { ...m, likes: newLikes } : m));
    saveLocalMemories(list);
  }
  return newLikes;
}
