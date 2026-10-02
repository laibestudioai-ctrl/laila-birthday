import React from 'react';
import { Camera, Hourglass, CalendarHeart, PartyPopper, QrCode } from 'lucide-react';

export type TabType = 'feed' | 'capsule' | 'timeline' | 'party' | 'print';

interface NavigationProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  capsuleCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onChangeTab,
  capsuleCount,
}) => {
  const tabs = [
    {
      id: 'feed' as TabType,
      label: 'Muro Fiesta',
      icon: Camera,
      badge: null,
    },
    {
      id: 'capsule' as TabType,
      label: 'Para sus 18',
      icon: Hourglass,
      badge: capsuleCount > 0 ? capsuleCount : null,
    },
    {
      id: 'timeline' as TabType,
      label: '24 Meses',
      icon: CalendarHeart,
      badge: null,
    },
    {
      id: 'party' as TabType,
      label: 'La Fiesta',
      icon: PartyPopper,
      badge: null,
    },
    {
      id: 'print' as TabType,
      label: 'Tarjeta NFC',
      icon: QrCode,
      badge: 'Físico',
    },
  ];

  return (
    <nav className="sticky top-2 z-30 px-3 max-w-xl mx-auto mb-6">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-1.5 shadow-md border border-stone-200/80 flex items-center justify-between gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`relative flex-1 py-2 px-1 sm:px-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-500'}`} />
              <span className="truncate">{tab.label}</span>

              {tab.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold leading-tight ${
                    isActive
                      ? 'bg-white/30 text-white'
                      : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
