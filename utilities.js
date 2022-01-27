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
