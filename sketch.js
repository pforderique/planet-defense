/**
 * Planet Defense
 */

const SIZE = 600;
const MAX_METEORS = 5;
const METEOR_SPAWN_SPEED = 3000;
const ROCKET_SPAWN_SPEED = 500;

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
  launcher = new RocketLauncher(height - 100);
  meteors = new Set([createNewMeteor()]);
  meteor_timer = millis();
  rocket_timer = millis();
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

  // create a new rocket every now and then
  if (millis() - rocket_timer >= ROCKET_SPAWN_SPEED) {
    launcher.shoot();
    rocket_timer = millis();
  }

  // create a new meteor every now and then
  if (
    meteors.size < MAX_METEORS &&
    millis() - meteor_timer >= METEOR_SPAWN_SPEED
  ) {
    meteors.add(createNewMeteor());
    meteor_timer = millis();
  }

  // update meteor, check collisions, and display
  for (const meteor of meteors) {
    meteor.update();

    // check meteor on rocket collisions
    for (const rocket of launcher.rockets) {
      if (meteor.collidesWith(rocket)) {
        if (launcher.destroyRocket(rocket) && meteor.decreaseSize() === 0) {
          meteors.delete(meteor);
        }
      }
    }

    // check meteor on planet collisions
    if (meteor.collidesWith(planet)) {
      meteors.delete(meteor);

      // check if this collision causes game to be over
      if (planet.getHit(meteor) === 0) return true;
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
