import { useEffect, useRef, useCallback } from 'react';

interface LetterGlitchProps {
  glitchSpeed?: number;
  centerVignette?: boolean;
  smooth?: boolean;
}

const LetterGlitch = ({
  glitchSpeed = 50,
  centerVignette = true,
  smooth = true,
}: LetterGlitchProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const gridRef = useRef<{ char: string; color: string }[][]>([]);
  const lastUpdateRef = useRef<number>(0);

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>[]{}|/\\';
  
  // Muted colors matching the theme
  const colors = [
    'hsl(169, 40%, 51%)',      // Primary teal
    'hsl(169, 30%, 35%)',      // Darker teal
    'hsl(169, 20%, 25%)',      // Very dark teal
    'hsl(216, 15%, 25%)',      // Muted grey-blue
    'hsl(216, 10%, 20%)',      // Dark grey
  ];

  const getRandomChar = () => chars[Math.floor(Math.random() * chars.length)];
  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  const initGrid = useCallback((cols: number, rows: number) => {
    const grid: { char: string; color: string }[][] = [];
    for (let y = 0; y < rows; y++) {
      const row: { char: string; color: string }[] = [];
      for (let x = 0; x < cols; x++) {
        row.push({
          char: getRandomChar(),
          color: getRandomColor(),
        });
      }
      grid.push(row);
    }
    return grid;
  }, []);

  const drawGrid = useCallback((ctx: CanvasRenderingContext2D, grid: { char: string; color: string }[][], cellWidth: number, cellHeight: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Dark background
    ctx.fillStyle = 'hsl(216, 20%, 6%)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const fontSize = Math.min(cellWidth, cellHeight) * 0.8;
    ctx.font = `${fontSize}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        const cell = grid[y][x];
        ctx.fillStyle = cell.color;
        ctx.globalAlpha = 0.6;
        ctx.fillText(
          cell.char,
          x * cellWidth + cellWidth / 2,
          y * cellHeight + cellHeight / 2
        );
      }
    }
    ctx.globalAlpha = 1;
  }, []);

  const updateGrid = useCallback((grid: { char: string; color: string }[][]) => {
    // Update random cells
    const updates = Math.floor(grid.length * grid[0]?.length * 0.03) || 1;
    for (let i = 0; i < updates; i++) {
      const y = Math.floor(Math.random() * grid.length);
      const x = Math.floor(Math.random() * (grid[0]?.length || 0));
      if (grid[y] && grid[y][x]) {
        grid[y][x] = {
          char: getRandomChar(),
          color: getRandomColor(),
        };
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      const cellSize = 20;
      const cols = Math.ceil(canvas.width / cellSize);
      const rows = Math.ceil(canvas.height / cellSize);
      
      gridRef.current = initGrid(cols, rows);
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = (timestamp: number) => {
      if (timestamp - lastUpdateRef.current > glitchSpeed) {
        updateGrid(gridRef.current);
        lastUpdateRef.current = timestamp;
      }
      
      const cellWidth = canvas.width / (gridRef.current[0]?.length || 1);
      const cellHeight = canvas.height / gridRef.current.length;
      
      drawGrid(ctx, gridRef.current, cellWidth, cellHeight);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [glitchSpeed, initGrid, drawGrid, updateGrid]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className={`w-full h-full ${smooth ? 'opacity-40' : 'opacity-60'}`}
      />
      {/* Center vignette for readability */}
      {centerVignette && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(216_20%_6%/0.7)_50%,hsl(216_20%_6%/0.95)_100%)]" />
      )}
      {/* Bottom fade for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </div>
  );
};

export default LetterGlitch;
