function getRandomSize(){
  return constrain(pow(random(0, 1), 5) * 36, 2, 36);

  //return constrain(pow(randomGaussian() * 2, 2), 2, 36);

  //while (true){
  //  let r1 = random(1);
  //  let r2 = random(1);
  //  if (r2 > r1) {
  //    return (r1 * 36);
  //  }
  //}
}


class Snowflake {

  constructor(sx, sy) {
    let x = sx || random(width);
    let y = sy || random(-100, -10);
    this.pos = createVector(x, y);
    this.vel = createVector(0, 5);
    this.acc = createVector();
    this.r = getRandomSize();
    this.angle = random(TWO_PI);
    this.xOff = 0;
  }

  randomize(){
    let x = random(width);
    let y = random(-100, -10);
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector();
    this.r = getRandomSize();
  }
  applyForce(force) {
    let f = force.copy();
    f.mult(this.r);

    //let f = force.copy();
    //f.dev(this.mass);
    this.acc.add(f);
  }

  update() {
    this.xOff = sin(this.angle * 2) * 2 * this.r;

    this.vel.add(this.acc);
    this.vel.limit(this.r * 0.2);
    if (this.vel.mag() < 1 ){
      this.vel.normalize();
    }
    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.pos.y > height + this.r) {
      this.randomize();
    }

    // Wrapping Left and Right
    if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    }

    this.angle += this.dir * this.vel.mag() / 200;
  }
  render() {
    stroke(153, 0, 0);
    strokeWeight(this.r);
    point(this.pos.x, this.pos.y);
    point(this.pos.x+this.r, this.pos.y);
    noStroke();
    fill(153, 0, 0);
    triangle(this.pos.x-this.r * 0.5, this.pos.y,
             this.pos.x+(1.5*this.r), this.pos.y,
             this.pos.x+this.r * 0.5, this.pos.y+this.r * 1.3);
  }

  //offScreen() {
  //  return (this.pos.y > height + this.r);
  //}
}
