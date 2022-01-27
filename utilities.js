function randChoice(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function createNewMeteor() {
  const radius = random(10, 40);
  const SIDEBUFFER = 100;

  const x = random(-SIDEBUFFER, width + SIDEBUFFER);
  const y = -radius;

  return new Meteor(x, y, radius);
}

function drawPauseScreen() {
  fill(color(90, 100, 120, 50));
  rectMode(CENTER);
  rect(width / 2, height / 2, 400, 400, 20);

  fill(255);
  textAlign(CENTER);
  textSize(30);
  text("PAUSED", width / 2, 200);
  textSize(20);
  text("Click anywhere to resume", width / 2, height - 200);
}

function drawEndScreen(score) {
  fill(color(90, 100, 120, 50));
  rectMode(CENTER);
  rect(width / 2, height / 2, 500, 500, 20);

  fill(255);
  textAlign(CENTER);
  textSize(30);
  text("GAME OVER", width / 2, 200);
  textSize(20);
  text(`Final Score: ${score}`, width / 2, 250);

  text("Click anywhere to play again", width / 2, height - 100);
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

function displayScore(score) {
  fill(255);
  textSize(20);
  text(`Score: ${score}`, 10, 30);
}
