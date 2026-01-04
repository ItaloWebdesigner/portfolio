// menu animado e fechar ao clicar
function animar(){
  const btn = document.getElementById('container-burger')
  btn.classList.toggle('animation')
}

function fecharMenu() {
  const checkbox = document.getElementById('check');
  checkbox.checked = false;
  animar();
}

// animação suave do menu
function smoothScroll(target) {
  const element = document.querySelector(target);
  const offsetTop = element.offsetTop;
  const scrollDuration = 1000; // Duração da animação de scroll em milissegundos
  const scrollStep = Math.PI / (scrollDuration / 15);
  let scrollCount = 0;
  let scrollPosition = window.pageYOffset;

  function scrollToTop() {
    if (window.pageYOffset === offsetTop) {
      return;
    }
    scrollCount += 1;
    const cosParameter = (scrollPosition - offsetTop) / 2;
    scrollPosition = scrollPosition - (cosParameter - cosParameter * Math.cos(scrollCount * scrollStep));
    window.scrollTo(0, scrollPosition);

    // Verifica se o scroll chegou ao destino e libera o scroll normal
    if (scrollCount >= scrollDuration / 15) {
      window.scrollTo(0, offsetTop);
      return;
    }

    window.requestAnimationFrame(scrollToTop);
  }

  scrollToTop();
}


//animação de escrita
const typingWords = ["Desenvolvedores", "Web designer", "Designer gráfico"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000;
let wordIndex = 0;
let letterIndex = 0;
let direction = "typing";
let typingWordElement = document.querySelector(".typing-word");
let cursorElement = document.querySelector(".cursor");

function type() {
  if (direction === "typing") {
    if (letterIndex < typingWords[wordIndex].length) {
      typingWordElement.textContent += typingWords[wordIndex][letterIndex];
      letterIndex++;
      setTimeout(type, typingDelay);
    } else {
      direction = "erasing";
      setTimeout(type, newTextDelay);
    }
  } else {
    if (letterIndex > 0) {
      typingWordElement.textContent = typingWords[wordIndex].substring(0, letterIndex - 1);
      letterIndex--;
      setTimeout(type, erasingDelay);
    } else {
      direction = "typing";
      wordIndex++;
      if (wordIndex >= typingWords.length) {
        wordIndex = 0;
      }
      setTimeout(type, typingDelay);
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
  if (typingWords.length) {
    setTimeout(type, newTextDelay + 250);
  }
});

// botao de voltar ao topo
window.addEventListener('scroll', function() {
  const backToTopButton = document.querySelector('.back-to-top');
  if (window.pageYOffset > 500) {
    backToTopButton.classList.add('active');
  } else {
    backToTopButton.classList.remove('active');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const backToTopLink = document.querySelector('.back-to-top a');

  backToTopLink.addEventListener('click', function(event) {
    event.preventDefault();
    const target = document.querySelector('body');
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000; // Tempo em milissegundos

    let start = null;
    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    }

    function easeInOutCubic(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t * t + b;
      t -= 2;
      return c / 2 * (t * t * t + 2) + b;
    }

    window.requestAnimationFrame(step);
  });
});

// formulario
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Captura dos valores dos campos
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;  
    
    // Envio para o WhatsApp
    const phoneNumber = '5521982383568'; // Substitua pelo número do WhatsApp desejado
    const whatsappURL = `https://wa.me/${phoneNumber}?text=Nome:%20${encodeURIComponent(name)}%0ATelefone:%20${encodeURIComponent(phone)}%0AEmail:%20${encodeURIComponent(email)}%0AMensagem:%20${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
    
    // Limpar campos do formulário
    form.reset();
  });
});

// bloquear botao direito do mouse
/*
document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
});

document.addEventListener("keydown", function(e) {
  if (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 86 || e.keyCode === 85)) {
    e.preventDefault();
  }
});
*/