const backdropWindow = document.querySelector('.backdrop');
const backdropBtns = document.querySelectorAll('.backdrop-button');
const body = document.querySelector('body');
const closeModal = document.querySelector('.backdrop-close');

backdropBtns.forEach(btn => {
  btn.addEventListener('click', event => {
    event.preventDefault(); // Предотвращаем переход по ссылке
    backdropWindow.classList.add('backdrop-open'); // Показываем модальное окно
    body.classList.add('noscroll'); // Блокируем прокрутку
  });
});

// Закрытие по кнопке
closeModal.addEventListener('click', event => {
  backdropWindow.classList.remove('backdrop-open');
  body.classList.remove('noscroll');
});

// Закрытие модального окна при клике на фон (если клик не по содержимому)
backdropWindow.addEventListener('click', event => {
  if (event.target === backdropWindow) {
    // Проверяем, что клик именно по фону
    backdropWindow.classList.remove('backdrop-open');
    body.classList.remove('noscroll');
  }
});
