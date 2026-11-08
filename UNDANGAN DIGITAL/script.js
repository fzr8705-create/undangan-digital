const weddingDate = new Date("2026-10-20T08:00:00+07:00").getTime();

const cover = document.getElementById("cover");
const invitation = document.getElementById("invitation");
const openButton = document.getElementById("openInvitation");
const musicButton = document.getElementById("musicBtn");
const music = document.getElementById("bgMusic");

openButton.addEventListener("click", () => {
  cover.style.display = "none";
  invitation.classList.remove("hidden");
  document.body.classList.remove("locked");
  window.scrollTo(0, 0);

  if (music.querySelector("source")) {
    music.play().catch(() => {});
  }
});

function updateCountdown() {
  const now = Date.now();
  const distance = weddingDate - now;

  if (distance <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
  }

  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

musicButton.addEventListener("click", () => {
  if (!music.querySelector("source")) {
    alert("Tambahkan file musik di assets/music.mp3 dan aktifkan <source> di index.html.");
    return;
  }
  if (music.paused) {
    music.play();
    musicButton.textContent = "❚❚";
  } else {
    music.pause();
    musicButton.textContent = "♪";
  }
});

document.querySelectorAll("[data-copy]").forEach(button => {
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      const oldText = button.textContent;
      button.textContent = "Tersalin ✓";
      setTimeout(() => button.textContent = oldText, 1800);
    } catch {
      alert("Nomor rekening: " + button.dataset.copy);
    }
  });
});
