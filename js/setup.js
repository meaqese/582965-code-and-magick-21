'use strict';

(function () {
  const MAX_WIZARDS_COUNT = 4;

  const setup = window.dialog.setup;

  const similarWizards = setup.querySelector(`.setup-similar`);
  const similarWizardsList = setup.querySelector(`.setup-similar-list`);

  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);

  const renderWizard = function (wizard) {
    let wizardItem = similarWizardTemplate.cloneNode(true);

    wizardItem.querySelector(`.setup-similar-label`).textContent = wizard.name;

    const wizardImage = wizardItem.querySelector(`.setup-similar-wizard`);
    wizardImage.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardImage.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

    return wizardItem;
  };

  const renderList = function (objects) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < MAX_WIZARDS_COUNT; i++) {
      fragment.appendChild(renderWizard(objects[i]));
    }

    similarWizardsList.appendChild(fragment);
  };

  const onLoadError = function (errorText) {
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

  window.backend.load(renderList, onLoadError);

  const closePopup = window.dialog.closePopup;
  const form = setup.querySelector(`.setup-wizard-form`);
  form.addEventListener(`submit`, function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(form), function () {
      closePopup();
    }, onLoadError);
  });

  similarWizards.classList.remove(`hidden`);
})();
