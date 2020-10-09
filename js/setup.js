'use strict';

const userDialog = document.querySelector(`.setup`);
userDialog.classList.remove(`hidden`);

const WIZARDS_DATA = {
  names: [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`],
  surnames: [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`],
  coatColors: [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`],
  eyesColors: [`black`, `red`, `blue`, `yellow`, `green`]
};


Math.randRange = function (min, max) {
  return Math.round(min + (Math.random() * (max - min)));
};

const generateWizards = function (count, wizardsData) {
  const wizards = [];

  for (let i = 0; i < count; i++) {
    wizards.push(
        {
          name: `${wizardsData.names[Math.randRange(0, wizardsData.names.length - 1)]}
          ${wizardsData.surnames[Math.randRange(0, wizardsData.surnames.length - 1)]}`,

          coatColor: wizardsData.coatColors[Math.randRange(0, wizardsData.coatColors.length - 1)],
          eyesColor: wizardsData.eyesColors[Math.randRange(0, wizardsData.eyesColors.length - 1)]
        }
    );
  }

  return wizards;
};

const similarWizards = document.querySelector(`.setup-similar`);
const similarWizardsList = document.querySelector(`.setup-similar-list`);

const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);

const renderWizard = function (wizard) {
  let wizardItem = similarWizardTemplate.cloneNode(true);

  wizardItem.querySelector(`.setup-similar-label`).textContent = wizard.name;

  const wizardImage = wizardItem.querySelector(`.setup-similar-wizard`);
  wizardImage.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardImage.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardItem;
};

const renderList = function (listElement, objects) {
  const fragment = document.createDocumentFragment();
  for (let object of objects) {
    fragment.appendChild(renderWizard(object));
  }

  listElement.appendChild(fragment);
};

renderList(similarWizardsList, generateWizards(4, WIZARDS_DATA));

similarWizards.classList.remove(`hidden`);
