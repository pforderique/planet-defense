class Button {
  constructor(x, y, text, color, onClick) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.color = color;
    this.onClick = onClick;
    this.width = 80;
    this.height = 30;
  }

  display() {
    rectMode(CENTER);
    fill(this.color);
    rect(this.x, this.y, this.width, this.height, 10);

    fill(0);
    textSize(10);
    textAlign(CENTER);
    text(this.text, this.x, this.y + 4);
  }

  clicked() {
    return (
      between(mouseX, this.x - this.width / 2, this.x + this.width / 2) &&
      between(mouseY, this.y - this.height / 2, this.y + this.height / 2)
    );
  }

  click() {
    return this.onClick();
  }
}
