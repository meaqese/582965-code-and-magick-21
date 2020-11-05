'use strict';

(function () {
  const getRandRange = function (min, max) {
    return Math.round(min + (Math.random() * (max - min)));
  };

  const getRandElement = function (array, inclusive = false) {
    const max = (inclusive === false) ? array.length - 1 : array.length;
    return array[getRandRange(0, max)];
  };

  window.util = {
    getRandRange,
    getRandElement,
  };
})();
