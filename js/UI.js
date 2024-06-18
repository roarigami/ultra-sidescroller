class UserInterface {
  constructor(game) {
      this.game = game;
      this.fontSize = 30;
      this.fontFamily = 'Frijole';
      this.livesImage = lifeSprite;
  }
  draw(context) {
    context.save();

    //Font Shadow
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = 'white';
    context.shadowBlur = 0;

    context.font = this.fontSize + 'px ' + this.fontFamily;
    context.textAlign = 'left';
    context.fillStyle = this.game.fontColor;
    context.fillText('Score: ' + this.game.score, 20, 50);

    //Game Lives
    for(let i = 0; i < this.game.lives; i++) {
        context.drawImage(this.livesImage, 25 * i + 20, 95, 25, 25);
    }


    // //Game Timer
    // context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
    // context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80);
    //
    //Game Over Messages
    if(this.game.gameOver) {
        context.textAlign = 'center';
        context.font = this.fontSize * 2 + 'px ' + this.fontFamily;

        if(this.game.score > 10) {
          context.fillText('YERRRR', this.game.width * 0.5, this.game.height * 0.5 - 20);

          context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
          context.fillText('YOU are the one that goes bump in the night!', this.game.width * 0.5, this.game.height * 0.5 + 20);
        } else {
          context.fillText('Terror Time Again', this.game.width * 0.5, this.game.height * 0.5 - 20);

          context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
          context.fillText('You died of fright! Better luck next time!', this.game.width * 0.5, this.game.height * 0.5 + 20);
        }
    }
    context.restore();

  }
}
