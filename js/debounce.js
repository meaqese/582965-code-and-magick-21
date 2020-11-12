'use strict';

(function () {
  const DEBOUNCE_INTERVAL = 500;

  window.debounce = function (callback) {
    let lastTimeout = null;

    return function (...params) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = setTimeout(function () {
        callback(...params);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
