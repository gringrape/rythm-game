import * as PIXI from 'pixi.js';
import { sound } from '@pixi/sound';

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

const LINE_POSITION_Y = APP_SIZE.height * 0.7;
const bottomLine = new PIXI.Graphics()
  .beginFill(0x00ffff)
  .lineStyle(5, 0x00ffff)
  .moveTo(0, LINE_POSITION_Y)
  .lineTo(APP_SIZE.width, LINE_POSITION_Y)
  .endFill();
app.stage.addChildAt(bottomLine);

const miSound = sound.add('bgm', '/mi_sound.mp3');

function intersect() {
  return LINE_POSITION_Y > downTriangle.y && LINE_POSITION_Y < downTriangle.y + TRIANGLE_LENGTH;
}

window.addEventListener('keydown', (e) => {
  const { key } = e;

  if (key === 'ArrowDown') {
    miSound.play();
  }

  if (key === 'ArrowDown' && intersect()) {
    app.stage.removeChild(downTriangle);
  }
});

function update() {
  downTriangle.position.y += 5;

  app.render(app.stage);

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
