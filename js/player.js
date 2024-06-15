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
  }

  update() {

  }

  draw(context) {
    context.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height)
    context.fillRect(this.x, this.y, this.width, this.height);
    //this.x++;
  }

}
