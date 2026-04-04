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

const animatedEls = document.querySelectorAll('.hero__visual, .cards, .article__wrapper');

const revealOnScroll = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.add('animate__animated');

  if (entry.target.classList.contains('cards')) {
    entry.target.classList.add('animate__slideInLeft');
  } else {
    entry.target.classList.add('animate__slideInRight');
  }

  observer.unobserve(entry.target);
};

const scrollObserver = new IntersectionObserver(revealOnScroll, {
  root: null,
  threshold: 0.1,
});

animatedEls.forEach((el) => scrollObserver.observe(el));