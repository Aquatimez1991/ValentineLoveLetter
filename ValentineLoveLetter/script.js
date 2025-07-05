const letter = document.getElementById("letter");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");

openBtn.addEventListener("click", () => {
  letter.classList.add("open");
});

closeBtn.addEventListener("click", () => {
  letter.classList.remove("open");
});