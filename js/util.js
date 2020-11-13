'use strict';


const getRandRange = function (min, max) {
  return Math.round(min + (Math.random() * (max - min)));
};

const getRandElement = function (array, inclusive = false) {
  const max = (inclusive === false) ? array.length - 1 : array.length;
  return array[getRandRange(0, max)];
};

const clearAllChildren = function (parentNode) {
  parentNode.innerHTML = ``;
};

const createErrorMessage = function (errorText) {
  const element = document.createElement(`div`);

  element.style.position = `absolute`;
  element.style.top = `0`;
  element.style.left = `0`;
  element.style.backgroundColor = `red`;
  element.style.textAlign = `center`;
  element.style.width = `100%`;
  element.style.height = `40px`;
  element.style.lineHeight = `40px`;

  if (errorText.length === 0) {
    errorText = `Ошибка загрузки`;
  }
  element.textContent = errorText;

  document.body.append(element);

  setTimeout(function () {
    element.remove();
  }, 10000);
};

window.util = {
  getRandRange,
  getRandElement,
  clearAllChildren,
  createErrorMessage
};

