// Estado global
let isLetterExpanded = false;
let isEnvelopeOpen = false;

// --- Animaciones y efectos visuales ---

// Chispas brillantes al abrir el sobre
const createSparkles = () => {
  const envelope = document.getElementById('envelope');
  const rect = envelope.getBoundingClientRect();
  const container = document.body;
  for (let wave = 0; wave < 3; wave++) {
    setTimeout(() => {
      for (let i = 0; i < 25; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        const x = rect.left + rect.width/2 + (Math.random() - 0.5) * 200;
        const y = rect.top + rect.height/2 + (Math.random() - 0.5) * 120;
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + window.scrollY + 'px';
        container.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 2000);
      }
    }, wave * 200);
  }
};

// Corazones al hacer clic en los Cupids
const createHeartAtCupid = cupid => {
  const rect = cupid.getBoundingClientRect();
  const container = document.body;
  const heart = document.createElement('div');
  heart.className = 'heart-pop';
  heart.innerHTML = `<svg viewBox="0 0 32 32" width="32" height="32"><path d="M16 29s-8.5-7.1-11.3-10.2C2.1 16.1 1 13.7 1 11.5 1 7.4 4.4 4 8.5 4c2.1 0 4.1 1 5.5 2.6C15.4 5 17.4 4 19.5 4 23.6 4 27 7.4 27 11.5c0 2.2-1.1 4.6-3.7 7.3C24.5 21.9 16 29 16 29z" fill="#e2557e"/></svg>`;
  heart.style.left = (rect.left + rect.width/2 - 16) + 'px';
  heart.style.top = (rect.top + rect.height/2 - 16 + window.scrollY) + 'px';
  container.appendChild(heart);
  setTimeout(() => heart.remove(), 1300);
};

// Animación divertida al hacer clic en un Cupid
const animateCupid = cupid => {
  cupid.style.transition = 'none';
  cupid.style.transform += ' scale(1.2) rotate(360deg)';
  setTimeout(() => {
    cupid.style.transition = 'transform 0.5s cubic-bezier(.68,-0.55,.27,1.55)';
    cupid.style.transform = cupid.style.transform.replace(' scale(1.2) rotate(360deg)', '');
  }, 80);
};

// Hacer Cupids clickeables
const setupCupidsClickable = () => {
  const cupids = [
    document.getElementById('cupidLeft'),
    document.getElementById('cupidRight'),
    document.getElementById('cupidTopLeft'),
    document.getElementById('cupidTopRight')
  ];
  cupids.forEach(cupid => {
    cupid.onclick = e => {
      e.stopPropagation();
      animateCupid(cupid);
      createHeartAtCupid(cupid);
    };
  });
};

// --- Lógica de la carta y el sobre ---

// Abrir el sobre
function openLetter() {
  if (isLetterExpanded) return;
  gsap.to("#flap", { rotationX: -180, transformOrigin: "top center", duration: 0.7, ease: "power2.inOut" });
  document.getElementById('envelope').classList.add('open');
  const letter = document.getElementById('letter');
  letter.classList.add('open');
  gsap.to("#letter", { top: -20, opacity: 1, duration: 0.7, ease: "power2.inOut" });
  isEnvelopeOpen = true;
  // Mostrar Cupids
  document.getElementById('cupidLeft').classList.add('show');
  document.getElementById('cupidRight').classList.add('show');
  document.getElementById('cupidTopLeft').classList.add('show');
  document.getElementById('cupidTopRight').classList.add('show');
  // Hacer Cupids clickeables
  setupCupidsClickable();
  // Crear chispas brillantes
  setTimeout(() => { createSparkles(); }, 400);
  // Agregar event listener para expandir la carta
  setTimeout(() => {
    letter.addEventListener('click', expandLetter);
  }, 700);
}

// Cerrar el sobre
function closeLetter() {
  if (isLetterExpanded) {
    collapseLetter();
    return;
  }
  gsap.to("#flap", { rotationX: 0, transformOrigin: "top center", duration: 0.7, ease: "power2.inOut" });
  document.getElementById('envelope').classList.remove('open');
  const letter = document.getElementById('letter');
  letter.classList.remove('open');
  gsap.to("#letter", { top: 10, opacity: 0, duration: 0.7, ease: "power2.inOut" });
  isEnvelopeOpen = false;
  // Ocultar Cupids
  document.getElementById('cupidLeft').classList.remove('show');
  document.getElementById('cupidRight').classList.remove('show');
  document.getElementById('cupidTopLeft').classList.remove('show');
  document.getElementById('cupidTopRight').classList.remove('show');
  // Remover event listener
  letter.removeEventListener('click', expandLetter);
}

// Expandir la carta
function expandLetter(event) {
  if (event.target && event.target.classList && event.target.classList.contains('close-btn')) {
    return;
  }
  if (isLetterExpanded || !isEnvelopeOpen) return;
  const letter = document.getElementById('letter');
  const overlay = document.getElementById('overlay');
  isLetterExpanded = true;
  letter.classList.add('expanded');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  overlay.addEventListener('click', collapseLetter);
}

// Colapsar la carta
function collapseLetter() {
  if (!isLetterExpanded) return;
  const letter = document.getElementById('letter');
  const overlay = document.getElementById('overlay');
  isLetterExpanded = false;
  letter.classList.remove('expanded');
  overlay.classList.remove('active');
  document.body.style.overflow = 'auto';
  overlay.removeEventListener('click', collapseLetter);
}

// --- Intro GIF y carga inicial ---
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('intro-active');
  setTimeout(() => {
    document.getElementById('intro-gif').style.display = 'none';
    document.getElementById('main-container').style.display = '';
    document.getElementById('main-controls').style.display = '';
    document.body.classList.remove('intro-active');
  }, 3000);
});