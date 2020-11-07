'use strict';

(function () {
  const setup = window.dialog.setup;
  const uploadButton = setup.querySelector(`.upload`);

  uploadButton.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let dragged = false;

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = function (moveEvt) {
      dragged = true;

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.left = (setup.offsetLeft - shift.x) + `px`;
      setup.style.top = (setup.offsetTop - shift.y) + `px`;
    };

    const onMouseUp = function () {
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        const onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          uploadButton.removeEventListener(`click`, onClickPreventDefault);
        };

        uploadButton.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
})();
