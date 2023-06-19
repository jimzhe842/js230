document.addEventListener('DOMContentLoaded', e => {
  let spaces = document.querySelector('#spaces');
  let replay = document.querySelector('#replay');
  let message = document.querySelector('#message');
  let guesses = document.querySelector('#guesses');
  let apples = document.querySelector('#apples');
  let randomWord = (function createRandomWord() {
    let words = ['apple', 'banana', 'orange', 'pear'];
    return function() {
      let length = words.length;
      let index = Math.floor(length * Math.random());
      return words.splice(index, 1)[0];
    }
  })();
  let currentGame;

  let gameMethods = {
    guess: function(key) {
      if (key.length === 1) {
        if (this.guessedLetters.indexOf(key) > -1) {
          return;
        } else if (this.chosenWord.indexOf(key) > -1) {
          this.guessedLetters.push(key);
          this.pushGuessedLetter(key);
          this.pushMatchingLetter(key);
          if (this.checkGuessed()) {
            this.won();
          };
        } else {
          this.guessedLetters.push(key);
          this.pushGuessedLetter(key);
          this.incorrectGuesses++;
          this.removeApple();
          if (this.incorrectGuesses >= this.allowedWrongGuesses) {
            this.loss();
            
          }
        }
      }
    },
    pushMatchingLetter: function(key) {
      let matchingIndexes = [];
      this.chosenWord.split('').forEach((char, index) => {
        if (char === key) {
          this.lettersRemaining--;
          matchingIndexes.push(index);
        }
      });
      matchingIndexes.forEach(matchingIndex => {
        this.spanArr[matchingIndex].textContent = key;
      });
    },
    pushGuessedLetter: function(key) {
      let span = document.createElement('span');
      span.textContent = key;
      this.guessesSpanArr.push(span);
      guesses.appendChild(span);
    },
    checkGuessed() {
      console.log(this.lettersRemaining);
      return this.lettersRemaining === 0;
    },
    won() {
      message.textContent = "You win!";
      replay.style.display = 'block';

      this.setGameStatus('win');
    },
    loss() {
      message.textContent = "You are out of guesses!";
      replay.style.display = 'block';

      this.setGameStatus('lose');
    },
    setGameStatus(status) {
      document.body.classList.remove('win', 'lose');
      if (status) {
        document.body.classList.add(status);
      }
    },
    removeApple() {
      let index = this.incorrectGuesses;
      let className = `guess_${index}`;
      apples.classList.add(className);
    }
  }
  
  function createGame() {
    let chosenWord = randomWord();
    let spanArr = [];
    let wordLength = chosenWord.length;

    replay.style.display = 'none';
    
    
    if (chosenWord === undefined) {
      message.textContent = "Sorry, I've run out of words!";
      replay.style.display = 'none';
      return;
    } else {
      for (let i = 0; i < wordLength; i++) {
        let span = document.createElement('span');
        spanArr.push(span);
        spaces.appendChild(span);
      }
    }
    let game = {
        chosenWord: chosenWord,
        lettersRemaining: wordLength,
        incorrectGuesses: 0,
        guessedLetters: [],
        allowedWrongGuesses: 6,
        spanArr: spanArr,
        guessesSpanArr: [],
        clear: function() {
          this.spanArr.forEach(span => {
            span.remove();
          });
          this.guessesSpanArr.forEach(span => {
            span.remove();
          });
          message.textContent = '';
          apples.className = '';
        },
        
    }
    Object.setPrototypeOf(game, gameMethods);
    game.setGameStatus();
    return game;
  }

  document.addEventListener('keyup', e => {
    e.preventDefault();
    if (currentGame) {
      currentGame.guess(e.key);
    }
  });
  replay.addEventListener('click', e => {
    e.preventDefault();
    if (currentGame) {
      currentGame.clear();
    }
    currentGame = createGame();
  });

});
