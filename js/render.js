'use strict';


const MAX_WIZARDS_COUNT = 4;

const setup = window.dialog.setup;

const similarWizards = setup.querySelector(`.setup-similar`);
const similarWizardsList = setup.querySelector(`.setup-similar-list`);

const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content.querySelector(`.setup-similar-item`);

const renderWizard = function (wizard) {
  let wizardItem = similarWizardTemplate.cloneNode(true);

  wizardItem.querySelector(`.setup-similar-label`).textContent = wizard.name;

  const wizardImage = wizardItem.querySelector(`.setup-similar-wizard`);
  wizardImage.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
  wizardImage.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

  return wizardItem;
};

window.render = function (objects) {
  window.util.clearAllChildren(similarWizardsList);

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < MAX_WIZARDS_COUNT; i++) {
    fragment.appendChild(renderWizard(objects[i]));
  }

  similarWizardsList.appendChild(fragment);

  similarWizards.classList.remove(`hidden`);
};

