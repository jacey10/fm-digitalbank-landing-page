const menuBtn = document.getElementById('menuBtn');
const overlay = document.getElementById('menuOverlay');

function openMenu() {
  if (!overlay.querySelector('header nav')) {
    const nav = document.querySelector('header nav');
    const clonedNav = nav.cloneNode('true');
    overlay.appendChild(clonedNav);
  } 
  overlay.classList.add('open');
  menuBtn.classList.add('open');
  menuBtn.setAttribute('aria-exapnded', true);   
}

function closeMenu() {
  overlay.innerHTML = '';
  overlay.classList.remove('open');
  menuBtn.classList.remove('open');
  menuBtn.setAttribute('aria-exapnded', false);
}

menuBtn.addEventListener('click', () => {
  overlay.classList.contains('open')? closeMenu() : openMenu();
});

document.addEventListener('click', (e) => {
  if (!overlay.contains(e.target) && !menuBtn.contains(e.target)) {
      closeMenu();
  }
});

const isMobile = window.innerWidth < 870;

const animatedEls = document.querySelectorAll(
  isMobile 
    ? '.hero__visual, .offers, .article__card' 
    : '.hero__visual, .offers, .article__wrapper'
);

const revealOnScroll = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.add('animate__animated');

  if (isMobile && entry.target.classList.contains('article__card')) {
    entry.target.classList.add('animate__fadeInUp');
  } else if (entry.target.classList.contains('offers')) {
    entry.target.classList.add('animate__slideInLeft');
  } else {
    entry.target.classList.add('animate__slideInRight');
  }

  entry.target.addEventListener('animationend', () => {
    entry.target.classList.remove(
      'animate__animated', 
      'animate__slideInLeft', 
      'animate__slideInRight',
      'animate__fadeInUp'
    );
  }, { once: true });

  observer.unobserve(entry.target);
};

const scrollObserver = new IntersectionObserver(revealOnScroll, {
  root: null,
  threshold: isMobile ? 0.3 : 0.8,
});

animatedEls.forEach((el) => scrollObserver.observe(el));