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

let MODE;
let MAX_METEORS;
let METEOR_SPAWN_SPEED;
let ROCKET_SPAWN_SPEED;
const INCREASE_DIFFICULTY_RATE = 30 * 1000; // 30s

const states = {
  TITLE: 1,
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
let gamemodeButtons = [];

function setup() {
  SIZE = min(600, window.innerWidth);
  textFont("cursive");
  createCanvas(SIZE, SIZE);
  state = states.TITLE;

  // create the game mode buttons
  let texts = ["Easy", "Medium", "Hard", "Impossible"];
  let callbacks = [
    () => {
      MODE = modes.EASY;
    },
    () => {
      MODE = modes.MEDIUM;
    },
    () => {
      MODE = modes.HARD;
    },
    () => {
      MODE = modes.IMPOSSIBLE;
    },
  ];
  for (let i = 1; i < 5; i++) {
    gamemodeButtons.push(
      new Button(
        (i * width) / 5,
        width / 2,
        texts[i - 1],
        color(86, 131, 153),
        callbacks[i - 1]
      )
    );
  }
}

function draw() {
  gameFsm();
}

function gameFsm() {
  switch (state) {
    case states.TITLE:
      drawTitleScreen(gamemodeButtons);
      break;

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
  // console.log(MODE.meteorSpawnSpeed);

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
    case states.TITLE:
      for (const button of gamemodeButtons) {
        // console.log(button.clicked());
        if (button.clicked()) {
          console.log(`button clicked: ${button.text}`);
          state = states.PLAY;
          button.click();
          resetGame();
        }
      }
      break;

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
