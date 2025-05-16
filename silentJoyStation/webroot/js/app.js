// Variables globales
const startImage = document.getElementById("startImage");
const audio = document.getElementById("player");
const canvas = document.getElementById("syncOverlay");
const ctx = canvas.getContext('2d');
const showSyncButton = document.getElementById("showSyncButton");
const reloadBtn = document.getElementById("reloadStreamButton");
const selectGroupButton = document.getElementById("selectGroupButton");
const groupSelector = document.getElementById("groupSelector");
const iconSelection = document.getElementById("iconSelection");
const colorSelection = document.getElementById("colorSelection");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const clientId = sessionStorage.getItem("clientId") || `client_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
sessionStorage.setItem("clientId", clientId);

let hlsInstance = null;
let playing = false;
let showOverlay = false;
let animationId;
let userGroup = { icon: '', color: '' };
const userGroups = {};
const columns = {};
const balls = [];
const COLUMN_WIDTH = 60;
const BALL_RADIUS = 10;
const SPEED = 1.5;

// Setup HLS
function setupHLS(delayMs = 1000) {
    if (hlsInstance) {
      try {
        hlsInstance.destroy();
      } catch (err) {
        console.warn("⚠️ Error al destruir HLS:", err);
      }
      hlsInstance = null;
    }
  
    if (Hls.isSupported()) {
      hlsInstance = new Hls();
      hlsInstance.attachMedia(audio);
      hlsInstance.loadSource("hls/stream.m3u8");
  
      hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("✅ MANIFEST PARSED");
        delayMs > 0 ? setTimeout(() => audio.play(), delayMs) : audio.play();
      });
  
      hlsInstance.on(Hls.Events.FRAG_CHANGED, (event, data) => {
        const match = data.frag.relurl.match(/stream(\d+)\.ts/);
        if (match) {
          reportSegment(parseInt(match[1], 10));
        }
      });
  
      hlsInstance.on(Hls.Events.ERROR, (event, data) => {
        console.error("❌ HLS ERROR", data);
      });
  
    } else {
      console.warn("⚠️ HLS no soportado, usando fallback");
      audio.src = "hls/stream.m3u8";
      audio.addEventListener('canplay', () => audio.play());
    }
  }

showSyncButton.addEventListener("click", () => {
  showOverlay = !showOverlay;
  canvas.style.display = showOverlay ? 'block' : 'none';
  reloadBtn.style.display = showOverlay ? 'block' : 'none';
  selectGroupButton.style.display = showOverlay ? 'block' : 'none';

  if (showOverlay) {
    animationId = requestAnimationFrame(animateOverlay);
  } else {
    cancelAnimationFrame(animationId);
    groupSelector.style.display = 'none';
  }
});

reloadBtn.addEventListener("click", () => {
  audio.pause();
  if (hlsInstance) hlsInstance.destroy();
  setTimeout(setupHLS, 1000);
});

selectGroupButton.addEventListener("click", () => {
  groupSelector.style.display = groupSelector.style.display === 'flex' ? 'none' : 'flex';
});

iconSelection.addEventListener("click", (e) => {
  if (e.target.textContent.trim()) {
    userGroup.icon = e.target.textContent.trim();
    selectGroupButton.innerText = userGroup.icon;
  }
});

colorSelection.addEventListener("click", (e) => {
  const color = e.target.getAttribute('data-color');
  if (color) {
    userGroup.color = color;
    selectGroupButton.style.background = userGroup.color;
    groupSelector.style.display = 'none';
  }
});

// Sincronización y animaciones
function reportSegment(segmentIndex) {
  const color = segmentIndex % 10 === 5 ? "#ffcc00" : "#ffffff";
  createWave(color); // puedes eliminar si no usas olas visuales

  fetch(`http://${backendHost}:5050/sync`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: clientId, segment: segmentIndex, group: userGroup })
  }).catch(err => console.warn("No se pudo reportar el segmento:", err));
}

function spawnBall(userId, segment) {
  const x = getColumnX(userId);
  const y = canvas.height + BALL_RADIUS;
  let color;

  if (String(segment).endsWith("5")) {
    color = "#ffcc00";
  } else {
    color = userGroups[userId]?.color || "#999";
  }
  console.log("💥 Ball for:", userId, "segment", segment);

  balls.push({ x, y, segment, color });
}

function drawUserLines() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const ids = Object.keys(columns).slice(0, 20); // máximo 20 líneas

  ids.forEach((id) => {
    ctx.beginPath();
    ctx.moveTo(columns[id], 0);
    ctx.lineTo(columns[id], canvas.height);
    ctx.strokeStyle = id === clientId ? "#f00" : (userGroups[id]?.color || "#333");
    ctx.lineWidth = id === clientId ? 4 : 2;
    ctx.stroke();
  });
}

function getColumnX(userId) {
  if (!columns[clientId]) columns[clientId] = canvas.width / 2;
  if (!columns[userId]) {
    const used = Object.values(columns);
    let offset = COLUMN_WIDTH;
    let candidate;
    while (true) {
      for (let dir of [1, -1]) {
        candidate = canvas.width / 2 + dir * offset;
        if (!used.includes(candidate)) {
          columns[userId] = candidate;
          return candidate;
        }
      }
      offset += COLUMN_WIDTH;
    }
  }
  return columns[userId];
}

function animateOverlay() {
  if (!showOverlay) return;
  drawUserLines();
  for (let i = balls.length - 1; i >= 0; i--) {
    balls[i].y -= SPEED;
    if (balls[i].y + BALL_RADIUS < 0) {
      balls.splice(i, 1);
    } else {
      drawBall(balls[i]);
    }
  }
  animationId = requestAnimationFrame(animateOverlay);
}

function drawBall(ball) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, 2 * Math.PI);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = "12px sans-serif";
  ctx.textAlign = "center";
  const label = String(ball.segment).padStart(3, "0");
  ctx.fillText(label, ball.x, ball.y + 4);
}

// EventSource para la sincronización
const backendHost = window.location.hostname;
const syncEvents = new EventSource(`http://${backendHost}:5050/events`);
syncEvents.onmessage = function(event) {
  const data = JSON.parse(event.data);
    // NUEVO: asegurar que tenga columna
    getColumnX(data.id);

    // NUEVO: guardar grupo si viene
    if (data.group) {
      userGroups[data.id] = data.group;
    }
  if (showOverlay) spawnBall(data.id, data.segment);
};