import { useEffect, useState, ReactNode } from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';
import { useWindowFrame } from '@/lib/useWindowFrame';

interface WindowProps {
  title?: string;
  onClose?: () => void;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  isNew?: boolean;
  children?: ReactNode;
  zIndex?: number;
  onFocus?: () => void;
}

const Window = ({
  title = 'Finder',
  onClose = () => {},
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 800, height: 500 },
  isNew = false,
  children,
  zIndex = 10,
  onFocus = () => {},
}: WindowProps) => {
  const { windowRef, position, size, isDragging, isResizing, startDrag, startResize } =
    useWindowFrame(initialPosition, initialSize);
  const [isAnimating, setIsAnimating] = useState(isNew);

  useEffect(() => {
    if (!isNew) return;
    const timer = setTimeout(() => setIsAnimating(false), 400);
    return () => clearTimeout(timer);
  }, [isNew]);

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus();
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    startDrag(e);
  };

  return (
    <div
      ref={windowRef}
      onClick={() => onFocus()}
      className={`fixed bg-white rounded-lg shadow-2xl overflow-hidden ${
        isAnimating ? 'animate-window-open' : ''
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: zIndex,
        willChange: isDragging || isResizing ? 'left, top, width, height' : undefined,
      }}
    >
      <div
        className="h-11 bg-gradient-to-b from-gray-100 to-gray-200 border-b border-gray-300 flex items-center px-4 cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="window-controls flex items-center gap-2">
          <button
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center group"
          >
            <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100" />
          </button>
          <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center group">
            <Minus className="w-2 h-2 text-yellow-900 opacity-0 group-hover:opacity-100" />
          </button>
          <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center group">
            <Maximize2 className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100" />
          </button>
        </div>

        <div className="flex-1 text-center text-sm font-medium text-gray-700">
          {title}
        </div>
        <div className="w-16" />
      </div>

      <div className="absolute top-11 right-0 bottom-0 left-0 overflow-auto [&>.project-finder]:h-full [&>.project-finder]:overflow-hidden">
        {children}
      </div>

      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
        onMouseDown={(e) => {
          onFocus();
          startResize(e);
        }}
      />
    </div>
  );
};

export default Window;
