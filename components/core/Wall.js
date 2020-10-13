class Wall {
  
  constructor(startX, startY, endA, horizontal = true) {
    this.x1 = startX;
    this.y1 = startY;
    this.a = endA;
    this.horizontal = horizontal;
    if (this.horizontal) {
      this.x2 = this.a;
      this.y2 = this.y1;
    } else {
      this.y2 = this.a;
      this.x2 = this.x1;
    }
  }
  
  isHorizontal() {
    return this.horizontal;
  }
  
  getStartingPoint() {
    return createVector(this.x1, this.y1);
  }
  getEndingPoint() {
    return createVector(this.x2, this.y2);
  }
  
  getX() {
    return this.x1;
  }
  
  getY() {
    return this.y2;
  }
  getLength() {
    if (this.isHorizontal()) {
      return abs(this.x2 - this.x1);
    } else {
      return this.y2 - this.y1;
    }
  }
  
  draw() {
    stroke(0);
    line(this.x1, this.y1, this.x2, this.y2);
  }
  
}