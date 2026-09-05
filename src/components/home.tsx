import { useState, useEffect, ReactNode } from 'react';
import { Lock } from "lucide-react";
import MenuBar from './macos/MenuBar';
import Dock from './macos/Dock';
import Window from './macos/Window';
import Terminal from './macos/Terminal';
import Spotlight from './macos/Spotlight';
import AboutComponent from './windows/about';
import ActivityComponent from './windows/activityTimeLine';
import CareerComponent from './windows/career';
import LinksComponent from './windows/links';
import ContactComponent from './windows/contact';
import ProjectsComponent from './windows/projects';
import { cascadePosition, fitSize, initialDesktopLayout } from '@/lib/windowLayout';

interface WindowItem {
  id: string;
  title: string;
  initialPosition: {x: number; y: number} | null;
  type: 'finder' | 'terminal';
  isNew: boolean;
  zIndex: number;
  initialSize: { width: number; height: number },
  children: ReactNode | null; 
}

const APP_LAYOUT: Record<string, { width: number; height: number; w: number; h: number }> = {
  projects: { width: 1200, height: 800, w: 0.72, h: 0.88 },
  about: { width: 1000, height: 500, w: 0.58, h: 0.52 },
  activities: { width: 900, height: 800, w: 0.55, h: 0.86 },
  career: { width: 900, height: 650, w: 0.55, h: 0.72 },
  links: { width: 900, height: 330, w: 0.5, h: 0.4 },
  contact: { width: 900, height: 500, w: 0.52, h: 0.55 },
  terminal: { width: 900, height: 600, w: 0.55, h: 0.65 },
};

const Home = () => {
  const [windows, setWindows] = useState<WindowItem[]>(() => {
    const layout = initialDesktopLayout();
    return [
      { id: 'initial-1', title: 'About', type: 'finder', isNew: true, zIndex: 10, initialPosition: layout.about.position, initialSize: layout.about.size, children: <AboutComponent /> },
      { id: 'initial-2', title: 'Projects', type: 'finder', isNew: true, zIndex: 11, initialPosition: layout.projects.position, initialSize: layout.projects.size, children: <ProjectsComponent /> },
      { id: 'initial-3', title: 'Links', type: 'finder', isNew: true, zIndex: 12, initialPosition: layout.links.position, initialSize: layout.links.size, children: <LinksComponent /> },
    ];
  });
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [maxZIndex, setMaxZIndex] = useState(12);
  const [isLocked, setIsLocked] = useState(true);
  const [time, setTime] = useState<string>("");


  const [isFadingOut, setIsFadingOut] = useState(false);


  const handleUnlock = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsLocked(false);
      setIsFadingOut(false);
    }, 600);
  };

  // 시간 표시 + 단축키 설정
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.code === 'Space') {
        e.preventDefault();
        setSpotlightOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleAppClick = (appId: string) => {
    if (appId == 'trash') {
      setWindows([]);
      return;
    }

    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    const spec = APP_LAYOUT[appId];
    if (!spec) return;

    const titleMap: Record<string, string> = {
      projects: 'Projects',
      about: 'About',
      activities: 'Activities',
      career: 'Career',
      links: 'Links',
      contact: 'Contact',
      terminal: 'Terminal',
    };
    const childMap: Record<string, ReactNode | null> = {
      projects: <ProjectsComponent />,
      about: <AboutComponent />,
      activities: <ActivityComponent />,
      career: <CareerComponent />,
      links: <LinksComponent />,
      contact: <ContactComponent />,
      terminal: null,
    };

    setWindows((prev) => {
      const size = fitSize({ width: spec.width, height: spec.height }, { w: spec.w, h: spec.h });
      const position = cascadePosition(prev.length, size);
      return [
        ...prev,
        {
          id: `window-${Date.now()}`,
          title: titleMap[appId],
          type: appId === 'terminal' ? 'terminal' : 'finder',
          isNew: true,
          zIndex: newZIndex,
          initialPosition: position,
          initialSize: size,
          children: childMap[appId],
        },
      ];
    });
  };

  const handleCloseWindow = (windowId: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== windowId));
  };

  const bringToFront = (windowId: string) => {
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, zIndex: newZIndex } : w
      )
    );
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 relative">
      
      {/* 🔹 잠금화면 오버레이 */}
      {isLocked && (
        <div
          onClick={handleUnlock}
          className={`absolute inset-0 flex flex-col items-center justify-center bg-cover bg-center text-white cursor-pointer transition-opacity duration-700 ${
            isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
          }`}
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1950&q=80')",
            zIndex: 9999,
          }}
        >
          {/* 어두운 오버레이 */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

          {/* 시계 */}
          <div className="relative z-10 text-6xl font-light mb-3">{time}</div>

          {/* 안내 텍스트 */}
          <p className="relative z-10 text-gray-300 text-sm">Click anywhere to unlock</p>

          {/* 잠금 아이콘 */}
          <Lock className="relative z-10 w-8 h-8 text-gray-300 mt-6" />
        </div>
      )}

      {/* Desktop wallpaper pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Menu Bar */}
      <MenuBar />

      {/* Desktop area */}
      <div className="pt-6 h-full">
        {/* Windows */}
        {windows.map((window) => (
          window.type === 'finder' ? (
            <Window
              key={window.id}
              title={window.title}
              onClose={() => handleCloseWindow(window.id)}
              initialPosition={window.initialPosition ?? { x: 80, y: 48 }}
              initialSize={window.initialSize}
              children={window.children}
              isNew={window.isNew}
              zIndex={window.zIndex}
              onFocus={() => bringToFront(window.id)}
            />
          ) : (
            <Terminal
              key={window.id}
              title={window.title}
              onClose={() => handleCloseWindow(window.id)}
              initialPosition={window.initialPosition ?? { x: 80, y: 48 }}
              initialSize={window.initialSize}
              isNew={window.isNew}
              zIndex={window.zIndex}
              onFocus={() => bringToFront(window.id)}
            />
          )
        ))}
      </div>

      {/* Dock */}
      <Dock onAppClick={handleAppClick} />

      {/* Spotlight */}
      {/* <Spotlight isOpen={spotlightOpen} onClose={() => setSpotlightOpen(false)} /> */}
    </div>
  );
};

export default Home;
