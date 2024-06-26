/***********
Player Class
***********/

class Player {
  constructor(game) {
      this.game = game;
      this.width = 100;
      this.height = 91.3;
      this.x = 0;
      this.y = this.game.height - this.height - this.game.groundMargin;
      this.vy = 0;
      this.gravity = 1;

      this.image = player;
      this.frameX = 0;
      this.frameY = 0;
      this.maxFrame;
      this.fps = 20;
      this.frameInterval = 1000/this.fps;
      this.frameTimer = 0;
      this.speed = 0;
      this.maxSpeed = 10;

      this.playerStates = [new Sitting(this.game), new Running(this.game),
                           new Jumping(this.game), new Falling(this.game),
                           new Rolling(this.game), new Diving(this.game),
                           new Hit(this.game), new Dizzy(this.game),
                           new Knockout(this.game)];

  }

  update(input, deltaTime) {
    //this.x++;
    this.checkCollision();
    this.currentState.handleInput(input);

    //Horizontal movement
    this.x += this.speed;

    //Prohibits horizontal movement when player is in 'Hit' or 'Dizzy' states
    if(input.includes('ArrowRight') &&
       this.currentState !== this.playerStates[6] &&
       this.currentState !== this.playerStates[7] &&
       this.currentState !== this.playerStates[8]) this.speed = this.maxSpeed;
    else if(input.includes('ArrowLeft') &&
            this.currentState !== this.playerStates[6] &&
            this.currentState !== this.playerStates[7] &&
            this.currentState !== this.playerStates[8]) this.speed = -this.maxSpeed;
            
    else this.speed = 0;

    //Horizontal Boundaries
    if(this.x < 0) this.x = 0;
    if(this.x > this.game.width - this.width) this.x = this.game.width - this.width;

    //vertical movement
    // if(input.includes('ArrowUp') && this.onGround()) this.vy -= 25;
    this.y += this.vy;
    if(!this.onGround()) this.vy += this.gravity;
    else this.vy = 0;

    //Vertical Boundaries
    if(this.y > this.game.height - this.height - this.game.groundMargin) {
        this.y = this.game.height - this.height - this.game.groundMargin;
    }

    //Sprite animation
    if(this.frameTimer > this.frameInterval) {
        this.frameTimer = 0;
        if(this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = 0;
    } else {
        this.frameTimer += deltaTime;
    }

  }

  draw(context) {
    //context.fillRect(this.x, this.y, this.width, this.height);
    if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y,
    this.width, this.height);
  }

  onGround() {
      return this.y >= this.game.height - this.height - this.game.groundMargin;
  }

  setState(playerState, speed) {
      //Make sure all methods that are using setState are passing all expected arguments otherwise it won't work
      this.currentState = this.playerStates[playerState];
      this.game.speed = speed;
      this.currentState.enter();
  }

  checkCollision() {
      this.game.enemies.forEach(enemy => {
          if(enemy.x < this.x + this.width &&
          enemy.x + enemy.width > this.x &&
          enemy.y < this.y + this.height &&
          enemy.y + enemy.height > this.y) {
            //collision detected

            enemy.markedForDeletion = true;
            this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5,
                                                             enemy.y + enemy.height * 0.5));

            if( this.currentState === this.playerStates[4] ||
                this.currentState === this.playerStates[5]) {
                  this.game.score++;
            } else {
                this.setState(6, 0);
                this.game.lives--;

                //Will set gameOver to true in Knockout Class
                //if(this.game.lives <= 0) this.game.gameOver = true;
                if(this.game.lives <= 0) this.setState(8, 0);
            }

          }
          // else {
          //   //no collision
          // }
      });
  }

}
