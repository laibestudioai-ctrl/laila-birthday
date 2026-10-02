import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import type { TabType } from './components/Navigation';
import { LiveFeed } from './components/LiveFeed';
import { TimeCapsuleView } from './components/TimeCapsuleView';
import { MilestonesTimeline } from './components/MilestonesTimeline';
import { PartyInfo } from './components/PartyInfo';
import { PrintCardView } from './components/PrintCardView';
import { UploadModal } from './components/UploadModal';
import { MediaLightbox } from './components/MediaLightbox';
import type { Memory, MemoryUploadPayload } from './types';
import { fetchMemories, createMemory, toggleLike } from './lib/pocketbase';
import { Camera } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('feed');
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isLivePocketBase, setIsLivePocketBase] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [lightboxMedia, setLightboxMedia] = useState<{
    url: string;
    type: 'image' | 'video';
    title: string;
  } | null>(null);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const res = await fetchMemories();
      setMemories(res.memories);
      setIsLivePocketBase(res.isLivePocketBase);
      setIsLoading(false);
    }
    load();
  }, []);

  const handleUploadMemory = async (payload: MemoryUploadPayload): Promise<boolean> => {
    try {
      const res = await createMemory(payload);
      if (res.success) {
        setMemories((prev) => [res.memory, ...prev]);
        setIsLivePocketBase(res.isLive);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Error al subir recuerdo:', e);
      return false;
    }
  };

  const handleLikeMemory = async (id: string, currentLikes: number) => {
    await toggleLike(id, currentLikes);
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, likes: currentLikes + 1 } : m))
    );
  };

  const openMediaLightbox = (url: string, type: 'image' | 'video', title: string) => {
    setLightboxMedia({ url, type, title });
  };

  const totalPhotos = memories.filter((m) => !!m.mediaUrl).length;
  const totalCapsule = memories.filter((m) => m.tipo === 'capsula_18').length;

  return (
    <div className="min-h-screen bg-[#faf7f5] text-stone-900 flex flex-col font-sans selection:bg-rose-200 selection:text-rose-900">
      {/* Top Header & Hero */}
      <Header
        totalMemories={memories.length}
        totalPhotos={totalPhotos}
        totalCapsule={totalCapsule}
        isLivePocketBase={isLivePocketBase}
        onOpenUpload={() => setIsUploadOpen(true)}
      />

      {/* Tabs Navigation */}
      <Navigation
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        capsuleCount={totalCapsule}
      />

      {/* Main Tab Content */}
      <main className="flex-1">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-stone-400 gap-3">
            <div className="w-8 h-8 border-3 border-rose-300 border-t-rose-600 rounded-full animate-spin" />
            <p className="text-xs font-medium">Cargando recuerdos de Laila...</p>
          </div>
        ) : (
          <>
            {activeTab === 'feed' && (
              <LiveFeed
                memories={memories}
                onLike={handleLikeMemory}
                onOpenMedia={openMediaLightbox}
                onOpenUpload={() => setIsUploadOpen(true)}
              />
            )}

            {activeTab === 'capsule' && (
              <TimeCapsuleView
                memories={memories}
                onOpenUpload={() => setIsUploadOpen(true)}
                onLike={handleLikeMemory}
                onOpenMedia={openMediaLightbox}
              />
            )}

            {activeTab === 'timeline' && (
              <MilestonesTimeline onOpenMedia={openMediaLightbox} />
            )}

            {activeTab === 'party' && <PartyInfo />}

            {activeTab === 'print' && <PrintCardView />}
          </>
        )}
      </main>

      {/* Floating Action Button for rapid upload (visible on mobile) */}
      <div className="fixed bottom-5 right-5 z-40 sm:hidden">
        <button
          onClick={() => setIsUploadOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 text-white shadow-xl shadow-rose-400/50 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          title="Añadir recuerdo"
        >
          <Camera className="w-6 h-6" />
        </button>
      </div>

      {/* Upload Bottom Sheet Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSubmit={handleUploadMemory}
      />

      {/* Fullscreen Photo/Video Lightbox */}
      {lightboxMedia && (
        <MediaLightbox
          url={lightboxMedia.url}
          type={lightboxMedia.type}
          title={lightboxMedia.title}
          onClose={() => setLightboxMedia(null)}
        />
      )}

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-stone-400 border-t border-stone-200/60 bg-white/40 mt-auto">
        <p className="flex items-center justify-center gap-1">
          <span>Hecho con</span>
          <span className="text-rose-500">❤️</span>
          <span>para el 2º cumple de Laila</span>
        </p>
        <p className="text-[10px] text-stone-400 mt-1">
          Laibe Studio AI · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default App;
