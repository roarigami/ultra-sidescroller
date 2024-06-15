
class GameControl {
    constructor(config) {
      this.element = config.element;
      this.canvas = canvasUltra;
      this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
      this.map = null;
      this.x = 0;

      this.player = new Player(this);
    }

    startGameLoop() {
        const animate = () => {
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
