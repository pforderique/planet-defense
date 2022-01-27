class Planet extends CircleObject {
  constructor(x, y, radius) {
    super(x, y, radius);
    this.PURPLE = color(90, 92, 184);
    this.RED = color(255, 20, 25);
    this.color = this.PURPLE;
    this.showRedForFrames = 5;
    this.counter = 0;
    this.maxhealth = 100;
    this.health = this.maxhealth;
  }

  update() {
    if (this.color === this.RED && this.counter < this.showRedForFrames) {
      this.counter += 1;
    } else {
      this.counter = 0;
      this.color = this.PURPLE;
    }
  }

  getHit(meteor) {
    this.color = this.RED;
    this.health = max(this.health - meteor.radius, 0);
    return this.health;
  }
}
