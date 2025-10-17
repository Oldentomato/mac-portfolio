import { useState, useRef, useEffect } from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';

interface TerminalProps {
  title?: string;
  onClose?: () => void;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  isNew?: boolean;
  zIndex?: number;
  onFocus?: () => void;
}

interface CommandOutput {
  command: string;
  output: string[];
}

const Terminal = ({
  title = 'Terminal',
  onClose = () => {},
  initialPosition = { x: 150, y: 150 },
  initialSize = { width: 700, height: 450 },
  isNew = false,
  zIndex = 10,
  onFocus = () => {},
}: TerminalProps) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(isNew);
  const [currentInput, setCurrentInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    { command: '', output: ['Last login: ' + new Date().toLocaleString(), "Enter 'help' to show this help message"] }
  ]);
  const [currentDir, setCurrentDir] = useState('~');
  
  const windowRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isNew) {
      const timer = setTimeout(() => setIsAnimating(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isNew]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [history, currentInput]);

  // Focus input when clicking terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  // Execute command
  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    
    if (!trimmedCmd) {
      setHistory(prev => [...prev, { command: '', output: [] }]);
      return;
    }

    let output: string[] = [];

    // Command execution logic
    switch (trimmedCmd.split(' ')[0]) {
      case 'help':
        output = [
          'Available commands:',
          '  help                 - Show this help message',
          '  clear                - Clear the terminal',
          '  date                 - Show current date and time',
          '  ls                   - List directory contents',
          '  whoami               - Print current user',
          '  exec <dir name>      - Open window',
          '  history              - Show command history',
        ];
        break;
      
      case 'clear':
        setHistory([]);
        setCurrentInput('');
        return;
      
      case 'date':
        output = [new Date().toString()];
        break;
      
      
      case 'ls':
        output = [
          'About    Projects    Activites',
          'Career     Links        Terminal',
          'Contact',
        ];
        break;

      case 'wget':
        output = [
          'it would be avaiable...'
        ]
        break;
      
      
      case 'whoami':
        output = [
  "    ___  ________          ___       __   ________  ________          ________  ___  ___  ________   ________     ",
  "   |\\  \\|\\   __  \\        |\\  \\     |\\  \\|\\   __  \\|\\   __  \\        |\\   ____\\|\\  \\|\\  \\|\\   ___  \\|\\   ____\\    ",
  "   \\ \\  \\ \\  \\|\\  \\       \\ \\  \\    \\ \\  \\ \\  \\|\\  \\ \\  \\|\\  \\       \\ \\  \\___|\\ \\  \\\\\\  \\ \\  \\\\ \\  \\ \\  \\___|    ",
  " __ \\ \\  \\ \\  \\\\\\  \\       \\ \\  \\  __\\ \\  \\ \\  \\\\\\  \\ \\  \\\\\\  \\       \\ \\_____  \\ \\  \\\\\\  \\ \\  \\\\ \\  \\ \\  \\  ___  ",
  "|\\  \\\\_\\  \\ \\  \\\\\\  \\       \\ \\  \\|\\__\\_\\  \\ \\  \\\\\\  \\ \\  \\\\\\  \\       \\|____|\\  \\ \\  \\\\\\  \\ \\  \\\\ \\  \\ \\  \\|\\  \\ ",
  "\\ \\________\\ \\_______\\       \\ \\____________\\ \\_______\\ \\_______\\        ____\\_\\  \\ \\_______\\ \\__\\\\ \\__\\ \\_______\\",
  " \\|________|\\|_______|        \\|____________|\\|_______|\\|_______|       |\\_________\\|_______|\\|__| \\|__|\\|_______|",
  "                                                                        \\|_________|                              ",
  "                                                                                                                  ",
  "                                                                                                                  ",
];
        break;
      
      
      case 'history':
        output = history
          .filter(h => h.command)
          .map((h, i) => `  ${i + 1}  ${h.command}`);
        break;
      
      case 'cd':
        const dir = trimmedCmd.split(' ')[1] || '~';
        setCurrentDir(dir === '~' ? '~' : dir);
        output = [];
        break;
      
      default:
        output = [`zsh: command not found: ${trimmedCmd.split(' ')[0]}`];
    }

    setHistory(prev => [...prev, { command: trimmedCmd, output }]);
    setCurrentInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus();
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    if ((e.target as HTMLElement).closest('.terminal-content')) return;
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
          width: Math.max(400, newWidth),
          height: Math.max(300, newHeight),
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

  return (
    <div
      ref={windowRef}
      onClick={handleWindowClick}
      className={`fixed bg-black/95 backdrop-blur-xl rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ${
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
        className="h-11 bg-gradient-to-b from-gray-800 to-gray-900 border-b border-gray-700 flex items-center px-4 cursor-move select-none"
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
        <div className="flex-1 text-center text-sm font-medium text-gray-300">
          {title}
        </div>
        <div className="w-16" />
      </div>

      {/* Terminal content */}
      <div 
        ref={contentRef}
        className="terminal-content h-[calc(100%-2.75rem)] p-4 font-mono text-sm text-green-400 overflow-y-auto cursor-text"
        onClick={handleTerminalClick}
      >
        {history.map((item, index) => (
          <div key={index} className="mb-2">
            {item.command && (
              <div className="flex items-center mb-1">
                <span className="text-blue-400">{currentDir}</span>
                <span className="text-white mx-1">%</span>
                <span className="text-white">{item.command}</span>
              </div>
            )}
            {item.output.map((line, lineIndex) => (
              <div key={lineIndex} className="text-gray-300 ml-0 whitespace-pre" >
                {line}
              </div>
            ))}
          </div>
        ))}
        
        {/* Current input line */}
        <div className="flex items-center">
          <span className="text-blue-400">{currentDir}</span>
          <span className="text-white mx-1">%</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-white caret-green-400"
            autoFocus
            spellCheck={false}
          />
        </div>
      </div>

      {/* Resize handle */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
        onMouseDown={handleResizeMouseDown}
      />
    </div>
  );
};

export default Terminal;