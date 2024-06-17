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

    draw(context) {
      context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height,
        this.x, this.y, this.width, this.height);
    }
}

class AerialEnemy extends Enemy {
    constructor(game) {
      super();
      this.game = game;
      this.width = 60;
      this.height = 44;
      this.x = this.game.width + Math.random() * this.game.width * 0.5;
      this.y = Math.random() * this.game.height * 0.5;
      this.speedX = Math.random() + 1;
      this.speedY = 0;
      this.maxFrame = 5;
      this.image = enemyAir;
    }

    update(deltaTime) {
        super.update(deltaTime);
    }
}

class GroundEnemy extends Enemy {
    constructor(game) {
      super();
    }
}

class ClimbingEnemy extends Enemy {
    constructor(game) {
      super();
    }
}
