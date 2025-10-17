import { useState, useRef, useEffect, ReactNode } from 'react';
import { X, Minus, Maximize2, ChevronRight, File, Folder } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface WindowProps {
  title?: string;
  onClose?: () => void;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  isNew?: boolean;
  children?: ReactNode;
  showFinderContent?: boolean;
  zIndex?: number;
  onFocus?: () => void;
}

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileItem[];
}

const Window = ({
  title = 'Finder',
  onClose = () => {},
  initialPosition = { x: 100, y: 100 },
  initialSize,
  isNew = false,
  children,
  showFinderContent = true,
  zIndex = 10,
  onFocus = () => {},
}: WindowProps) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedSidebar, setSelectedSidebar] = useState('tomatoagent');
  const [selectedColumn1, setSelectedColumn1] = useState<string | null>(null);
  const [selectedColumn2, setSelectedColumn2] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(isNew);
  
  const windowRef = useRef<HTMLDivElement>(null);

  // Animation effect for new windows
  useEffect(() => {
    if (isNew) {
      const timer = setTimeout(() => setIsAnimating(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isNew]);

  const sidebarItems = [
    { id: 'recent', label: 'Recent', items: ['tomatoAgent', 'Meaire', 'blogUploader', 'VPModel'] },
    { id: 'legacy', label: 'Legacy', items: ['GPS-Instagram', 'MSG Guard', 'Code Encryption', 'Legacy Portfolio'] },
  ];

  const mockFiles: Record<string, FileItem[]> = {
    tomatoagent: [
      { id: '1', name: 'techStack', type: 'folder', children: [
        { id: '1-1', name: 'Website Redesign', type: 'folder' },
        { id: '1-2', name: 'Mobile App', type: 'folder' },
      ]},
      { id: '2', name: 'Description', type: 'folder', children: [
        { id: '2-1', name: 'Q1 Report.pdf', type: 'file' },
        { id: '2-2', name: 'Q2 Report.pdf', type: 'file' },
      ]},
      { id: '3', name: 'Presentation.key', type: 'file' },
      { id: '4', name: 'Budget.xlsx', type: 'file' },
    ],
    meaire: [
      { id: '1', name: 'techStack', type: 'folder', children: [
        { id: '1-1', name: 'Website Redesign', type: 'folder' },
        { id: '1-2', name: 'Mobile App', type: 'folder' },
      ]},
      { id: '2', name: 'Description', type: 'folder', children: [
        { id: '2-1', name: 'Q1 Report.pdf', type: 'file' },
        { id: '2-2', name: 'Q2 Report.pdf', type: 'file' },
      ]},
      { id: '3', name: 'Presentation.key', type: 'file' },
    ],
    bloguploader: [
      { id: '1', name: 'Projects', type: 'folder', children: [
        { id: '1-1', name: 'Website Redesign', type: 'folder' },
        { id: '1-2', name: 'Mobile App', type: 'folder' },
      ]},
      { id: '2', name: 'Reports', type: 'folder', children: [
        { id: '2-1', name: 'Q1 Report.pdf', type: 'file' },
        { id: '2-2', name: 'Q2 Report.pdf', type: 'file' },
      ]},
      { id: '3', name: 'test.key', type: 'file' },
      { id: '4', name: 'Budget.xlsx', type: 'file' },
    ],
    vpmodel: [
      { id: '1', name: 'Projects', type: 'folder', children: [
        { id: '1-1', name: 'Website Redesign', type: 'folder' },
        { id: '1-2', name: 'Mobile App', type: 'folder' },
      ]},
      { id: '2', name: 'Reports', type: 'folder', children: [
        { id: '2-1', name: 'Q1 Report.pdf', type: 'file' },
        { id: '2-2', name: 'Q2 Report.pdf', type: 'file' },
      ]},
      { id: '3', name: 'tes2t.key', type: 'file' },
      { id: '4', name: 'Budget.xlsx', type: 'file' },
    ],
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus();
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
  };

  const handleWindowClick = () => {
    onFocus();
  };


  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
      if (isResizing) {
        const newWidth = e.clientX - position.x;
        const newHeight = e.clientY - position.y;
        setSize({
          width: Math.max(600, newWidth),
          height: Math.max(400, newHeight),
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, position]);

  const currentFiles = mockFiles[selectedSidebar] || [];
  const column2Files = selectedColumn1 
    ? currentFiles.find(f => f.id === selectedColumn1)?.children || []
    : [];
  const column3Files = selectedColumn2
    ? column2Files.find(f => f.id === selectedColumn2)?.children || []
    : [];

  return (
    <div
      ref={windowRef}
      onClick={handleWindowClick}
      className={`fixed bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ${
        isAnimating ? 'animate-window-open' : ''
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: zIndex,
      }}
    >
      {/* Title bar */}
      <div
        className="h-11 bg-gradient-to-b from-gray-100 to-gray-200 border-b border-gray-300 flex items-center px-4 cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        {/* Window controls */}
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

        {/* Title */}
        <div className="flex-1 text-center text-sm font-medium text-gray-700">
          {title}
        </div>
        <div className="w-16" />
      </div>


      {/* Content */}
      {children ? (
        <div className="h-[calc(100%-2.75rem)] overflow-auto">
          {children}
        </div>
      ) : showFinderContent ? (
        <div className="flex h-[calc(100%-2.75rem)]">
        {/* Sidebar */}
        <div className="w-48 bg-gray-50/80 backdrop-blur-sm border-r border-gray-200">
          <ScrollArea className="h-full">
            <div className="p-2 space-y-4">
              {sidebarItems.map((section) => (
                <div key={section.id}>
                  <div className="text-xs font-semibold text-gray-500 px-2 mb-1">
                    {section.label}
                  </div>
                  <div className="space-y-0.5">
                    {section.items.map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setSelectedSidebar(item.toLowerCase());
                          setSelectedColumn1(null);
                          setSelectedColumn2(null);
                        }}
                        className={`
                          w-full text-left px-2 py-1 rounded text-sm
                          transition-colors flex items-center gap-2
                          ${selectedSidebar === item.toLowerCase()
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-700 hover:bg-gray-200'
                          }
                        `}
                      >
                        <Folder className="w-4 h-4" />
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
          {/* Column view */}
          <div className="flex-1 flex">
            {/* Column 1 */}
            <div className="flex-1 border-r border-gray-200">
              <ScrollArea className="h-full">
                <div className="p-2">
                  {currentFiles.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedColumn1(item.id);
                        setSelectedColumn2(null);
                      }}
                      className={`
                        w-full text-left px-3 py-2 rounded text-sm
                        transition-colors flex items-center gap-2
                        ${selectedColumn1 === item.id
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                    >
                      {item.type === 'folder' ? (
                        <Folder className="w-4 h-4" />
                      ) : (
                        <File className="w-4 h-4" />
                      )}
                      <span className="flex-1">{item.name}</span>
                      {item.type === 'folder' && (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Column 2 */}
            {selectedColumn1 && column2Files.length > 0 && (
              <div className="flex-1 border-r border-gray-200">
                <ScrollArea className="h-full">
                  <div className="p-2">
                    {column2Files.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedColumn2(item.id)}
                        className={`
                          w-full text-left px-3 py-2 rounded text-sm
                          transition-colors flex items-center gap-2
                          ${selectedColumn2 === item.id
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                          }
                        `}
                      >
                        {item.type === 'folder' ? (
                          <Folder className="w-4 h-4" />
                        ) : (
                          <File className="w-4 h-4" />
                        )}
                        <span className="flex-1">{item.name}</span>
                        {item.type === 'folder' && item.children && (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            {/* Column 3 */}
            {selectedColumn2 && column3Files.length > 0 && (
              <div className="flex-1">
                <ScrollArea className="h-full">
                  <div className="p-2">
                    {column3Files.map((item) => (
                      <button
                        key={item.id}
                        className="w-full text-left px-3 py-2 rounded text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                      >
                        {item.type === 'folder' ? (
                          <Folder className="w-4 h-4" />
                        ) : (
                          <File className="w-4 h-4" />
                        )}
                        {item.name}
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {/* Resize handle */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
        onMouseDown={handleResizeMouseDown}
      />
    </div>
  );
};

export default Window;