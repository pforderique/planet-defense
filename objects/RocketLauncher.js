class RocketLauncher {
  constructor(y) {
    this.x = width / 2;
    this.y = y;
    this.color = color(255);
    this.rockets = new Set([new Rocket(this.y - 6)]);
    this.TOP_THRESHOLD = 0.75 * height;
  }

  shoot() {
    let rocket = new Rocket(this.y - 6);
    this.rockets.add(rocket);
  }

  destroyRocket(rocket) {
    return this.rockets.delete(rocket);
  }

  update() {
    for (const rocket of this.rockets) {
      if (rocket.outOfBounds()) this.rockets.delete(rocket);
      else rocket.update();
    }
  }

  display() {
    for (const rocket of this.rockets) {
      rocket.display();
    }
    // if (mouseY > this.TOP_THRESHOLD) return;
    // const xdiff = mouseX - this.x;
    // const ydiff = mouseY - this.y;
    // const angle = Math.atan(ydiff / xdiff);
    // push();
    // // translate(width/2, height/2);
    // rotate(angle)
    fill(this.color);
    rectMode(CENTER);
    rect(this.x, this.y, 12, 30);
    // // translate(-this.x, -this.y);
    // pop();
  }
}
