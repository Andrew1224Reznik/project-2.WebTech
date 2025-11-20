const mobMenu = document.querySelector('.header-mob-menu');
const mobMenuBtn = document.querySelector('.header-button');
const closeMenu = document.querySelector('.menu-close');

mobMenuBtn.addEventListener('click', event => {
  event.preventDefault(); // Предотвращаем переход по ссылке
  mobMenu.classList.add('mob-menu-open'); // Добавляем класс для отображения модального окна
});

closeMenu.addEventListener('click', event => {
  mobMenu.classList.remove('mob-menu-open');
});
