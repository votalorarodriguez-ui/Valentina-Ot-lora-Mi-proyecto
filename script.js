// --- MENÚ HAMBURGUESA RESPONSIVE ---
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// --- ANIMACIÓN DE BARRAS DE PROGRESO AL HACER SCROLL ---
const progressFills = document.querySelectorAll('.progress-bar-fill');
let animated = false;

function animateProgressBars() {
  const skillsSection = document.getElementById('habilidades');
  if (!skillsSection) return;

  const sectionPos = skillsSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.3;

  if (sectionPos < screenPos && !animated) {
    progressFills.forEach(fill => {
      const targetWidth = fill.getAttribute('data-progress');
      fill.style.width = targetWidth;
    });
    animated = true;
  }
}

window.addEventListener('scroll', animateProgressBars);

// --- VALIDACIÓN DE FORMULARIO EN TIEMPO REAL ---
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

const validateName = () => {
  if (nameInput.value.trim() === '') {
    nameError.textContent = 'El nombre es obligatorio.';
    return false;
  } else if (nameInput.value.trim().length < 3) {
    nameError.textContent = 'Debe tener al menos 3 caracteres.';
    return false;
  } else {
    nameError.textContent = '';
    return true;
  }
};

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value.trim() === '') {
    emailError.textContent = 'El correo electrónico es obligatorio.';
    return false;
  } else if (!emailRegex.test(emailInput.value.trim())) {
    emailError.textContent = 'Ingresa un correo electrónico válido.';
    return false;
  } else {
    emailError.textContent = '';
    return true;
  }
};

const validateMessage = () => {
  if (messageInput.value.trim() === '') {
    messageError.textContent = 'El mensaje no puede estar vacío.';
    return false;
  } else if (messageInput.value.trim().length < 10) {
    messageError.textContent = 'El mensaje debe tener al menos 10 caracteres.';
    return false;
  } else {
    messageError.textContent = '';
    return true;
  }
};

nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
messageInput.addEventListener('input', validateMessage);

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isMessageValid = validateMessage();

  if (isNameValid && isEmailValid && isMessageValid) {
    alert('¡Mensaje enviado con éxito!');
    contactForm.reset();
  }
});