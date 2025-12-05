import { useState, useRef, useEffect, ReactNode } from 'react';
import { X, Minus, Maximize2, ChevronRight, File, Folder } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from "react-markdown"
import getContent from '@/contents/getProjects';

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

interface ViewItem {
  id: string;
  title: string;
  techStack: string[];
  content: string;
}

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder' | 'link';
  link?: string;
  children?: ViewItem;
  // children?: ReactNode;
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
  const [selectedSidebar, setSelectedSidebar] = useState('infra');
  const [selectedColumn1, setSelectedColumn1] = useState<string | null>("1");
  // const [selectedColumn2, setSelectedColumn2] = useState<Object | null>(null);
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
    { id: 'recent', label: 'Recent', items: ['infra', 'tomatoAgent', 'Meaire', 'blogUploader', 'VPModel'] },
    { id: 'legacy', label: 'Legacy', items: ['Instagram', 'MSGGuard', 'CodeEncryption', 'LegacyPortfolio'] },
  ];

  const projectFiles: Record<string, FileItem[]> = {
    infra: getContent("infra"),
    tomatoagent: getContent("tomatoagent"),
    meaire: getContent("meaire"),
    bloguploader: getContent("bloguploader"),
    vpmodel: getContent("vpmodel"),
    instagram: getContent("instagram"),
    msgguard: getContent("msgguard"),
    codeencryption: getContent("codeencryption"),
    legacyportfolio: getContent("legacyportfolio"),
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

  const currentFiles = projectFiles[selectedSidebar] || [];
  const column2Files: ViewItem | null =
  selectedColumn1
    ? (currentFiles.find(f => f.id === selectedColumn1)?.children as ViewItem)
    : null;

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
                          setSelectedColumn1("1");
                          // setSelectedColumn2(null);
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
            <div className="flex-[0.5] border-r border-gray-200">
              <ScrollArea className="h-full">
                <div className="p-2">
                  {currentFiles.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedColumn1(item.id);
                        // setSelectedColumn2(null);
                        if(item.type === 'link'){
                          window.open(item.link, '_blank', 'noopener,noreferrer')
                        }
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


            {selectedColumn1 && column2Files && (
              <div className="flex-1">
                <ScrollArea className="h-full">
                  <div className="p-4 space-y-4">
                    <div
                      key={column2Files.id}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm hover:shadow transition-all duration-200"
                    >
                      <h1 className="text-3xl font-semibold text-gray-800 mb-2 ">
                        {column2Files.title}
                      </h1>
                                            {/* techStack이 있으면 보여주기 */}
                      {column2Files.techStack && column2Files.techStack.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2 mb-10">
                          {column2Files.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Markdown content 렌더링 */}
                      <div className="prose text-sm text-gray-600 mb-4">
                        <ReactMarkdown>{column2Files.content}</ReactMarkdown>
                      </div>


                    </div>
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