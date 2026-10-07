document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('designCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let currentTool = 'select';
  let shapes = [];
  let selectedShape = null;
  let isDrawing = false, isDragging = false;
  let startX, startY;

  document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
      const target = e.target.closest('.tool-btn');
      target.classList.add('active');
      currentTool = target.dataset.tool;
    });
  });

  canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;

    if (currentTool === 'select') {
      selectedShape = [...shapes].reverse().find(s => isPointInShape(startX, startY, s));
      if (selectedShape) isDragging = true;
    } else {
      isDrawing = true;
    }
    render();
  });

  canvas.addEventListener('mousemove', (e) => {
    if (!isDragging || !selectedShape) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    selectedShape.x += mouseX - startX;
    selectedShape.y += mouseY - startY;
    startX = mouseX;
    startY = mouseY;
    render();
  });

  canvas.addEventListener('mouseup', (e) => {
    const rect = canvas.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;
    const color = document.getElementById('fillColor')?.value || '#0d99ff';

    if (isDrawing) {
      if (currentTool === 'rect') {
        shapes.push({ type: 'rect', x: Math.min(startX, endX), y: Math.min(startY, endY), w: Math.abs(endX - startX), h: Math.abs(endY - startY), color });
      } else if (currentTool === 'circle') {
        const r = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        shapes.push({ type: 'circle', x: startX, y: startY, r, color });
      }
    }
    isDrawing = false;
    isDragging = false;
    render();
  });

  function isPointInShape(x, y, shape) {
    if (shape.type === 'rect') return x >= shape.x && x <= shape.x + shape.w && y >= shape.y && y <= shape.y + shape.h;
    if (shape.type === 'circle') return Math.sqrt(Math.pow(x - shape.x, 2) + Math.pow(y - shape.y, 2)) <= shape.r;
    return false;
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach(shape => {
      ctx.fillStyle = shape.color;
      if (shape.type === 'rect') ctx.fillRect(shape.x, shape.y, shape.w, shape.h);
      if (shape.type === 'circle') { ctx.beginPath(); ctx.arc(shape.x, shape.y, shape.r, 0, Math.PI * 2); ctx.fill(); }
      if (shape === selectedShape) {
        ctx.strokeStyle = '#0d99ff'; ctx.lineWidth = 2;
        if (shape.type === 'rect') ctx.strokeRect(shape.x - 2, shape.y - 2, shape.w + 4, shape.h + 4);
      }
    });
  }
  render();
});
