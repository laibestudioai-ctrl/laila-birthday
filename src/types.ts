export type MemoryType = 'fiesta' | 'capsula_18' | 'dedicatoria';

export interface Memory {
  id: string;
  autor: string;
  relacion: string;
  mensaje: string;
  tipo: MemoryType;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  mediaFile?: string; // PocketBase filename
  collectionId?: string;
  likes: number;
  destacado?: boolean;
  created: string;
}

export interface Milestone {
  id: string;
  mes: number;
  titulo: string;
  edadTexto: string;
  descripcion: string;
  fotoUrl: string;
  icono: string;
}

export interface MemoryUploadPayload {
  autor: string;
  relacion: string;
  mensaje: string;
  tipo: MemoryType;
  file?: File | null;
}
