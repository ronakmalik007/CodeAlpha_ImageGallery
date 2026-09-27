const filterBtns = document.querySelectorAll('.filter-btn');
const photos = document.querySelectorAll('.photo');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    photos.forEach(photo => {
      if (filter === 'all' || photo.dataset.category === filter) {
        photo.classList.remove('hidden');
      } else {
        photo.classList.add('hidden');
      }
    });
  });
});

const lightbox = document.getElementById('lightbox');
const lbImage = document.getElementById('lbImage');
const lbCaption = document.getElementById('lbCaption');
const lbClose = document.getElementById('lbClose');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');

let currentIndex = 0;
let visiblePhotos = [];

function getVisiblePhotos() {
  return Array.from(photos).filter(p => !p.classList.contains('hidden'));
}

function openLightbox(index) {
  visiblePhotos = getVisiblePhotos();
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add('open');
}

function updateLightbox() {
  const photo = visiblePhotos[currentIndex];
  const img = photo.querySelector('img');
  const caption = photo.querySelector('figcaption');
  lbImage.src = img.src;
  lbImage.alt = img.alt;
  lbCaption.textContent = caption.textContent;
}

photos.forEach(photo => {
  photo.addEventListener('click', () => {
    visiblePhotos = getVisiblePhotos();
    const index = visiblePhotos.indexOf(photo);
    openLightbox(index);
  });
});

lbClose.addEventListener('click', () => {
  lightbox.classList.remove('open');
});

lbPrev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + visiblePhotos.length) % visiblePhotos.length;
  updateLightbox();
});

lbNext.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % visiblePhotos.length;
  updateLightbox();
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('open');
  }
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') lightbox.classList.remove('open');
  if (e.key === 'ArrowLeft') lbPrev.click();
  if (e.key === 'ArrowRight') lbNext.click();
});
