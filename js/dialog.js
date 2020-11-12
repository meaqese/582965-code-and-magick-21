'use strict';

(function () {
  const SETUP_TOP = `80px`;
  const SETUP_LEFT = `50%`;

  const wizardUserName = document.querySelector(`.setup-user-name`);

  const setup = document.querySelector(`.setup`);
  const setupOpenButton = document.querySelector(`.setup-open`);
  const setupCloseButton = setup.querySelector(`.setup-close`);

  wizardUserName.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Escape`) {
      evt.stopPropagation();

      wizardUserName.blur();
    }
  });

  const popupClosePressESC = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePopup();
    }
  };

  const popupClosePressEnter = function (evt) {
    if (evt.key === `Enter`) {
      evt.preventDefault();

      closePopup();
    }
  };

  const openPopup = function () {
    setup.style.top = SETUP_TOP;
    setup.style.left = SETUP_LEFT;

    setup.classList.remove(`hidden`);

    document.addEventListener(`keydown`, popupClosePressESC);
    setupCloseButton.addEventListener(`keydown`, popupClosePressEnter);
  };

  const closePopup = function () {
    setup.classList.add(`hidden`);

    document.removeEventListener(`keydown`, popupClosePressESC);
    setupCloseButton.removeEventListener(`keydown`, popupClosePressEnter);
  };

  setupOpenButton.addEventListener(`click`, function () {
    openPopup();
  });

  setupOpenButton.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      openPopup();
    }
  });

  setupCloseButton.addEventListener(`click`, function () {
    closePopup();
  });

  const form = setup.querySelector(`.setup-wizard-form`);
  form.addEventListener(`submit`, function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(form), function () {
      closePopup();
    }, window.util.createErrorMessage);
  });

  window.dialog = {
    setup, closePopup
  };
})();
