'use strict';

const WIZARDS_DATA = {
  names: [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`],
  surnames: [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`],
  coatColors: [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`],
  eyesColors: [`black`, `red`, `blue`, `yellow`, `green`]
};

const FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];

const setup = document.querySelector(`.setup`);
const setupOpenButton = document.querySelector(`.setup-open`);
const setupCloseButton = setup.querySelector(`.setup-close`);


const getRandRange = function (min, max) {
  return Math.round(min + (Math.random() * (max - min)));
};

const getRandElement = function (array, inclusive = false) {
  const max = (inclusive === false) ? array.length - 1 : array.length;
  return array[getRandRange(0, max)];
};

const generateWizards = function (count, wizardsData) {
  const wizards = [];

  for (let i = 0; i < count; i++) {
    wizards.push(
        {
          name: `${wizardsData.names[getRandRange(0, wizardsData.names.length - 1)]}
          ${wizardsData.surnames[getRandRange(0, wizardsData.surnames.length - 1)]}`,

          coatColor: wizardsData.coatColors[getRandRange(0, wizardsData.coatColors.length - 1)],
          eyesColor: wizardsData.eyesColors[getRandRange(0, wizardsData.eyesColors.length - 1)]
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

/* Popup Functions */

const wizardUserName = document.querySelector(`.setup-user-name`);

wizardUserName.addEventListener(`keydown`, function (evt) {
  evt.stopPropagation();
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

/* Wizard Appearance */

const setupWizardAppearance = document.querySelector(`.setup-wizard-appearance`);
const setupWizard = setupWizardAppearance.querySelector(`.setup-wizard`);

const wizardCoat = setupWizard.querySelector(`.wizard-coat`);
const wizardCoatColorInput = setupWizardAppearance.querySelector(`[name=coat-color]`);

const wizardEyes = setupWizard.querySelector(`.wizard-eyes`);
const wizardEyesColorInput = setupWizardAppearance.querySelector(`[name=eyes-color]`);


wizardCoat.addEventListener(`click`, function () {
  let randColor = getRandElement(WIZARDS_DATA.coatColors);

  wizardCoat.style.fill = randColor;
  wizardCoatColorInput.value = randColor;
});


wizardEyes.addEventListener(`click`, function () {
  let randColor = getRandElement(WIZARDS_DATA.eyesColors);

  wizardEyes.style.fill = randColor;
  wizardEyesColorInput.value = randColor;
});

const wizardFireballWrap = document.querySelector(`.setup-fireball-wrap`);
const wizardFireballColorInput = wizardFireballWrap.querySelector(`[name=fireball-color]`);

wizardFireballWrap.addEventListener(`click`, function () {
  let randColor = getRandElement(FIREBALL_COLORS);

  wizardFireballWrap.style.backgroundColor = randColor;
  wizardFireballColorInput.value = randColor;
});
