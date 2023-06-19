// let header = document.querySelector("body > header");
// let h1 = document.querySelector("main > h1");
// header.insertBefore(h1, header.firstChild);
// document.body.insertBefore(header, document.body.firstChild);

// let [chinStickFigure, babyMopFigure] = document.querySelectorAll("figure");
// let babyMopImage = chinStickFigure.querySelector("img");
// let chinStickImage = babyMopFigure.querySelector("img");
// chinStickFigure.insertBefore(chinStickImage, null);
// babyMopFigure.insertBefore(babyMopImage, null);

// let article = document.querySelector("article");
// article.insertBefore(chinStickFigure, null);
// article.insertBefore(babyMopFigure, null);

























let header = document.querySelector('body > header');
let main = document.querySelector('body > main');
let h1 = document.querySelector('main > h1');
header.insertAdjacentElement('afterbegin', h1);
document.body.insertBefore(header, main);
// main.insertAdjacentElement('beforebegin', header);

let [ chinStickFigure, babyMopFigure ] = document.querySelectorAll('figure');
let article = document.querySelector('article');
article.insertAdjacentElement('beforeend', chinStickFigure);
article.insertAdjacentElement('beforeend', babyMopFigure);

let babyMop = chinStickFigure.querySelector('img');
let chinStick = babyMopFigure.querySelector('img');
let child1 = figure1.lastElementChild;
chinStickFigure.insertBefore(chinStick, figure1.lastElementChild);
babyMopFigure.insertBefore(babyMop, figure2.lastElementChild);
// article.insertBefore(figure2, figure1);

// some kind of bug fix (nvm, the browser was also loading the script here)
// let header2 = document.querySelectorAll('header')[1];
// header.insertAdjacentElement('beforeend', header2.querySelector('nav'));