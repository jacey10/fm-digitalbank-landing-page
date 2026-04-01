const menuBtn = document.getElementById('menuBtn');
const overlay = document.getElementById('menuOverlay');

menuBtn.addEventListener('click', () => {
    overlay.classList.add('open');
})