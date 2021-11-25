import * as PIXI from 'pixi.js';
import { sound } from '@pixi/sound';

// TODO: delete this
console.log('what!!!?');

const APP_SIZE = {
  width: 640,
  height: 360,
};

const app = new PIXI.Application({
  width: APP_SIZE.width,
  height: APP_SIZE.height,
  antialias: true,
});

document.getElementById('root').appendChild(app.view);

const TRIANGLE_LENGTH = 60;
const downTriangle = new PIXI.Graphics()
  .beginFill(0xff00ff)
  .lineStyle(1, 0xff00ff)
  .moveTo(APP_SIZE.width / 2 - TRIANGLE_LENGTH / 2, 0)
  .lineTo(APP_SIZE.width / 2 + TRIANGLE_LENGTH / 2, 0)
  .lineTo(APP_SIZE.width / 2, TRIANGLE_LENGTH)
  .lineTo(APP_SIZE.width / 2 - TRIANGLE_LENGTH / 2, 0)
  .endFill();
app.stage.addChild(downTriangle);

const leftTriangle = new PIXI.Graphics()
  .beginFill(0xff00ff)
  .lineStyle(1, 0xff00ff)
  .moveTo(APP_SIZE.width / 2 - TRIANGLE_LENGTH / 2, TRIANGLE_LENGTH / 2)
  .lineTo(APP_SIZE.width / 2 + TRIANGLE_LENGTH / 2, 0)
  .lineTo(APP_SIZE.width / 2 + TRIANGLE_LENGTH / 2, TRIANGLE_LENGTH)
  .lineTo(APP_SIZE.width / 2 - TRIANGLE_LENGTH / 2, TRIANGLE_LENGTH / 2)
  .endFill();
app.stage.addChild(leftTriangle);

const rightTriangle = new PIXI.Graphics()
  .beginFill(0xff00ff)
  .lineStyle(1, 0xff00ff)
  .moveTo(APP_SIZE.width / 2 - TRIANGLE_LENGTH / 2, 0)
  .lineTo(APP_SIZE.width / 2 + TRIANGLE_LENGTH / 2, TRIANGLE_LENGTH / 2)
  .lineTo(APP_SIZE.width / 2 - TRIANGLE_LENGTH / 2, TRIANGLE_LENGTH)
  .lineTo(APP_SIZE.width / 2 - TRIANGLE_LENGTH / 2, 0)
  .endFill();
app.stage.addChild(rightTriangle);

const LINE_POSITION_Y = APP_SIZE.height * 0.7;
const bottomLine = new PIXI.Graphics()
  .beginFill(0x00ffff)
  .lineStyle(5, 0x00ffff)
  .moveTo(0, LINE_POSITION_Y)
  .lineTo(APP_SIZE.width, LINE_POSITION_Y)
  .endFill();
app.stage.addChildAt(bottomLine);

// Fix path
const miSound = sound.add('mi', '/rythm-game/mi_sound.mp3');
const reSound = sound.add('re', '/rythm-game/re_sound.mp3');
const doSound = sound.add('do', '/rythm-game/do_sound.mp3');

function intersect(figure) {
  return LINE_POSITION_Y > figure.y && LINE_POSITION_Y < figure.y + TRIANGLE_LENGTH;
}

window.addEventListener('keydown', (e) => {
  const { key } = e;

  if (key === 'ArrowDown') {
    reSound.play();
  }

  if (key === 'ArrowLeft') {
    doSound.play();
  }

  if (key === 'ArrowRight') {
    miSound.play();
  }

  if (key === 'ArrowDown' && intersect(downTriangle)) {
    app.stage.removeChild(downTriangle);
  }

  if (key === 'ArrowLeft' && intersect(leftTriangle)) {
    app.stage.removeChild(leftTriangle);
  }

  if (key === 'ArrowRight' && intersect(rightTriangle)) {
    app.stage.removeChild(rightTriangle);
  }
});

function initializeNotes() {
  leftTriangle.position.y = -250;
  downTriangle.position.y = -150;
  rightTriangle.position.y = 0;
}

initializeNotes();

function update() {
  rightTriangle.position.y += 5;
  downTriangle.position.y += 5;
  leftTriangle.position.y += 5;

  app.render(app.stage);

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
