
class GameControl {
    constructor(config) {
      this.element = config.element;
      this.canvas = canvasUltra;
      this.height = canvasUltra.height;
      this.width = canvasUltra.width;
      this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
      this.map = null;
      this.groundMargin = 50;

      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);

      this.player.currentState = this.player.playerStates[0];
      this.player.currentState.enter();

      this.lastTime = 0;
    }

    update(deltaTime) {
      this.player.update(this.input.keys, deltaTime);
    }

    startGameLoop() {
        const animate = (timeStamp) => {
          const deltaTime = timeStamp - this.lastTime;
          this.lastTime = timeStamp;

          this.ctx.clearRect(0, 0, this.width, this.height)
          this.update(deltaTime);
          this.player.draw(this.ctx);
          requestAnimationFrame(animate);

          //Does not pass deltaTime variable. frameTimer NaN
          // requestAnimationFrame(() => {
          //     animate();
          // })
        }
        animate(0);
    }

    startMap() {

    }

    init() {
      this.startGameLoop();
    }

}
