/**
 * Planet Defense
 */

const SIZE = 600;
const MAX_METEORS = 5;
const SPAWN_SPEED = 5000;

let planet;
let meteors;
let gametimer;

function setup() {
  createCanvas(SIZE, SIZE);
  planet = new Planet(width / 2, 1.85 * height, width);
  meteors = new Set([createNewMeteor()]);
  gametimer = millis();
}

function draw() {
  background(0);
  planet.display();

  // create a new meteor every now and then
  if (meteors.size < MAX_METEORS && millis() - gametimer >= SPAWN_SPEED) {
    meteors.add(createNewMeteor());
    gametimer = millis();
  }

  for (const meteor of meteors) {
    meteor.update();
    meteor.display();
  }
}

function createNewMeteor() {
  const radius = random(3, 40);
  const SIDEBUFFER = 100;

  const x = random(-SIDEBUFFER, width + SIDEBUFFER);
  const y = -radius;

  return new Meteor(x, y, radius);
}
