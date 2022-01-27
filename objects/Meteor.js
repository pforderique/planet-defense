class Meteor extends CircleObject {
  constructor(x, y, radius) {
    super(x, y, radius, color(140, 75, 31));

    // randomly select from three targets
    const targets = [
      { x: width / 4, y: height },
      { x: width / 2, y: height },
      { x: (3 * width) / 4, y: height },
    ];
    this.minSize = 10;
    this.target = randChoice(targets);
    this.speed = 1;
  }

  decreaseSize() {
    const sizeDecrease = 5;
    if (this.radius - sizeDecrease <= this.minSize) return 0;

    this.radius = max(this.radius - sizeDecrease, 0);
    return this.radius;
  }

  update() {
    const mag = dist(this.x, this.y, this.target.x, this.target.y);
    const xdiff = this.target.x - this.x;
    const ydiff = this.target.y - this.y;

    // move in the normal direction times the speed multiplier
    this.x += this.speed * (xdiff / mag);
    this.y += this.speed * (ydiff / mag);
  }
}
