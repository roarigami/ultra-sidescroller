/***********
Player Class
***********/

class Player {
  constructor(game) {
      this.game = game;
      this.width = 100;
      this.height = 91.3;
      this.x = 0;
      this.y = this.game.height - this.height;
      this.vy = 0;
      this.gravity = 1;

      this.image = player;
      this.frameX = 0;
      this.frameY = 0;
      this.speed = 0;
      this.maxSpeed = 10;

      this.playerStates = [new Sitting(this.game), new Running(this.game)];
      
  }

  update(input) {
    //this.x++;
    this.currentState.handleInput(input);

    //Horizontal movement
    this.x += this.speed;

    if(input.includes('ArrowRight')) this.speed = this.maxSpeed;
    else if(input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
    else this.speed = 0;
    if(this.x < 0) this.x = 0;
    if(this.x > this.game.width - this.width) this.x = this.game.width - this.width;

    //vertical movement
    if(input.includes('ArrowUp') && this.isOnGround()) this.vy -= 25;
    this.y += this.vy;
    if(!this.isOnGround()) this.vy += this.gravity;
    else this.vy = 0;

  }

  draw(context) {
    //context.fillRect(this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y,
    this.width, this.height);
  }

  isOnGround() {
      return this.y >= this.game.height - this.height;
  }

  setState(playerState) {
      //Make sure all methods that are using setState are passing all expected arguments otherwise it won't work
      this.currentState = this.playerStates[playerState];
      this.currentState.enter();
  }

}
