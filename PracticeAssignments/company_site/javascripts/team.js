document.addEventListener('DOMContentLoaded', () => {
  let teamList = document.querySelector('#team-list');
  let modalWrapper = document.querySelector('.modal-wrapper');
  let modalClose = document.querySelector('.modal-close');
  let modalPic = document.querySelector('.modal-pic');
  let fullNameTitle = document.querySelector('.modal-title p');
  let dataNames = {
    kevin: "Kevin",
    louis: "Louis Burton",
    kasper: "Kasper",
    chris: "Chris Lee"
  }

  let hideModal = function() {
    modalWrapper.classList.remove('active');
  }
  teamList.addEventListener('click', e => {
    e.preventDefault();
    let target = e.target;
    let li = target.closest('li');
    if (!li) {return};
    let name = li.getAttribute('data-name');
    let fullName = dataNames[name];
    modalPic.setAttribute('src', `./images/img_${name}.jpg`);
    fullNameTitle.textContent = fullName;
    modalWrapper.classList.add('active');
  });
  modalClose.addEventListener('click', e => {
    e.preventDefault();
    hideModal();
  });

  document.addEventListener('keyup', e => {
    e.preventDefault();
    if (e.keyCode === 27) { // key code for escape key
      hideModal();
    }
  });
  
  modalWrapper.addEventListener('click' ,e => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      hideModal();
    }
  });
});
