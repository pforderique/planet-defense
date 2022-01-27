class CircleObject {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  /**
   *
   * @param {CicleObject} other
   */
  collidesWith(other) {
    const d = dist(this.x, this.y, other.x, other.y);
    return d <= this.radius + other.radius;
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.radius * 2);
  }
}
e;
