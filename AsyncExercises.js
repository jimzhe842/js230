// 1

function randomizer(...callbacks) {
  // n callbacks
  // between n and 2 * n seconds calls the callback
  // also log every elpased second
  if (callbacks.length < 1) {
    return;
  }
  let count = callbacks.length;
  for (let i = 1; i <= 2 * count; i++) {
    setTimeout(() => console.log('tick', i), i * 1000);
  }
  callbacks.forEach(callback => {
    let timeout = Math.random() * (count * 2);
    setTimeout(callback, timeout * 1000);
  });
}

function log1() {
  console.log(1);
}

function log2() {
  console.log(2);
}

function log3() {
  console.log(3);
}

function log4() {
  console.log(4);
}

randomizer(log1, log2, log3, log4);



// 2

document.querySelector('html').addEventListener('click', (event) => {
  let container = document.querySelector('#container');
  if (!container.contains(event.target)) {
    document.querySelector('#container').style = 'display: none';
  }
});

// 3

function makeBold(element, callback) {
  element.style.fontWeight = 'bold';
  if (callback && typeof callback === 'function') {
    callback(element);  
  }
}


function makeBold2(element) {
  element.style.fontWeight = 'bold';
  const event = new CustomEvent('bolded');

  element.dispatch(event);
}



// 4 (Buggy code)

// event.preventDefault()





// 5

let main = document.querySelector('main');
main.addEventListener('contextmenu', event => {
  event.preventDefault();
  if (event.target.tagName === 'MAIN') {
    alert('Main');
  } else {
    alert('Sub');
  }
});

// 6

let classificationFilter = {
  ['Vertebrate']:	['Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
  ['Warm-blooded']:	['Bear', 'Whale', 'Ostrich'],
  ['Cold-blooded']:	['Salmon', 'Turtle'],
  ['Mammal']:	['Bear', 'Whale'],
  ['Bird']:	['Ostrich']
}

let animalFilter = {
  ['Bear']:	['Vertebrate', 'Warm-blooded', 'Mammal'],
  ['Turtle']:	['Vertebrate', 'Cold-blooded'],
  ['Whale']:	['Vertebrate', 'Warm-blooded', 'Mammal'],
  ['Salmon']:	['Vertebrate', 'Cold-blooded'],
  ['Ostrich']:	['Vertebrate', 'Warm-blooded', 'Bird']
}

let clearBtn = document.querySelector('#clear');
let classificationSelection = document.querySelector('#animal-classifications');
let animalSelection = document.querySelector('#animals');
clearBtn.addEventListener('click', event => {
  event.preventDefault();
  setOptions(classificationSelection, ['Classifications', 'Vertebrate', 'Warm-blooded', 'Cold-blooded', 'Mammal', 'Bird']);
  setOptions(animalSelection, ['Animals', 'Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich']);
  classificationSelection.value = "Classifications";
  animalSelection.value = "Animals";
});

function setOptions(selection, filter) {
  let options = selection.options;
  options.length = 0;
  filter.forEach((value, index) => {
    options[index] = new Option(value);
  });
}

classificationSelection.addEventListener('change', event => {
  event.preventDefault();
  let selected = classificationSelection.value;
  setOptions(animalSelection, classificationFilter[selected]);
});

animalSelection.addEventListener('change', event => {
  event.preventDefault();
  let selected = animalSelection.value;
  setOptions(classificationSelection, animalFilter[selected]);
});




// 7

let current;
let navUl = document.querySelector('ul');
let main = document.querySelector('main');
navUl.addEventListener('click', event => {
  event.preventDefault();
  if (event.target.tagName === 'A') {
    let article = document.querySelector(event.target.getAttribute('href'));
    highlightElement(article);
  }
});

main.addEventListener('click', event => {
  event.preventDefault();
  event.stopPropagation();
  if (event.target.closest('article')) {
    highlightElement(event.target.closest('article'));
  } else {
    highlightElement(main);
  }
});

function highlightElement(element) {
  if (current) {
    current.classList.remove('highlight');
  }
  current = element;
  element.classList.add('highlight');
}


// 8

const element1 = document.querySelector('table');
const element2 = document.querySelector('main h1');
const element3 = document.querySelector('main');

const callback = ({target, currentTarget}) => {
  alert(`Target: ${target.tagName}\nCurrent Target: ${currentTarget.tagName}`);
};

function delegateEvent(element, selector, eventName, callback) {
  if (element && element instanceof Element) {
    element.addEventListener(eventName, event => {
      let selections = Array.from(element.querySelectorAll(selector));
      if (selections.indexOf(event.target) > -1) {
        event.stopPropagation(); // not necessary since only one event listener
        callback(event);
      }
    });
    return true;
  }
}



// 9


// Answer key

const tracker = (function() {
  let events = [];
  return {
    list() {
      return events.slice();
    },
    elements() {
      return this.list().map(({target}) => target);
    },
    add(event) {
      events.push(event);
    },
    clear() {
      events.length = 0;
      return events.length;
    },
  }
})();

function track(callback) {
  function isEventTracked(events, event) {
    return events.includes(event);
  }

  return event => {
    if (!isEventTracked(tracker.list(), event)) {
      tracker.add(event);

      callback(event);
    }
  }
}

let tracker = {
  elementsArr: [],
  list: function() {
    this.elementsArr = this.elementsArr.filter(element => element instanceof Element);
    return this.elementsArr;
  },
  elements: function() {
    return this.elementsArr;
  },
  clear: function() {
    this.elementsArr = [];
    return 0;
  }
}

function track(callback) {
  return event => {
    event.stopPropagation();
    tracker.elementsArr.push(event.currentTarget);
    callback(event);
  }
}

let divRed = document.querySelector('div#red');
let divBlue = document.querySelector('div#blue');
let divOrange = document.querySelector('div#orange');
let divGreen = document.querySelector('div#green');

divRed.addEventListener('click', track(event => {
  document.body.style.background = 'red';
}));

divBlue.addEventListener('click', track(event => {
  event.stopPropagation();
  document.body.style.background = 'blue';
}));

divOrange.addEventListener('click', track(event => {
  document.body.style.background = 'orange';
}));

divGreen.addEventListener('click', track(event => {
  document.body.style.background = 'green';
}));