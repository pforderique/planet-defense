class CircleObject {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  /**
   *
   * @param {CircleObject} other
   */
  collidesWith(other) {
    const d = dist(this.x, this.y, other.x, other.y);
    return d <= this.radius + other.radius;
  }

  outOfBounds() {
    return (
      this.x + this.radius <= 0 ||
      this.x - this.radius >= width ||
      this.y + this.radius <= 0 ||
      this.y - this.radius >= height
    );
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.radius * 2);
  }
}
