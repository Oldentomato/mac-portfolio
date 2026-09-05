import { useState } from 'react';
import {
  ChevronRight,
  FileText,
  Folder,
  ExternalLink,
  Calendar,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import getContent from '@/contents/getProjects';

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
}

const sidebarSections = [
  {
    id: 'recent',
    label: 'Recent',
    items: [
      { id: 'Tomato_Board', label: 'Tomato Board' },
      { id: 'infra', label: 'infra' },
      { id: 'meaire', label: 'AWS EKS' },
      { id: 'bloguploader', label: 'blogUploader' },
      { id: 'vpmodel', label: 'VPModel' },
    ],
  },
];

const projectFiles: Record<string, FileItem[]> = {
  Tomato_Board: getContent('Tomato_Board') as FileItem[],
  infra: getContent('infra') as FileItem[],
  meaire: getContent('meaire') as FileItem[],
  bloguploader: getContent('bloguploader') as FileItem[],
  vpmodel: getContent('vpmodel') as FileItem[],
};

function parseFileName(name: string) {
  if (name.endsWith('.startDate')) {
    return { label: name.replace('.startDate', ''), kind: 'start' as const };
  }
  if (name.endsWith('.endDate')) {
    return { label: name.replace('.endDate', ''), kind: 'end' as const };
  }
  return { label: name, kind: 'default' as const };
}

function FileIcon({
  item,
  selected,
}: {
  item: FileItem;
  selected: boolean;
}) {
  const parsed = parseFileName(item.name);
  const tone = selected ? 'text-white' : '';

  if (item.type === 'folder') {
    return (
      <Folder
        className={`w-4 h-4 shrink-0 ${selected ? 'text-white fill-white/30' : 'text-amber-500 fill-amber-400'}`}
      />
    );
  }
  if (item.type === 'link') {
    return (
      <ExternalLink
        className={`w-4 h-4 shrink-0 ${selected ? 'text-white' : 'text-blue-600'}`}
      />
    );
  }
  if (parsed.kind === 'start' || parsed.kind === 'end') {
    return (
      <Calendar
        className={`w-4 h-4 shrink-0 ${tone || 'text-orange-500'}`}
      />
    );
  }
  return (
    <FileText className={`w-4 h-4 shrink-0 ${tone || 'text-neutral-500'}`} />
  );
}

const ProjectsComponent = () => {
  const [selectedSidebar, setSelectedSidebar] = useState('Tomato_Board');

  const currentFiles = projectFiles[selectedSidebar] || [];
  const descriptionFile = currentFiles.find((f) => f.type === 'folder') ?? null;
  const preview = (descriptionFile?.children as ViewItem | undefined) ?? null;
  const selectedProject =
    sidebarSections
      .flatMap((section) => section.items)
      .find((item) => item.id === selectedSidebar)?.label ?? selectedSidebar;

  return (
    <div className="project-finder flex h-full min-h-full overflow-hidden bg-white text-neutral-900">
      {/* Sidebar */}
      <aside className="w-52 shrink-0 bg-[#e8e8ed] border-r border-neutral-300/80">
        <ScrollArea className="h-full">
          <div className="p-3 space-y-5">
            {sidebarSections.map((section) => (
              <div key={section.id}>
                <div className="px-2 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                  {section.label}
                </div>
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const active = selectedSidebar === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setSelectedSidebar(item.id);
                        }}
                        className={`w-full text-left px-2 py-1.5 rounded-md text-[13px] font-medium transition-colors flex items-center gap-2 ${
                          active
                            ? 'bg-[#007AFF] text-white shadow-sm'
                            : 'text-neutral-800 hover:bg-black/5'
                        }`}
                      >
                        <Folder
                          className={`w-4 h-4 shrink-0 ${
                            active
                              ? 'text-white fill-white/25'
                              : 'text-amber-500 fill-amber-400'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Path bar */}
        <div className="h-9 shrink-0 px-3 flex items-center gap-1.5 border-b border-neutral-200 bg-neutral-50 text-[12px] text-neutral-600">
          <Folder className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          <span className="font-medium text-neutral-800">Projects</span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="font-medium text-neutral-800">{selectedProject}</span>
          {descriptionFile && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              <span className="truncate text-neutral-700">
                {parseFileName(descriptionFile.name).label}
              </span>
            </>
          )}
        </div>

        <div className="flex flex-1 min-h-0">
          {/* Column view */}
          <div className="w-64 shrink-0 border-r border-neutral-200 bg-white">
            <ScrollArea className="h-full">
              <div className="p-1.5">
                {currentFiles.map((item) => {
                  const isDescription = item.type === 'folder';
                  const isLink = item.type === 'link';
                  const parsed = parseFileName(item.name);
                  const rowClass = `w-full text-left px-2.5 py-2 rounded-md text-[13px] flex items-center gap-2 ${
                    isDescription
                      ? 'bg-[#007AFF] text-white'
                      : isLink
                        ? 'text-neutral-800 hover:bg-neutral-100 cursor-pointer'
                        : 'text-neutral-800 cursor-default'
                  }`;
                  const rowContent = (
                    <>
                      <FileIcon item={item} selected={isDescription} />
                      <span className="flex-1 min-w-0">
                        <span className="block truncate font-medium">
                          {parsed.label}
                        </span>
                        {parsed.kind !== 'default' && (
                          <span className="block text-[11px] text-neutral-500">
                            {parsed.kind === 'start' ? 'Start date' : 'End date'}
                          </span>
                        )}
                        {isLink && (
                          <span className="block text-[11px] text-blue-600">
                            External link
                          </span>
                        )}
                      </span>
                      {isDescription && (
                        <ChevronRight className="w-4 h-4 shrink-0 text-white/80" />
                      )}
                    </>
                  );

                  if (isLink) {
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          if (item.link) {
                            window.open(item.link, '_blank', 'noopener,noreferrer');
                          }
                        }}
                        className={rowClass}
                      >
                        {rowContent}
                      </button>
                    );
                  }

                  return (
                    <div key={item.id} className={rowClass}>
                      {rowContent}
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Preview */}
          <div className="flex-1 min-w-0 bg-white">
            <ScrollArea className="h-full">
              {preview ? (
                <article className="p-6 lg:p-8 max-w-3xl">
                  <header className="mb-6 pb-5 border-b border-neutral-200">
                    <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
                      {preview.title}
                    </h1>
                    {preview.techStack?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {preview.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </header>

                  <div
                    className="
                      prose prose-neutral max-w-none
                      prose-headings:scroll-mt-4
                      prose-h1:text-xl prose-h1:font-semibold prose-h1:text-neutral-900
                      prose-h2:text-lg prose-h2:font-semibold prose-h2:text-neutral-900 prose-h2:mt-8
                      prose-h3:text-base prose-h3:font-semibold prose-h3:text-neutral-800
                      prose-p:text-[15px] prose-p:leading-7 prose-p:text-neutral-800
                      prose-li:text-[15px] prose-li:text-neutral-800
                      prose-strong:text-neutral-900
                      prose-a:text-[#007AFF] prose-a:no-underline hover:prose-a:underline
                      prose-img:rounded-xl prose-img:border prose-img:border-neutral-200 prose-img:shadow-sm prose-img:my-5
                      prose-code:text-[13px] prose-code:bg-neutral-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                      prose-pre:bg-neutral-900 prose-pre:text-neutral-100
                      prose-blockquote:border-l-[#007AFF] prose-blockquote:text-neutral-700
                    "
                  >
                    <ReactMarkdown
                      components={{
                        img: ({ src, alt }) => (
                          <img
                            src={src}
                            alt={alt ?? ''}
                            className="rounded-xl border border-neutral-200 shadow-sm my-5 w-full max-w-full h-auto"
                          />
                        ),
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {preview.content}
                    </ReactMarkdown>
                  </div>
                </article>
              ) : (
                <div className="h-full min-h-[280px] flex items-center justify-center text-sm text-neutral-400">
                  Select a project to preview
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsComponent;
