class Enemy {
    constructor() {
      this.frameX = 0;
      this.frameY = 0;
      this.fps = 20;
      this.frameInterval = 1000/this.fps;
      this.frameTimer = 0;
    }

    update() {

    }

    draw() {

    }
}

class AerialEnemy extends Enemy {
    constructor() {
      super();
    }
}

class GroundEnemy extends Enemy {
    constructor() {
      super();
    }
}

class ClimbingEnemy extends Enemy {
    constructor() {
      super();
    }
}
