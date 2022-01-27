let planet;

function setup() {
  createCanvas(600, 600);
  planet = new Planet(40, 40, 100);
}

function draw() {
  background(0);
  planet.display();
}
