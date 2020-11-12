'use strict';

(function () {
  const COLOR = {
    coat: [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`],
    eyes: [`black`, `red`, `blue`, `yellow`, `green`],
    fireball: [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`]
  };

  let wizards = [];
  let coatColor = `rgb(101, 137, 164)`;
  let eyesColor = `black`;

  const getRank = function (wizard) {
    let rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  const namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  const updateWizards = function () {
    const sortedWizards = wizards.sort(function (a, b) {
      let rankDiff = getRank(b) - getRank(a);
      if (rankDiff === 0) {
        rankDiff = namesComparator(a.name, b.name);
      }
      return rankDiff;
    });

    window.render(sortedWizards);
  };

  const onCoatChange = window.debounce(updateWizards);
  const onEyesChange = window.debounce(updateWizards);

  const setupWizardAppearance = document.querySelector(`.setup-wizard-appearance`);
  const setupWizard = setupWizardAppearance.querySelector(`.setup-wizard`);

  const wizardCoat = setupWizard.querySelector(`.wizard-coat`);
  const wizardCoatColorInput = setupWizardAppearance.querySelector(`[name=coat-color]`);
  wizardCoat.addEventListener(`click`, function () {
    let randColor = window.util.getRandElement(COLOR.coat);

    wizardCoat.style.fill = randColor;
    wizardCoatColorInput.value = randColor;

    coatColor = randColor;

    onCoatChange();
  });

  const wizardEyes = setupWizard.querySelector(`.wizard-eyes`);
  const wizardEyesColorInput = setupWizardAppearance.querySelector(`[name=eyes-color]`);
  wizardEyes.addEventListener(`click`, function () {
    let randColor = window.util.getRandElement(COLOR.eyes);

    wizardEyes.style.fill = randColor;
    wizardEyesColorInput.value = randColor;

    eyesColor = randColor;

    onEyesChange();
  });

  const wizardFireballWrap = document.querySelector(`.setup-fireball-wrap`);
  const wizardFireballColorInput = wizardFireballWrap.querySelector(`[name=fireball-color]`);
  wizardFireballWrap.addEventListener(`click`, function () {
    let randColor = window.util.getRandElement(COLOR.fireball);

    wizardFireballWrap.style.backgroundColor = randColor;
    wizardFireballColorInput.value = randColor;
  });

  const successHandler = function (data) {
    wizards = data;

    updateWizards();
  };

  window.backend.load(successHandler, window.util.createErrorMessage);
})();
