'use strict';


const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const CLOUD_PADDINGS = {
  top: 20,
  left: 25,
  bottom: 20
};

const BAR_WIDTH = 40;
const BAR_HEIGHT = 150;
const BAR_SELF_COLOR = `rgba(255, 0, 0, 1)`;

const GAP = 50;

const FONT_SIZE = 16;


const renderCloud = function (ctx, x, y, cloudColor, shadowColorOrFalse) {
  if (shadowColorOrFalse) {
    ctx.fillStyle = shadowColorOrFalse;
    ctx.fillRect(x + 10, y + 10, CLOUD_WIDTH, CLOUD_HEIGHT);
  }

  ctx.fillStyle = cloudColor;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getMax = function (array) {
  let max = array[0];

  for (let i = 1; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }

  return max;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X, CLOUD_Y, `#fff`, `rgba(0, 0, 0, 0.7)`);

  ctx.font = `${FONT_SIZE}px PT Mono`;
  ctx.fillStyle = `#000`;
  ctx.textBaseline = `hanging`;
  ctx.fillText(`Ура вы победили!`, CLOUD_X + CLOUD_PADDINGS.left, CLOUD_Y + CLOUD_PADDINGS.top);
  ctx.fillText(`Список результатов:`, CLOUD_X + CLOUD_PADDINGS.left, CLOUD_Y + CLOUD_PADDINGS.top + FONT_SIZE);

  ctx.translate(0, window.Game.canvas.height);

  const maxTime = getMax(times);

  for (let i = 0; i < names.length; i++) {
    ctx.fillStyle = `#000`;
    ctx.fillText(
        names[i],
        (CLOUD_X + CLOUD_PADDINGS.left) + ((BAR_WIDTH + GAP) * i),
        -FONT_SIZE - CLOUD_PADDINGS.bottom - 10
    );

    ctx.rotate(-Math.PI / 2);

    let nameBarWidth = (BAR_HEIGHT * times[i]) / maxTime;

    if (names[i] === `Вы`) {
      ctx.fillStyle = BAR_SELF_COLOR;
    } else {
      ctx.fillStyle = `hsl(240, ${Math.round(Math.random() * 100)}%, 50%)`;
    }
    ctx.fillRect(
        CLOUD_PADDINGS.bottom + 40,
        (CLOUD_X + CLOUD_PADDINGS.left) + ((BAR_WIDTH + GAP) * i), nameBarWidth, BAR_WIDTH
    );
    ctx.rotate(Math.PI / 2);
  }
};

