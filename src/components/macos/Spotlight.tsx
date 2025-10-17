import { useState, useEffect } from 'react';
import { Search, Calculator, Mail, Folder, File, Settings, Chrome } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface SpotlightProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  category: string;
}

const Spotlight = ({ isOpen = false, onClose = () => {} }: SpotlightProps) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const allResults: SearchResult[] = [
    { id: '1', title: 'Calculator', subtitle: 'Applications', icon: <Calculator className="w-5 h-5" />, category: 'Applications' },
    { id: '2', title: 'Mail', subtitle: 'Applications', icon: <Mail className="w-5 h-5" />, category: 'Applications' },
    { id: '3', title: 'Safari', subtitle: 'Applications', icon: <Chrome className="w-5 h-5" />, category: 'Applications' },
    { id: '4', title: 'System Preferences', subtitle: 'Applications', icon: <Settings className="w-5 h-5" />, category: 'Applications' },
    { id: '5', title: 'Documents', subtitle: 'Folder', icon: <Folder className="w-5 h-5" />, category: 'Folders' },
    { id: '6', title: 'Downloads', subtitle: 'Folder', icon: <Folder className="w-5 h-5" />, category: 'Folders' },
    { id: '7', title: 'Project Proposal.pdf', subtitle: 'Documents', icon: <File className="w-5 h-5" />, category: 'Documents' },
    { id: '8', title: 'Budget 2024.xlsx', subtitle: 'Documents', icon: <File className="w-5 h-5" />, category: 'Documents' },
  ];

  const filteredResults = query
    ? allResults.filter(
        (result) =>
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : allResults;

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        // Handle selection
        onClose();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredResults.length, onClose]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      setQuery('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 bg-white/95 backdrop-blur-xl border-gray-200/50">
        {/* Search input */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200">
          <Search className="w-5 h-5 text-gray-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Spotlight Search"
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg bg-transparent"
            autoFocus
          />
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {filteredResults.length > 0 ? (
            <div className="py-2">
              {filteredResults.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => {
                    // Handle result click
                    onClose();
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 transition-colors
                    ${index === selectedIndex
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className={`
                    ${index === selectedIndex ? 'text-white' : 'text-blue-500'}
                  `}>
                    {result.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{result.title}</div>
                    <div className={`text-sm ${
                      index === selectedIndex ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {result.subtitle}
                    </div>
                  </div>
                  <div className={`text-xs ${
                    index === selectedIndex ? 'text-blue-100' : 'text-gray-400'
                  }`}>
                    {result.category}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-500">
              No results found
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-4 py-2 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between">
          <span>↑↓ to navigate</span>
          <span>↵ to select</span>
          <span>esc to close</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Spotlight;