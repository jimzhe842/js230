document.addEventListener('DOMContentLoaded', e => {
  let photoList = document.querySelector('#photo-list');
  let mainPhoto = document.querySelector('#main-photo');
  let currentTarget = document.querySelector('.selected');
  let timeout;
  photoList.addEventListener('click', e => {
    e.preventDefault();
    if (e.target.tagName === 'IMG') {
      let source = e.target.getAttribute('src');
      currentTarget.classList.remove('selected');
      e.target.classList.add('selected');
      currentTarget = e.target;
      if (timeout) {clearTimeout(timeout)}
      mainPhoto.classList.add('hide');
      timeout = setTimeout(() => {
        mainPhoto.setAttribute('src', source);
        mainPhoto.classList.remove('hide');
      }, 500);
    }
  });
});