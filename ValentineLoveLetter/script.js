let isLetterExpanded = false;
let isEnvelopeOpen = false;

function openLetter() {
  if (isLetterExpanded) return;
  
  gsap.to("#flap", { rotationX: -180, transformOrigin: "top center", duration: 0.7, ease: "power2.inOut" });
  document.getElementById('envelope').classList.add('open');
  const letter = document.getElementById('letter');
  letter.classList.add('open');
  gsap.to("#letter", { top: -20, opacity: 1, duration: 0.7, ease: "power2.inOut" });
  isEnvelopeOpen = true;

  // Agregar event listener para expandir la carta
  setTimeout(() => {
    letter.addEventListener('click', expandLetter);
  }, 700);
}

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

  // Remover event listener
  letter.removeEventListener('click', expandLetter);
}

function expandLetter(event) {
  // Prevenir que el click del botón de cerrar active la expansión
  if (event.target.classList.contains('close-btn')) {
    return;
  }
  
  if (isLetterExpanded || !isEnvelopeOpen) return;
  
  const letter = document.getElementById('letter');
  const overlay = document.getElementById('overlay');
  
  isLetterExpanded = true;
  letter.classList.add('expanded');
  overlay.classList.add('active');
  
  // Prevenir scroll del body
  document.body.style.overflow = 'hidden';
  
  // Agregar event listener al overlay para cerrar
  overlay.addEventListener('click', collapseLetter);
}

function collapseLetter() {
  if (!isLetterExpanded) return;
  
  const letter = document.getElementById('letter');
  const overlay = document.getElementById('overlay');
  
  isLetterExpanded = false;
  letter.classList.remove('expanded');
  overlay.classList.remove('active');
  
  // Restaurar scroll del body
  document.body.style.overflow = 'auto';
  
  // Remover event listener del overlay
  overlay.removeEventListener('click', collapseLetter);
}