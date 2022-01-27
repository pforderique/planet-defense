/**
 * Planet Defense
 */

const modes = {
  EASY: {
    maxMeteors: 3,
    meteorSpawnSpeed: 3000,
    rocketSpawnSpeed: 400,
  },
  MEDIUM: {
    maxMeteors: 5,
    meteorSpawnSpeed: 2000,
    rocketSpawnSpeed: 200,
  },
  HARD: {
    maxMeteors: 7,
    meteorSpawnSpeed: 1000,
    rocketSpawnSpeed: 200,
  },
  IMPOSSIBLE: {
    maxMeteors: 10,
    meteorSpawnSpeed: 500,
    rocketSpawnSpeed: 200,
  },
};

const MODE = modes.MEDIUM;
const INCREASE_DIFFICULTY_RATE = 30 * 1000; // 30s
let MAX_METEORS = MODE.maxMeteors;
let METEOR_SPAWN_SPEED = MODE.meteorSpawnSpeed;
let ROCKET_SPAWN_SPEED = MODE.rocketSpawnSpeed;

const states = {
  HOME: 1,
  PLAY: 2,
  PAUSE: 3,
  END: 4,
};

let SIZE;
let state;
let planet;
let launcher;
let meteors;
let game_timer;
let meteor_timer;
let rocket_timer;
let score;

function setup() {
  SIZE = min(600, window.innerWidth);
  createCanvas(SIZE, SIZE);
  state = states.PLAY;
  resetGame();
}

function draw() {
  gameFsm();
}

function gameFsm() {
  switch (state) {
    case states.PLAY:
      if (playLoop()) state = states.END;
      break;

    case states.PAUSE:
      drawPauseScreen();
      break;

    case states.END:
      drawEndScreen(score);
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
          score += 1;
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

  displayHealth(planet);
  displayScore(score);

  launcher.update();
  launcher.display();

  // increase meteor speed and/or spawn rate
  if (millis() - game_timer >= INCREASE_DIFFICULTY_RATE) {
    METEOR_SPAWN_SPEED = max(METEOR_SPAWN_SPEED - 200, 300);
  }
}

function mouseClicked() {
  switch (state) {
    case states.PAUSE:
      state = states.PLAY;
      break;

    case states.END:
      resetGame();
      state = states.PLAY;
      break;
  }
}

function doubleClicked() {
  switch (state) {
    case states.PLAY:
      state = states.PAUSE;
      break;
  }
}

function resetGame() {
  MAX_METEORS = MODE.maxMeteors;
  METEOR_SPAWN_SPEED = MODE.meteorSpawnSpeed;
  ROCKET_SPAWN_SPEED = MODE.rocketSpawnSpeed;
  planet = new Planet(width / 2, 1.85 * height, width);
  launcher = new RocketLauncher(height - 100);
  meteors = new Set([createNewMeteor()]);

  game_timer = millis();
  meteor_timer = millis();
  rocket_timer = millis();
  score = 0;
}
