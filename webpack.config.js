const path = require('path');

module.exports = {
  entry: [
    './js/game.js',
    './js/debounce.js',
    './js/util.js',
    './js/stat.js',
    './js/backend.js',
    './js/dialog.js',
    './js/avatar.js',
    './js/render.js',
    './js/similar-wizards.js',
    './js/move.js'
  ],
  output: {
    'filename': 'bundle.js',
    'path': path.resolve(__dirname),
    'iife': true
  },
  devtool: false
};
