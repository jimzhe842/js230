document.addEventListener('DOMContentLoaded', e => {
  let photos;
  let templates = {};
  let currentId = 1;
  document.querySelectorAll("script[type='text/x-handlebars']").forEach(template => {
    let id = template.getAttribute('id');
    templates[id] = Handlebars.compile(template.innerHTML);
    // template.remove();
  });

  document.querySelectorAll("script[data-type='partial']").forEach(partialTemplate => {
    // console.log(partialTemplate);
    Handlebars.registerPartial(partialTemplate.id, partialTemplate.innerHTML);
  });
  
  
  let slides = document.querySelector('#slides');
  slides.innerHTML = '';
  let header = document.querySelector('section > header');
  header.innerHTML = '';
  let commentsElement = document.querySelector('#comments ul');
  commentsElement.innerHTML = '';

  let prev = document.querySelector('a.prev');
  let next = document.querySelector('a.next');
  let likeBtn;
  let faveBtn;
  let form = document.querySelector('form');

  function renderPhotos() {
    slides.insertAdjacentHTML('beforeend', templates.photos({photos}));
  }

  function renderPhotoInformation(id) {
    header.innerHTML = '';
    let photo = photos.filter(photo => photo.id === id)[0];
    header.insertAdjacentHTML('beforeend', templates.photo_information(photo));
    if (likeBtn) {
      likeBtn.removeEventListener('click', onLike);
    }
    if (faveBtn) {
      faveBtn.removeEventListener('click', onFave);
    }
    likeBtn = document.querySelector('.like');
    faveBtn = document.querySelector('.favorite');
    likeBtn.addEventListener('click', onLike);
    faveBtn.addEventListener('click', onFave);
  }

  function renderComments(id) {
    commentsElement.innerHTML = '';
    fetch(`/comments?photo_id=${id}`).
      then(res => res.json()).
      then(json => {
        commentsElement.insertAdjacentHTML('beforeend', templates.photo_comments({comments: json}));
      });
  }
  
  let xhr = new XMLHttpRequest();
  xhr.open('GET', '/photos');
  xhr.addEventListener('load', e => {
    photos = JSON.parse(xhr.response);
    let id = photos[0].id;
    renderPhotos();
    renderPhotoInformation(id);
    renderComments(id);
  });
  xhr.send();

  function fadeIn(figure) {
    figure.classList.remove('hide');
    figure.classList.add('show');
  }

  function fadeOut(figure) {
    figure.classList.remove('show');
    figure.classList.add('hide');
  }

  function prevImage() {
    if (currentId) {


      let currentFigure = slides.querySelector(`[data-id='${currentId}']`);
      let prevFigure;
      console.log(currentId);
      if (currentFigure.previousElementSibling) {
        prevFigure = currentFigure.previousElementSibling;
        currentId--;
      } else {
        prevFigure = currentFigure.parentNode.lastElementChild;
        currentId = Number(prevFigure.getAttribute('data-id'));

      }
      // let prevFigure = currentFigure.previousElementSibling || currentFigure.lastElementChild;
      // currentFigure.classList.remove('active');
      // prevFigure.classList.add('active');
      fadeOut(currentFigure);
      fadeIn(prevFigure);
      renderPhotoInformation(currentId);
      renderComments(currentId);
    }
  }

  function nextImage() {
    if (currentId !== undefined) {
      let currentFigure = slides.querySelector(`[data-id='${currentId}']`);
      let nextFigure;
      if (currentFigure.nextElementSibling) {
        nextFigure = currentFigure.nextElementSibling;
        currentId++;
      } else {
        nextFigure = currentFigure.parentNode.firstElementChild;
        currentId = 1;
      }
      // currentFigure.classList.remove('active');
      // nextFigure.classList.add('active');
      fadeOut(currentFigure);
      fadeIn(nextFigure);
      renderPhotoInformation(currentId);
      renderComments(currentId);
    }
  }

  prev.addEventListener('click', prevImage);
  next.addEventListener('click', nextImage);

  function renderLikes(likes) {
    likeBtn.textContent = `
    ♡
              ${likes}
              Likes
    `;
    }

  function renderFaves(faves) {
    faveBtn.textContent = `
    ☆
              ${faves}
              Favorites
    `;
    }

  function onLike(e) {
    e.preventDefault();
    let photo = photos.filter(photo => photo.id === currentId)[0];
    photo.likes += 1;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/photos/like');
    xhr.addEventListener('load', e => {
      // console.log(xhr.response);
      e.preventDefault();
      let res = xhr.response;
      let json = JSON.parse(res);
      renderLikes(json.total);
    });
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded; charset=utf-8');
    xhr.send("photo_id="+currentId);
  }

  function onFave(e) {
    e.preventDefault();
    let photo = photos.filter(photo => photo.id === currentId)[0];
    photo.favorites += 1;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/photos/favorite');
    xhr.addEventListener('load', e => {
      e.preventDefault();
      let res = xhr.response;
      let json = JSON.parse(res);
      renderFaves(json.total);
    });

    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded; charset=utf-8');
    xhr.send("photo_id="+currentId);
  }

  

  form.addEventListener('submit', e => {
    e.preventDefault();
    let action = form.getAttribute('action');
    let xhr = new XMLHttpRequest();
    xhr.open('POST', action);
    xhr.addEventListener('load', e => {
      e.preventDefault();
      form.reset();
      let data = JSON.parse(xhr.response);
      
      let comments = document.querySelector('#comments ul');
      console.log(data);
      comments.insertAdjacentHTML('beforeend', templates.photo_comment(data));
    });
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded; charset=utf-8');
    let name = form.querySelector('#name').value;
    let email = form.querySelector('#email').value;
    let body = form.querySelector('#body').value;
    let formData = new FormData(form);
    
    let params = `body=${body}&name=${name}&photo_id=${currentId}&email=${email}`;
    // params: body, name, photo_id, email
    let paramsString = new URLSearchParams(params);
    xhr.send(paramsString);
  })


  
});