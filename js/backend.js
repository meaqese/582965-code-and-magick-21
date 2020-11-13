'use strict';

const load = function (onLoad, onError) {
  const URL = `https://21.javascript.pages.academy/code-and-magick/data`;

  const request = new XMLHttpRequest();
  request.responseType = `json`;

  request.addEventListener(`load`, function () {
    onLoad(request.response);
  });
  request.addEventListener(`error`, function () {
    onError(request.statusText);
  });
  request.addEventListener(`timeout`, function () {
    onError(`Превышено время ожидания`);
  });

  request.open(`GET`, URL);
  request.send();
};
const save = function (data, onLoad, onError) {
  const URL = `https://21.javascript.pages.academy/code-and-magick`;

  const request = new XMLHttpRequest();
  request.responseType = `json`;

  request.addEventListener(`load`, function () {
    onLoad();
  });
  request.addEventListener(`error`, function () {
    onError(request.statusText);
  });
  request.addEventListener(`timeout`, function () {
    onError(`Превышено время ожидания`);
  });

  request.open(`POST`, URL);
  request.send(data);
};

window.backend = {
  load, save
};
