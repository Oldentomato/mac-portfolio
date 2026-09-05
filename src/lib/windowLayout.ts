export type Point = { x: number; y: number };
export type Size = { width: number; height: number };

const MENUBAR = 28;
const DOCK = 108;
const PAD = 16;

function viewport(): Size {
  if (typeof window === 'undefined') {
    return { width: 1440, height: 900 };
  }
  return { width: window.innerWidth, height: window.innerHeight };
}

export function getDesktopRect() {
  const { width: vw, height: vh } = viewport();
  const left = PAD;
  const top = MENUBAR + PAD;
  const right = vw - PAD;
  const bottom = vh - DOCK;
  return {
    left,
    top,
    right,
    bottom,
    width: Math.max(280, right - left),
    height: Math.max(200, bottom - top),
  };
}

export function minWindowSize(): Size {
  const desk = getDesktopRect();
  return {
    width: Math.min(560, Math.max(280, desk.width)),
    height: Math.min(360, Math.max(200, desk.height)),
  };
}

export function fitSize(preferred: Size, maxFraction = { w: 0.9, h: 0.9 }): Size {
  const desk = getDesktopRect();
  const min = minWindowSize();
  return {
    width: Math.round(
      Math.max(min.width, Math.min(preferred.width, desk.width * maxFraction.w, desk.width))
    ),
    height: Math.round(
      Math.max(min.height, Math.min(preferred.height, desk.height * maxFraction.h, desk.height))
    ),
  };
}

export function clampPosition(pos: Point, size: Size): Point {
  const desk = getDesktopRect();
  const maxX = Math.max(desk.left, desk.right - size.width);
  const maxY = Math.max(desk.top, desk.bottom - size.height);
  return {
    x: Math.round(Math.min(Math.max(pos.x, desk.left), maxX)),
    y: Math.round(Math.min(Math.max(pos.y, desk.top), maxY)),
  };
}

export function clampSize(size: Size): Size {
  const desk = getDesktopRect();
  const min = minWindowSize();
  return {
    width: Math.round(Math.min(Math.max(size.width, min.width), desk.width)),
    height: Math.round(Math.min(Math.max(size.height, min.height), desk.height)),
  };
}

export function cascadePosition(index: number, size: Size): Point {
  const desk = getDesktopRect();
  const step = 28;
  return clampPosition(
    {
      x: desk.left + 36 + index * step,
      y: desk.top + 12 + index * step,
    },
    size
  );
}

export function initialDesktopLayout() {
  const desk = getDesktopRect();

  const aboutSize = fitSize({ width: 1000, height: 500 }, { w: 0.55, h: 0.5 });
  const projectsSize = fitSize({ width: 1200, height: 800 }, { w: 0.7, h: 0.86 });
  const linksSize = fitSize({ width: 900, height: 330 }, { w: 0.5, h: 0.4 });

  const aboutPos = clampPosition({ x: desk.left, y: desk.top }, aboutSize);
  const projectsPos = clampPosition(
    {
      x: desk.left + Math.min(desk.width * 0.3, aboutSize.width * 0.52),
      y: desk.top + 24,
    },
    projectsSize
  );
  const linksPos = clampPosition(
    {
      x: desk.left,
      y: aboutPos.y + aboutSize.height + 12,
    },
    linksSize
  );

  return {
    about: { position: aboutPos, size: aboutSize },
    projects: { position: projectsPos, size: projectsSize },
    links: { position: linksPos, size: linksSize },
  };
}
