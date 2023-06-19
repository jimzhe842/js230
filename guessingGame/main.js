document.addEventListener('DOMContentLoaded', () => {
  let answer;
  let message;
  let guesses;
  let form = document.querySelector('form');
  let input = document.querySelector('#guess');
  let newGameLink = document.querySelector('a');
  let paragraph = document.querySelector('p');
  let guessBtn = document.querySelector('[type="submit"]');
  
  function newGame() {
    guessBtn.disabled = false;
    answer = Math.floor(Math.random() * 100) + 1;
    message = `Guess a number between 1 and 100`;
    guesses = 0;
    paragraph.textContent = message;
  }
  
  form.addEventListener('submit', e => {
    e.preventDefault();
    let guess = parseInt(input.value, 10);
    guesses += 1;
    let message;
    // Number.isNaN(guess);
    if (guess !== Number(input.value)) {
      message = `Not an integer`;
    } else if (guess > answer) {
      message = `My number is lower than ${String(guess)}`;
    } else if (answer > guess) {
      message = `My number is higher than ${String(guess)}`;
    } else if (answer === guess) {
      message = `You guessed it! ${guesses} tries!`;
      guessBtn.disabled = true;
    }
    paragraph.textContent = message;
  });

  newGameLink.addEventListener('click', e => {
    newGame();
  });

  newGame();
});