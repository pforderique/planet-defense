/**
 * Planet Defense
 */

const SIZE = 600;
const MAX_METEORS = 5;
const SPAWN_SPEED = 5000;

const states = {
  HOME: 1,
  PLAY: 2,
  PAUSE: 3,
  END: 4,
};

let state;
let planet;
let launcher;
let meteors;
let meteor_timer;
let rocket_timer;

function setup() {
  createCanvas(SIZE, SIZE);
  state = states.PLAY;
  planet = new Planet(width / 2, 1.85 * height, width);
  launcher = new RocketLauncher(height - 110);
  meteors = new Set([createNewMeteor()]);
  meteor_timer = millis();
}

function draw() {
  gameFsm(); // have another in mouseClicked for transitioning to PAUSE
}

function gameFsm() {
  switch (state) {
    case states.PLAY:
      if (playLoop()) state = states.END;
      break;

    case states.END:
      drawEndScreen();
      break;
  }
}

function playLoop() {
  background(0);

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

      // check if this collision causes game to be over
      if (planet.getHit(meteor) === 0) {
        return true;
      }
    } else {
      meteor.display();
    }
  }

  planet.display();
  planet.update();

  // show health bar here!
  displayHealth(planet);

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

function drawEndScreen() {
  fill(color(90, 190, 220, 0.9));
  rectMode(CENTER);
  rect(width / 2, height / 2, 500, 500, 20);
}

function displayHealth(planet) {
  const RECT_WIDTH = 150;
  const HEALTH_WIDTH = (planet.health / planet.maxhealth) * RECT_WIDTH;

  rectMode(CORNER);
  fill(200);
  rect(width - RECT_WIDTH - 20, 20, RECT_WIDTH, 10);

  fill(color(200, 30, 40));
  rect(width - RECT_WIDTH - 20, 20, HEALTH_WIDTH, 10);
}
