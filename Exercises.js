// 2

function countDirectNodes(node) {
  let direct = node.childNodes.length;
  let indirectNodes = 0;
  
  function walk(node, fn) {
    fn(node);
    for (let idx = 0; idx < node.childNodes.length; idx++) {
      walk(node.childNodes[idx], fn);
    }
  }
  for (idx = 0; idx < node.childNodes.length; idx++) {
    let childNode = node[idx];
    walk(childNode, () => {
      indirectNodes++;
    });
  }

  return [direct, indirectNodes];
}

// 3

function domTreeTracer(id) {
  let arr = [];
  id = String(id);
  let element = document.getElementById(id);
  while (element.tagName !== 'BODY') {
    let subarr = [];
    let children = element.parentNode.children;
    for (let i = 0; i < children.length; i++) {
      let element = children[i];
      subarr.push(element.tagName);
    }
    arr.push(subarr);
    element = element.parentElement;
  }
  console.log(arr);
}

function sliceTree(start, end) {
  let element = document.getElementById(start);
  if (!element || end < start) {
    return undefined;
  }
  let arr = [];
  let currentIndex = start;
  do {
    arr.push(element.tagName);
    if (element.id === end) {
      break;
    }
    let children = element.children;
    element = null;
    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      let id = Number(child.id);
      if (id >= end) {
        break;
      }
      element = child;
      currentIndex = id;
    }
  } while (element);
  // add the first item;
  // iterate over all the children
  // find the id with the largest id not greater than end
    // if id is equal to end return
    // else iterate over that children's node again (if there are any children)
  if (currentIndex < end) {
    return undefined;
  } else {
    return arr;
  }
}


// 5
// given an id ==> side effect: change color of same generation elements;
// find element by id; parentNode (get siblings), get children for each sibling; add class;



function colorGeneration(generation) {
  // let element = document.getElementById(id);
  // if (!element) {
  //   return;
  // }
  // let levels = 0;
  // while (element.tagName !== 'BODY') {
  //   levels++;
  //   element = element.parentNode;
  // }
  if (generation < 1) {
    return;
  }

  function color(node, currentLevel) {
    if (currentLevel === generation) {
      node.classList.add('generation-color');
    } else {
      let children = node.children;
      for (let i = 0; i < children.length; i++) {
        let child = children[i];
        color(child, currentLevel + 1); // currentLevel++, will not increment the value as the return
      }
    }
  }

  let element = document.getElementById('1');
  color(element, 1);
}

// 6

// check if nodes are valid, if not return undefined
  // check that the id exists
  // check that the elements are not a child of each other
    // go through the parents of both elements to confirm this
// swap and return true;
  // find the nextelementsibling of both elements;
  // insert both elements before the nextelementsibling of the other element;

function nodeSwap(id1, id2) {
  let element1 = document.getElementById(id1);
  let element2 = document.getElementById(id2);
  if (!element1 || !element2) {
    return;
  }
  let el1 = element1;
  let el2 = element2;
  while (el1.tagName !== 'BODY') {
    if (el1 === element2) {
      el1 = null;
      break;
    } else {
      el1 = el1.parentNode;
    }
  }
  if (!el1) {
    return;
  }
  while (el2.tagName !== 'BODY') {
    if (el2 === element1) {
      el2 = null;
      break;
    } else {
      el2 = el2.parentNode;
    }
  }
  if (!el2) {
    return;
  }

  let sibling1 = element1.nextElementSibling;
  let sibling2 = element2.nextElementSibling;
  element1.parentNode.insertBefore(element2, sibling1);
  element2.parentNode.insertBefore(element1, sibling2);

  return true;
}


// 7


function nodesToArr() {
  // let arr = [];
  function traverse(node) {
    let children = node.children;
   
    let childrenArr = [];
    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      childrenArr.push(traverse(child));
    }
    return [node.tagName, childrenArr];
  }
  let body = document.querySelector('body');
  return traverse(body);
}


// 8

function arrayToNodes(arr) {
  function createDOM(node, arr) {
    let tagName = arr[0];
    let children = arr[1];
    let element = document.createElement(tagName);
    node.appendChild(element);
    for (let i = 0; i < children.length; i++) {
      let childArr= children[i];
      createDOM(element, childArr);
    }
  }
  let html = document.querySelector('html');
  createDOM(html, arr);
}