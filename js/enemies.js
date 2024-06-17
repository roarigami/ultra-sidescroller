class Enemy {
    constructor() {
      this.frameX = 0;
      this.frameY = 0;
      this.fps = 20;
      this.frameInterval = 1000/this.fps;
      this.frameTimer = 0;
    }

    update(deltaTime) {
        //Movement
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;
        if(this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
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
