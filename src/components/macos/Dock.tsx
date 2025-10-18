import { useState } from 'react';
import { Folder, User, Activity, Briefcase, SquareArrowUp, Contact, Trash2, AppWindow } from 'lucide-react';

interface DockApp {
  id: string;
  name: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

interface DockProps {
  onAppClick?: (appId: string) => void;
}

const Dock = ({ onAppClick = () => {} }: DockProps) => {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  const apps: DockApp[] = [
    { id: 'about', name: 'About', icon: <User className="w-full h-full" /> },
    { id: 'projects', name: 'Projects', icon: <Folder className="w-full h-full" /> },
    { id: 'activities', name: 'Activities', icon: <Activity className="w-full h-full" /> },
    { id: 'career', name: 'Career', icon: <Briefcase className="w-full h-full" /> },
    { id: 'links', name: 'Links', icon: <SquareArrowUp className="w-full h-full" /> },
    { id: 'terminal', name: 'Terminal', icon: <AppWindow className="w-full h-full" /> },
    { id: 'contact', name: 'Contact', icon: <Contact className="w-full h-full" /> },
  ];

  const trashApp: DockApp = {
    id: 'trash',
    name: 'Trash',
    icon: <Trash2 className="w-full h-full" />,
  };

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white/30 backdrop-blur-2xl border border-white/20 rounded-2xl px-3 py-2 shadow-2xl">
        <div className="flex items-end gap-2">
          {/* Main apps */}
          {apps.map((app) => (
            <div
              key={app.id}
              className="relative group"
              onMouseEnter={() => setHoveredApp(app.id)}
              onMouseLeave={() => setHoveredApp(null)}
            >
              {/* Tooltip */}
              {hoveredApp === app.id && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {app.name}
                </div>
              )}
              
              {/* App icon */}
              <button
                onClick={() => onAppClick(app.id)}
                className={`
                  w-14 h-14 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 
                  flex items-center justify-center text-white
                  transition-all duration-200 ease-out
                  hover:scale-125 hover:-translate-y-2
                  active:scale-110
                  shadow-lg hover:shadow-xl
                  ${hoveredApp === app.id ? 'scale-125 -translate-y-2' : ''}
                `}
                style={{
                  animation: hoveredApp === app.id ? 'bounce 0.5s ease-in-out' : 'none',
                }}
              >
                <div className="w-8 h-8">
                  {app.icon}
                </div>
              </button>
              
              {/* Active indicator */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-gray-700 rounded-full" />
            </div>
          ))}

          {/* Separator */}
          <div className="w-px h-12 bg-white/30 mx-1" />

          {/* Trash */}
          <div
            className="relative group"
            onMouseEnter={() => setHoveredApp(trashApp.id)}
            onMouseLeave={() => setHoveredApp(null)}
          >
            {hoveredApp === trashApp.id && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {trashApp.name}
              </div>
            )}
            
            <button
              onClick={() => onAppClick(trashApp.id)}
              className={`
                w-14 h-14 rounded-xl bg-gradient-to-br from-gray-400 to-gray-600 
                flex items-center justify-center text-white
                transition-all duration-200 ease-out
                hover:scale-125 hover:-translate-y-2
                active:scale-110
                shadow-lg hover:shadow-xl
                ${hoveredApp === trashApp.id ? 'scale-125 -translate-y-2' : ''}
              `}
            >
              <div className="w-8 h-8">
                {trashApp.icon}
              </div>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(-8px) scale(1.25); }
          50% { transform: translateY(-16px) scale(1.25); }
        }
      `}</style>
    </div>
  );
};

export default Dock;