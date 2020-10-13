class Player {
  constructor(pos, size, color_R, color_G, color_B) {
    this.pos = pos;
    this.size = size;
    this.color_R = color_R;
    this.color_G = color_G;
    this.color_B = color_B;
    this.quick = false;
  }

  move(dir, walls) {
    var speed = 0;
    if (this.quick == true)
      speed = 2;
    else
      speed = 1;

    if (this.crashCheck(dir, walls))
      this.pos.add(dir);
  }

  //   moveX(right, walls) {
  //     var speed = 0;
  //     if (this.quick == true) 
  //       speed = 2;
  //     else
  //       speed = 1;

  //     if (right === true) {
  //       if (this.crashCheck(speed, 0, walls))
  //         this.x += speed;
  //     } else {
  //       if (this.crashCheck(-speed, 0, walls))
  //         this.x -= speed;
  //     }
  //   }
  //   moveY(down, walls) {
  //     var speed = 0;
  //     if (this.quick == true) 
  //       speed = 2;
  //     else
  //       speed = 1;

  //     if (down === true) {
  //       if (this.crashCheck(0, speed, walls))
  //         this.y += speed;
  //     } else {
  //       if (this.crashCheck(0, -speed, walls))
  //         this.y -= speed;
  //     }
  //   }

  update(walls) {
    var speed = int(this.quick) + 1;
    var dir = createVector(0, 0);
    if (keyIsDown(39)) {
      dir.set(speed, dir.y);
      this.move(dir, walls);
    } else if (keyIsDown(38)) {
      dir.set(dir.x, -speed);
      this.move(dir, walls);
    } else if (keyIsDown(37)) {
      dir.set(-speed, dir.y);
      this.move(dir, walls);
    } else if (keyIsDown(40)) {
      dir.set(dir.x, speed);
      this.move(dir, walls);
    }
    if (keyIsDown(17)) {
      this.quick = true;
    } else {
      this.quick = false;
    }
  }

  draw() {
    stroke(0);
    fill(color(this.color_R, this.color_G, this.color_B));
    circle(this.pos.x, this.pos.y, this.size);
    noFill();
  }

  crashCheck(dir, walls) {
    var boundriesCheck = this.checkBoundries(dir);
    var wallsCheck = this.checkWalls(dir, walls);
    console.log(wallsCheck);
    return (boundriesCheck && wallsCheck);
  }

  checkBoundries(dir) {
    var center = this.pos;
    var top = center.y - this.size / 2;
    var left = center.x - this.size / 2;
    var right = left + this.size;
    var bott = top + this.size;
    /* TODO: Check if circle's bounds would be out of screen bounds. return false if not, otherwise true. - DONE */
    if (

      left + dir.x < 0 ||
      right + dir.x > width ||
      top + dir.y < 0 ||
      bott + dir.y > height
    )
      return false;
    else
      return true;
  }

  //   checkWalls(dir, walls) {
  //     var noCrash = true;
  //     for (var i = 0; i < walls.length; i++) {
  //       if (!walls[i].isHorizontal()) {
  //         const x1 = walls[i].getX();
  //         const y1 = walls[i].getY();
  //         const y2 = walls[i].getY()+walls[i].getLength();
  //         const x2 = walls[i].getX()+walls[i].getLength();

  //         const x3 = this.pos.x;
  //         const y3 = this.pos.y;
  //         const x4 = this.pos.x + dir.x;
  //         const y4 = this.pos.y + dir.y;
  //         const x5 = this.pos.x + this.size/2;
  //         const y5 = this.pos.y + this.size/2;
  //         const x6 = this.pos.x - this.size/2;
  //         const y6 = this.pos.y - this.size/2;


  //         const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  //         if (den == 0) {
  //           continue;
  //         }

  //         const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
  //         const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
  //           const pt1 = createVector();
  //           pt1.x = x1 + t * (x2 - x1);
  //           pt1.y = y1 + t * (y2 - y1);
  //           DevelopmentTools.debugExtra("Wall " + i);
  //           DevelopmentTools.debugExtra("pt1.x: " + pt1.x);
  //           DevelopmentTools.debugExtra("pt1.y: " + pt1.y);
  //           DevelopmentTools.debugExtra("dist1: " + dist(pt1.x, pt1.y, x5, y5) + " <0:" + (dist(pt1.x, pt1.y, x5, y5) < 0));
  //           DevelopmentTools.debugExtra("dist2: " + dist(pt1.x, pt1.y, x6, y6) + "< 0:" + (dist(pt1.x, pt1.y, x6, y6) < 0));
  //         if (t > 0 && t < 1 && u > 0) {
  //           const pt = createVector();
  //           pt.x = x1 + t * (x2 - x1);
  //           pt.y = y1 + t * (y2 - y1);
  //           DevelopmentTools.debugExtra("pt.x: " + pt.x);
  //           DevelopmentTools.debugExtra("pt.y: " + pt.y);
  //           DevelopmentTools.debugExtra("dist1: " + dist(pt.x, pt.y, x5, y5) + " <0:" + (dist(pt.x, pt.y, x5, y5) < 0));
  //           DevelopmentTools.debugExtra("dist2: " + dist(pt.x, pt.y, x6, y6) + "< 0:" + (dist(pt.x, pt.y, x6, y6) < 0));
  //           if ((dist(pt.x, pt.y, x3, y3) < this.size/2) || (dist(pt.x, pt.y, x3, y3) < + this.size/2))
  //             noCrash = false;
  //         }
  //       }
  //     }
  //     return noCrash;     
  //   }

  checkWalls(dir, walls) {
    var center = this.pos;
    var top = center.y - this.size / 2;
    var left = center.x - this.size / 2;
    var right = left + this.size;
    var bott = top + this.size;
    var noCrash = true;
    for (var i = 0; i < walls.length; i++) {
      //var noCrash = true;
      var wallX = walls[i].getX();
      var wallY = walls[i].getY();
      var wallLength = walls[i].getLength();
      if (!walls[i].isHorizontal()) {

        if (dir.x < 0) { // if going left
          /*console.log("check1: " + (this.pos.x - this.size/2 + dir.x == walls[i].getX() || this.pos.x - this.size/2 + dir.x == walls[i].getX()));
          sad... */
          DevelopmentTools.debugExtra("dir.x" + dir.x);
          DevelopmentTools.debugExtra((left + dir.x === wallX));
          DevelopmentTools.debugExtra((left + dir.x === wallX-1));
          DevelopmentTools.debugExtra((left + dir.x === wallX+1));
          if (
            left + dir.x === wallX ||
            left + dir.x === wallX + 1 ||
            left + dir.x === wallX - 1
          ) {// If the left side ± the x axis of dir vector is equal to x (-1) coord of wall
            alert("WORK!")
            DevelopmentTools.debugExtra("1st Eval = " + true);
            DevelopmentTools.debugExtra((top > wallY &&
                top < wallY + wallLength));
            if ((
                top > wallY &&
                top < wallY + wallLength
              ) || (
                bott > wallY &&
                bott < wallY + wallLength
              )) {
              DevelopmentTools.debugExtra("2st Eval = " + true);
              noCrash = false;
            }
          }
        } else if (dir.x > 0) // else if going right
          if (
            right + dir.x == wallX ||
            right + dir.x == wallX + 1 ||
            right + dir.x == wallX - 1
          )
            if ((top > wallY &&
                top < wallY + wallLength) ||
              (bott > wallY &&
                bott < wallY + wallLength))
              noCrash = false;
      } else { // if wall goes horizontal
        if (dir.y < 0) { // if going up
          DevelopmentTools.debugExtra("dir.y: " + dir.y);
          if (
            top + dir.y == wallY ||
            top + dir.y == wallY + 1 ||
            top + dir.y == wallY - 1
          )
            if ((left > wallX &&
                left < wallX + wallLength) ||
              (right > wallX &&
                right < wallX + wallLength))
              noCrash = false;
        } else if (dir.y > 0) { // else if going down
          //background(0);
          //DevelopmentTools.debugExtra("dir.y:" + dir.y)
          if (
            bott + dir.y == wallY ||
            bott + dir.y == wallY - 1 ||
            bott + dir.y == wallY + 1
          ) {
            //DevelopmentTools.debugExtra("1st Eval = " + true);
            if ((left > wallX &&
                left < wallX + wallLength) ||
              (right > wallX &&
                right < wallX + wallLength)) {
              //DevelopmentTools.debugExtra("2nd Eval = " + true);
              noCrash = false;
            }
          }
        }
      }
      //if (noCrash == false)
        //return false
    }
    return noCrash;
  }
}