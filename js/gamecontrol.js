
class GameControl {
    constructor(config) {
      this.element = config.element;
      this.canvas = canvasUltra;
      this.height = canvasUltra.height;
      this.width = canvasUltra.width;
      this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
      this.map = null;

      this.player = new Player(this);
      this.input = new InputHandler(this);

      this.player.currentState = this.player.playerStates[0];
      this.player.currentState.enter();
    }

    update() {
      this.player.update(this.input.keys);
    }

    startGameLoop() {
        const animate = () => {
          this.ctx.clearRect(0, 0, this.width, this.height)
          this.update();
          this.player.draw(this.ctx);
          // requestAnimationFrame(animate);
          requestAnimationFrame(() => {
              animate();
          })
        }
        animate();
    }

    startMap() {

    }

    init() {
      this.startGameLoop();
    }

}
