class Rocket extends CircleObject {
  constructor(y) {
    super(width / 2, y, 5, color(200));
    this.target = { x: mouseX, y: mouseY };
    this.speed = 3;

    this.mag = dist(this.x, this.y, this.target.x, this.target.y);
    this.xdiff = this.target.x - this.x;
    this.ydiff = this.target.y - this.y;
  }

  update() {
    // move in the normal direction times the speed multiplier
    this.x += this.speed * (this.xdiff / this.mag);
    this.y += this.speed * (this.ydiff / this.mag);
  }
}
