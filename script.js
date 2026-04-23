const popup = document.getElementById('popup');
const submitBtn = document.getElementById('submitBtn');
const answerInput = document.getElementById('answerInput');
const errorMessage = document.getElementById('errorMessage');
const body = document.body;

const correctAnswers = ['ева', 'евочка', 'евуся'];

function showError(message) {
  errorMessage.textContent = message;
}

function hidePopup() {
  popup.classList.remove('active');
  body.classList.remove('popup-open');
  startHearts();
}

function checkAnswer() {
  const value = answerInput.value.trim().toLowerCase();
  if (correctAnswers.includes(value)) {
    hidePopup();
  } else {
    showError('Неверно. Попробуй ещё раз.');
  }
}

submitBtn.addEventListener('click', checkAnswer);
answerInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    event.preventDefault();
    checkAnswer();
  }
});

function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';

  const size = Math.random() * 18 + 14;
  const left = Math.random() * 100;
  const delay = Math.random() * 1.2;
  const duration = Math.random() * 4 + 5;
  const opacity = Math.random() * 0.5 + 0.5;

  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  heart.style.left = `${left}vw`;
  heart.style.bottom = '-40px';
  heart.style.opacity = opacity;
  heart.style.animation = `floatHeart ${duration}s ease-in forwards`;
  heart.style.animationDelay = `${delay}s`;

  body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, (duration + delay) * 1000 + 200);
}

let heartInterval;

function startHearts() {
  if (heartInterval) return;
  heartInterval = setInterval(createHeart, 350);
  for (let i = 0; i < 8; i += 1) {
    setTimeout(createHeart, i * 150);
  }
}

window.addEventListener('load', () => {
  answerInput.focus();
  popup.classList.add('active');
  body.classList.add('popup-open');
  startHearts();
});

// Disable closing popup by clicking outside or pressing Escape
popup.addEventListener('click', event => {
  if (event.target === popup) {
    showError('Только правильный ответ закроет окно.');
  }
});
window.addEventListener('keydown', event => {
  if (popup.classList.contains('active') && event.key === 'Escape') {
    event.preventDefault();
    showError('Esc не работает. Введи ответ.');
  }
});

// Surprise section jumpscare
const surpriseSection = document.getElementById('surprise');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      surpriseSection.classList.add('visible');
      // Play jump scare sound
      const audio = new Audio('https://www.soundjay.com/misc/sounds/scary-scream-1.wav');
      audio.play().catch(e => console.log('Audio play failed:', e));
    }
  });
}, { threshold: 0.5 });

observer.observe(surpriseSection);
