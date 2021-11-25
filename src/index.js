import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
  width: 640,
  height: 360,
  antialias: true,
});

document.getElementById('root').appendChild(app.view);

const TRIANGLE_LENGTH = 60;

const downTriangle = new PIXI.Graphics()
  .beginFill(0xff00ff)
  .lineStyle(1, 0xff00ff)
  .lineTo(TRIANGLE_LENGTH, 0)
  .lineTo(TRIANGLE_LENGTH / 2, TRIANGLE_LENGTH)
  .lineTo(0, 0)
  .endFill();

app.stage.addChild(downTriangle);

function update() {
  downTriangle.position.y += 5;

  app.render(app.stage);

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
