import { useState } from 'react';
import { Apple, Wifi, Battery, Clock } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const MenuBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useState(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-6 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 flex items-center px-4 text-xs font-medium z-50">
      {/* Left side - Apple menu and app menus */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-gray-200/50 px-2 py-0.5 rounded transition-colors outline-none">
            <Apple className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>About This Mac</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>System Preferences...</DropdownMenuItem>
            <DropdownMenuItem>App Store...</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Recent Items</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Force Quit...</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sleep</DropdownMenuItem>
            <DropdownMenuItem>Restart...</DropdownMenuItem>
            <DropdownMenuItem>Shut Down...</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Lock Screen</DropdownMenuItem>
            <DropdownMenuItem>Log Out...</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-gray-200/50 px-2 py-0.5 rounded transition-colors outline-none">
            Finder
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>About Finder</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Preferences...</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Empty Trash...</DropdownMenuItem>
            <DropdownMenuItem>Services</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Hide Finder</DropdownMenuItem>
            <DropdownMenuItem>Hide Others</DropdownMenuItem>
            <DropdownMenuItem>Show All</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-gray-200/50 px-2 py-0.5 rounded transition-colors outline-none">
            File
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>New Finder Window</DropdownMenuItem>
            <DropdownMenuItem>New Folder</DropdownMenuItem>
            <DropdownMenuItem>New Smart Folder</DropdownMenuItem>
            <DropdownMenuItem>New Tab</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Open</DropdownMenuItem>
            <DropdownMenuItem>Close Window</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-gray-200/50 px-2 py-0.5 rounded transition-colors outline-none">
            Edit
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>Undo</DropdownMenuItem>
            <DropdownMenuItem>Redo</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Cut</DropdownMenuItem>
            <DropdownMenuItem>Copy</DropdownMenuItem>
            <DropdownMenuItem>Paste</DropdownMenuItem>
            <DropdownMenuItem>Select All</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-gray-200/50 px-2 py-0.5 rounded transition-colors outline-none">
            View
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>as Icons</DropdownMenuItem>
            <DropdownMenuItem>as List</DropdownMenuItem>
            <DropdownMenuItem>as Columns</DropdownMenuItem>
            <DropdownMenuItem>as Gallery</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Show Preview</DropdownMenuItem>
            <DropdownMenuItem>Show Toolbar</DropdownMenuItem>
            <DropdownMenuItem>Show Sidebar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-gray-200/50 px-2 py-0.5 rounded transition-colors outline-none">
            Go
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>Back</DropdownMenuItem>
            <DropdownMenuItem>Forward</DropdownMenuItem>
            <DropdownMenuItem>Enclosing Folder</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Documents</DropdownMenuItem>
            <DropdownMenuItem>Desktop</DropdownMenuItem>
            <DropdownMenuItem>Downloads</DropdownMenuItem>
            <DropdownMenuItem>Home</DropdownMenuItem>
            <DropdownMenuItem>Applications</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right side - System icons */}
      <div className="ml-auto flex items-center gap-3">
        <button className="hover:bg-gray-200/50 p-1 rounded transition-colors">
          <Wifi className="w-3.5 h-3.5" />
        </button>
        <button className="hover:bg-gray-200/50 p-1 rounded transition-colors">
          <Battery className="w-3.5 h-3.5" />
        </button>
        <div className="flex items-center gap-1.5 hover:bg-gray-200/50 px-2 py-0.5 rounded transition-colors cursor-pointer">
          <span>{formatDate(currentTime)}</span>
          <span>{formatTime(currentTime)}</span>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;