import { useCallback, useEffect, useRef, useState } from 'react';
import { clampPosition, clampSize, minWindowSize, type Point, type Size } from '@/lib/windowLayout';

export function useWindowFrame(initialPosition: Point, initialSize: Size) {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const windowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(initialPosition);
  const sizeRef = useRef(initialSize);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const resizingRef = useRef(false);

  const applyFrame = useCallback((pos: Point, sz: Size) => {
    const el = windowRef.current;
    if (!el) return;
    el.style.left = `${pos.x}px`;
    el.style.top = `${pos.y}px`;
    el.style.width = `${sz.width}px`;
    el.style.height = `${sz.height}px`;
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (draggingRef.current) {
        const next = clampPosition(
          {
            x: e.clientX - dragOffsetRef.current.x,
            y: e.clientY - dragOffsetRef.current.y,
          },
          sizeRef.current
        );
        posRef.current = next;
        applyFrame(next, sizeRef.current);
        return;
      }

      if (resizingRef.current) {
        const min = minWindowSize();
        const next = clampSize({
          width: Math.max(min.width, e.clientX - posRef.current.x),
          height: Math.max(min.height, e.clientY - posRef.current.y),
        });
        sizeRef.current = next;
        applyFrame(posRef.current, next);
      }
    };

    const onUp = () => {
      if (!draggingRef.current && !resizingRef.current) return;
      draggingRef.current = false;
      resizingRef.current = false;
      setIsDragging(false);
      setIsResizing(false);
      setPosition(posRef.current);
      setSize(sizeRef.current);
      document.body.style.removeProperty('user-select');
      document.body.style.removeProperty('cursor');
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [applyFrame]);

  useEffect(() => {
    const onResize = () => {
      const nextSize = clampSize(sizeRef.current);
      const nextPos = clampPosition(posRef.current, nextSize);
      sizeRef.current = nextSize;
      posRef.current = nextPos;
      setSize(nextSize);
      setPosition(nextPos);
      applyFrame(nextPos, nextSize);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [applyFrame]);

  const startDrag = (e: React.MouseEvent) => {
    draggingRef.current = true;
    setIsDragging(true);
    dragOffsetRef.current = {
      x: e.clientX - posRef.current.x,
      y: e.clientY - posRef.current.y,
    };
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'grabbing';
  };

  const startResize = (e: React.MouseEvent) => {
    e.stopPropagation();
    resizingRef.current = true;
    setIsResizing(true);
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'nwse-resize';
  };

  return {
    windowRef,
    position,
    size,
    isDragging,
    isResizing,
    startDrag,
    startResize,
  };
}
