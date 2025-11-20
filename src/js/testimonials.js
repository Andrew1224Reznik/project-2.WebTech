document.addEventListener('DOMContentLoaded', () => {
  const slidesContainer = document.querySelector('.slides');
  const slider = document.querySelector('.slider');
  const texts = document.querySelectorAll('.testimonials-text-all .text');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let slideElements = Array.from(document.querySelectorAll('.slide'));
  const visibleSlides = 3;
  const originalCount = slideElements.length;

  if (originalCount === 0) return;

  slideElements.forEach((s, i) => (s.dataset.index = i));

  // клонирование
  for (let i = 0; i < visibleSlides; i++) {
    const cloneFirst = slideElements[i].cloneNode(true);
    const cloneLast = slideElements[originalCount - 1 - i].cloneNode(true);
    slidesContainer.appendChild(cloneFirst);
    slidesContainer.insertBefore(cloneLast, slidesContainer.firstChild);
  }

  slideElements = Array.from(document.querySelectorAll('.slide'));
  let totalSlides = slideElements.length;

  let currentIndex = visibleSlides;
  let isAnimating = false;

  function getSlideWidth() {
    return slider.offsetWidth / visibleSlides;
  }

  function setTransition(on) {
    slidesContainer.style.transition = on ? 'transform 0.6s ease' : 'none';
  }

  function highlightCenter() {
    const centerOffset = Math.floor(visibleSlides / 2);
    const centerSlideIndex = currentIndex + centerOffset;
    const centerSlide = slideElements[centerSlideIndex];
    const centerOriginalIndex = Number(centerSlide.dataset.index);

    // тексты
    texts.forEach((t, i) =>
      t.classList.toggle('active', i === centerOriginalIndex)
    );

    // слайды
    slideElements.forEach(s => s.classList.remove('center'));
    if (centerSlide) centerSlide.classList.add('center');
  }

  function updateSlider() {
    const w = getSlideWidth();
    slidesContainer.style.transform = `translateX(-${currentIndex * w}px)`;
    highlightCenter();
  }

  function goToSlide(index) {
    if (isAnimating) return;
    isAnimating = true;
    setTransition(true);
    currentIndex = index;
    updateSlider();
  }

  prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

  slidesContainer.addEventListener('transitionend', () => {
    let jumped = false;

    if (currentIndex < visibleSlides) {
      setTransition(false);
      currentIndex += originalCount;
      slidesContainer.style.transform = `translateX(-${
        currentIndex * getSlideWidth()
      }px)`;
      jumped = true;
    } else if (currentIndex >= totalSlides - visibleSlides) {
      setTransition(false);
      currentIndex -= originalCount;
      slidesContainer.style.transform = `translateX(-${
        currentIndex * getSlideWidth()
      }px)`;
      jumped = true;
    }

    // если был прыжок — обновляем центр только после "телепорта"
    if (jumped) {
      requestAnimationFrame(() => {
        highlightCenter();
      });
    }

    isAnimating = false;
    setTimeout(() => setTransition(true), 20);
  });

  window.addEventListener('resize', () => {
    setTransition(false);
    updateSlider();
    setTimeout(() => setTransition(true), 20);
  });

  // старт
  setTransition(false);
  updateSlider();
  setTimeout(() => setTransition(true), 20);
});
