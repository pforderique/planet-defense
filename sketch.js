/**
 * Planet Defense
 */

const SIZE = 600;
const MAX_METEORS = 5;
const SPAWN_SPEED = 5000;

let planet;
let launcher;
let meteors;
let meteor_timer;
let rocket_timer;

function setup() {
  createCanvas(SIZE, SIZE);
  planet = new Planet(width / 2, 1.85 * height, width);
  launcher = new RocketLauncher(height - 110);
  meteors = new Set([createNewMeteor()]);
  meteor_timer = millis();
}

function draw() {
  background(0);

  planet.display();
  planet.update();

  // create a new meteor every now and then
  if (meteors.size < MAX_METEORS && millis() - meteor_timer >= SPAWN_SPEED) {
    meteors.add(createNewMeteor());
    meteor_timer = millis();
  }

  // update meteor, check collisions, and display
  for (const meteor of meteors) {
    meteor.update();
    if (meteor.collidesWith(planet)) {
      meteors.delete(meteor);
      planet.getHit(meteor);
    } else {
      meteor.display();
    }
  }

  launcher.update();
  launcher.display();
}

function createNewMeteor() {
  const radius = random(3, 40);
  const SIDEBUFFER = 100;

  const x = random(-SIDEBUFFER, width + SIDEBUFFER);
  const y = -radius;

  return new Meteor(x, y, radius);
}
