/***********
Player Class
***********/

class Player {
  constructor(game) {
      this.game = game;
      this.width = 100;
      this.height = 91.3;
      this.x = 0;
      this.y = 100;
  }

  update() {

  }

  draw(context) {
    context.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height)
    context.fillRect(this.x, 50, 25, 25);
    this.x++;
  }

}
