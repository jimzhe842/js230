document.addEventListener('DOMContentLoaded', () => {
  let textField = document.querySelector('.text-field');
  let focusedTextField;
  let cursorInterval;
  
  textField.addEventListener('click', e => {
    e.stopPropagation();
    if (!focusedTextField) {
      focusedTextField = textField;
      textField.classList.add('focused');
      cursorInterval = setInterval(() => {
        textField.classList.toggle('cursor');
      }, 500);  
    }
    
  });
  document.addEventListener('click', e => {
    clearInterval(cursorInterval);
    if (focusedTextField) {
      textField.classList.remove('focused');
      textField.classList.remove('cursor');
      focusedTextField = null;
    }
  });
  document.addEventListener('keydown', e => {
    if (focusedTextField) {
      let contentDiv = document.querySelector('.content');
      if (e.code === 'Backspace') {
        let text = contentDiv.textContent;
        contentDiv.textContent = text.slice(0, text.length - 1);
      } else if (e.key.length === 1) {
        let key = e.key;
        let text = contentDiv.textContent;
        contentDiv.textContent = text + key;  
      }
      
    }
  });
  
});