const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Configurar canvas para pantalla horizontal
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = Math.max(window.innerHeight - 80, 300);
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Estado del juego
let gameStarted = false;
let linternaOn = false;
let viewDistance = 300;

// Jugador
const player = {
  x: 400,
  y: 300,
  angle: 0,
  fov: Math.PI / 3, // 60 grados
  speed: 3
};

let suspects = [];
let hostages = [];
let doors = [];
let particles = [];

// Inicio del juego
document.getElementById("startBtn").onclick = () => {
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("gameUI").classList.remove("hidden");
  initGame();
};

function initGame() {
  suspects = [
    { x: 800, y: 300, surrendered: false, arrested: false, angle: 0 },
    { x: 900, y: 400, surrendered: false, arrested: false, angle: Math.PI }
  ];

  hostages = [
    { x: 700, y: 250, safe: false }
  ];

  doors = [
    { x: 600, y: 300, open: false, width: 40, height: 100 }
  ];

  updateCounts();
  gameLoop();
}

function updateCounts() {
  document.getElementById("susCount").innerText =
    suspects.filter(s => !s.arrested).length;
  document.getElementById("hostCount").innerText =
    hostages.filter(h => !h.safe).length;
}

// Controles
document.getElementById("btnOrden").onclick = () => {
  suspects.forEach(s => {
    if (distance(player, s) < 200 && !s.arrested) {
      s.surrendered = true;
      createExplosionEffect(s.x, s.y, "#ffff00");
    }
  });
};

document.getElementById("btnEsposar").onclick = () => {
  suspects.forEach(s => {
    if (distance(player, s) < 100 && s.surrendered) {
      s.arrested = true;
      updateCounts();
      createExplosionEffect(s.x, s.y, "#00ff00");
    }
  });
};

document.getElementById("btnPuerta").onclick = () => {
  doors.forEach(d => {
    if (distance(player, { x: d.x + d.width/2, y: d.y + d.height/2 }) < 120) {
      d.open = !d.open;
    }
  });
};

document.getElementById("btnLinterna").onclick = () => {
  linternaOn = !linternaOn;
};

// Control de movimiento táctil
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener("touchstart", e => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});

document.addEventListener("touchmove", e => {
  e.preventDefault();
  const touch = e.touches[0];
  const dx = touch.clientX - touchStartX;
  const dy = touch.clientY - touchStartY;

  // Movimiento suave
  player.x += Math.cos(player.angle) * dx * 0.5;
  player.y += Math.sin(player.angle) * dy * 0.5;
  
  if (Math.abs(dx) > Math.abs(dy)) {
    player.angle -= dx * 0.01;
  }
});

// Controles de teclado
const keys = {};
document.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
document.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

function updatePlayerMovement() {
  if (keys["w"] || keys["arrowup"]) {
    player.x += Math.cos(player.angle) * player.speed;
    player.y += Math.sin(player.angle) * player.speed;
  }
  if (keys["s"] || keys["arrowdown"]) {
    player.x -= Math.cos(player.angle) * player.speed;
    player.y -= Math.sin(player.angle) * player.speed;
  }
  if (keys["a"] || keys["arrowleft"]) player.angle -= 0.05;
  if (keys["d"] || keys["arrowright"]) player.angle += 0.05;
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

// Efectos de partículas
function createExplosionEffect(x, y, color) {
  for (let i = 0; i < 8; i++) {
    particles.push({
      x: x,
      y: y,
      vx: Math.random() * 4 - 2,
      vy: Math.random() * 4 - 2,
      life: 30,
      color: color
    });
  }
}

function updateParticles() {
  particles = particles.filter(p => p.life > 0);
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.1;
    p.life--;
  });
}

// DIBUJO - VISTA DOOM
function drawDoomView() {
  const h = canvas.height;
  const w = canvas.width;

  // Cielo (rojo oscuro) y suelo (negro)
  ctx.fillStyle = "#330000";
  ctx.fillRect(0, 0, w, h / 2);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, h / 2, w, h / 2);

  // Línea del horizonte
  ctx.strokeStyle = "#ffff00";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, h / 2);
  ctx.lineTo(w, h / 2);
  ctx.stroke();

  // Dibujar el mapa 3D simple (columnas)
  const numRays = 60;
  for (let i = 0; i < numRays; i++) {
    const angle = player.angle - player.fov / 2 + (i / numRays) * player.fov;
    const rayColor = drawRay(angle, w, h);
  }

  // Sprites (sospechosos, rehenes)
  drawSprites(w, h);

  // Linterna
  if (linternaOn) {
    ctx.fillStyle = "rgba(255, 255, 0, 0.1)";
    ctx.fillRect(0, 0, w, h);
  }

  // Mira en el centro
  drawCrosshair(w, h);
}

function drawRay(angle, w, h) {
  const maxDist = 1000;
  let minDist = maxDist;
  let wallColor = "#660000";

  // Raycast contra puertas y paredes
  doors.forEach(d => {
    const dist = castRayToRect(angle, d.x, d.y, d.width, d.height);
    if (dist < minDist && dist > 0) {
      minDist = dist;
      wallColor = d.open ? "#333333" : "#880000";
    }
  });

  // Raycast contra limites del mapa
  const mapSize = 1200;
  const wallDist = castRayToWalls(angle, mapSize);
  if (wallDist < minDist) {
    minDist = wallDist;
    wallColor = "#550000";
  }

  // Corregir fish-eye
  minDist *= Math.cos(player.angle - angle);

  // Dibujar columna
  const x = (angle - (player.angle - player.fov / 2)) / player.fov * w;
  const wallHeight = Math.max(0, h / minDist * 150);
  const drawStart = (h - wallHeight) / 2;

  ctx.fillStyle = wallColor;
  ctx.fillRect(x, drawStart, w / 60, wallHeight);

  // Borde
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 1;
  ctx.strokeRect(x, drawStart, w / 60, wallHeight);

  return wallColor;
}

function castRayToRect(angle, rx, ry, rw, rh) {
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  let minDist = Infinity;

  // Lados del rectángulo
  const sides = [
    [rx, ry, rx + rw, ry], // arriba
    [rx, ry + rh, rx + rw, ry + rh], // abajo
    [rx, ry, rx, ry + rh], // izquierda
    [rx + rw, ry, rx + rw, ry + rh] // derecha
  ];

  sides.forEach(([x1, y1, x2, y2]) => {
    const dist = rayLineIntersection(player.x, player.y, angle, x1, y1, x2, y2);
    if (dist > 0 && dist < minDist) minDist = dist;
  });

  return minDist === Infinity ? -1 : minDist;
}

function castRayToWalls(angle, mapSize) {
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  let minDist = Infinity;

  // Limites del mapa
  const dists = [
    rayLineIntersection(player.x, player.y, angle, 0, 0, mapSize, 0),
    rayLineIntersection(player.x, player.y, angle, mapSize, 0, mapSize, mapSize),
    rayLineIntersection(player.x, player.y, angle, mapSize, mapSize, 0, mapSize),
    rayLineIntersection(player.x, player.y, angle, 0, mapSize, 0, 0)
  ];

  dists.forEach(d => {
    if (d > 0 && d < minDist) minDist = d;
  });

  return minDist === Infinity ? 1000 : minDist;
}

function rayLineIntersection(px, py, angle, x1, y1, x2, y2) {
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  const ldx = x2 - x1;
  const ldy = y2 - y1;
  const denom = dx * ldy - dy * ldx;

  if (Math.abs(denom) < 0.0001) return -1;

  const t = ((x1 - px) * ldy - (y1 - py) * ldx) / denom;
  const u = ((x1 - px) * dy - (y1 - py) * dx) / denom;

  if (t > 0 && u >= 0 && u <= 1) return t;
  return -1;
}

function drawSprites(w, h) {
  // Sospechosos
  suspects.forEach(s => {
    if (!s.arrested) {
      const dist = distance(player, s);
      const relAngle = Math.atan2(s.y - player.y, s.x - player.x) - player.angle;
      const x = w / 2 + Math.tan(relAngle) * w / 2;
      const size = Math.max(0, 100 / dist * 100);

      const y = h / 2 - size / 2;

      ctx.fillStyle = s.surrendered ? "#ffff00" : "#ff0000";
      ctx.shadowColor = s.surrendered ? "#ffff00" : "#ff0000";
      ctx.shadowBlur = 10;
      ctx.fillRect(x - size / 2, y, size, size);

      // Ojos
      ctx.fillStyle = "#000";
      ctx.fillRect(x - size / 4, y + size / 4, size / 6, size / 6);
      ctx.fillRect(x + size / 8, y + size / 4, size / 6, size / 6);

      ctx.shadowBlur = 0;
    }
  });

  // Rehenes
  hostages.forEach(h => {
    if (!h.safe) {
      const dist = distance(player, h);
      const relAngle = Math.atan2(h.y - player.y, h.x - player.x) - player.angle;
      const x = w / 2 + Math.tan(relAngle) * w / 2;
      const size = Math.max(0, 80 / dist * 100);

      const y = h / 2 - size / 2;

      ctx.fillStyle = "#00ff00";
      ctx.shadowColor = "#00ff00";
      ctx.shadowBlur = 10;
      ctx.fillRect(x - size / 2, y, size, size);
      ctx.shadowBlur = 0;
    }
  });
}

function drawCrosshair(w, h) {
  const cx = w / 2;
  const cy = h / 2;
  const size = 20;

  ctx.strokeStyle = "#ffff00";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - size, cy);
  ctx.lineTo(cx + size, cy);
  ctx.moveTo(cx, cy - size);
  ctx.lineTo(cx, cy + size);
  ctx.stroke();
}

// Mini mapa
function drawMinimap(w, h) {
  const mmSize = 150;
  const mmX = w - mmSize - 10;
  const mmY = 10;
  const scale = 0.1;

  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(mmX, mmY, mmSize, mmSize);
  ctx.strokeStyle = "#ffff00";
  ctx.lineWidth = 2;
  ctx.strokeRect(mmX, mmY, mmSize, mmSize);

  // Jugador
  ctx.fillStyle = "#00ff00";
  ctx.fillRect(mmX + player.x * scale, mmY + player.y * scale, 4, 4);

  // Sospechosos
  suspects.forEach(s => {
    ctx.fillStyle = s.arrested ? "#666" : s.surrendered ? "#ffff00" : "#ff0000";
    ctx.fillRect(mmX + s.x * scale - 2, mmY + s.y * scale - 2, 4, 4);
  });

  // Rehenes
  hostages.forEach(h => {
    ctx.fillStyle = h.safe ? "#666" : "#00ff00";
    ctx.fillRect(mmX + h.x * scale - 2, mmY + h.y * scale - 2, 4, 4);
  });
}

function gameLoop() {
  // Limpiar
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Actualizar
  updatePlayerMovement();
  updateParticles();

  // Dibujar
  drawDoomView();
  drawMinimap(canvas.width, canvas.height);

  // Particulas
  particles.forEach(p => {
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.life / 30;
    ctx.fillRect(p.x, p.y, 3, 3);
    ctx.globalAlpha = 1;
  });

  requestAnimationFrame(gameLoop);
}

                                                                                                                                                              // Hostages
                                                                                                                                                                hostages.forEach(h => {
                                                                                                                                                                    if (!h.safe) {
                                                                                                                                                                          ctx.fillStyle = "green";
                                                                                                                                                                                ctx.fillRect(h.x, h.y, 20, 20);
                                                                                                                                                                                    }
                                                                                                                                                                                      });

                                                                                                                                                                                        requestAnimationFrame(gameLoop);
                                                                                                                                                                                        }