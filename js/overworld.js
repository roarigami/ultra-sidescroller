class Overworld {
    constructor(config) {
      this.element = config.element;
      this.canvas = canvas10;
      this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
      this.map = null;
      this.x = 0;
    }

    startGameLoop() {
        const animate = () => {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
          this.ctx.fillRect(this.x, 50, 100, 100);
          this.x++;
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
