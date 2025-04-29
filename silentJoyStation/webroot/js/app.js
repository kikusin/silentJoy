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
function setupHLS(delayMs = 0) {
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
        const match = data.frag.relurl.match(/stream(\\d+)\\.ts/);
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
// (Aquí pondríamos drawUserLines, spawnBall, animateOverlay... como ya los tienes)

// EventSource para la sincronización
const backendHost = window.location.hostname;
const syncEvents = new EventSource(`http://${backendHost}:5050/events`);
syncEvents.onmessage = function(event) {
  const data = JSON.parse(event.data);
  if (showOverlay) spawnBall(data.id, data.segment);
};