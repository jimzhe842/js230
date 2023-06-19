let introDivs = document.getElementsByClassName('intro'); // won't work, must use numbers
for (let introDiv of introDivs) {
  let pNodes = introDiv.getElementsByTagName('p');
  for (let pNode of pNodes) {
    pNode.classList.add('article-text');
  }
}


let classifications = {Kingdom: true, Phlylum: true, Class: true, Order: true, Family: true, Genus: true, Species: true};

let trList = document.querySelector('.infobox.biota').querySelectorAll('tr');

let info = {};
Array.from(trList).forEach(tr => {
  if (tr.querySelector('td')) {
    let classification = tr.querySelector('td').textContent.replace(/\W/, '');
    console.log(classification);
    if (classifications[classification]) {
      let name = tr.lastElementChild.textContent; // why doesn't last element child work?
      info[classification] = name;
    }
  }
});

console.log(info);


for (let i = 1; i <= 10; i++) {
  setTimeout(() => {
    console.log(i);
  }, i * 1000);
}


// g, f, d, z, n, s, q

function makeAdder() {
  let i = 0;
  return function() {
    i++;
    console.log(i);
  }
}

function stopCounting(id) {
  clearInterval(id);
}

setInterval(makeAdder(), 1000);