class InputHandler {
    constructor() {
      this.keys = [];
      window.addEventListener('keydown', (e) => {
          if((  e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key == 'ArrowLeft' ||
                e.key == 'ArrowRight' ||
                //e.key == 'Enter' ||
                e.key == 'r') &&
                this.keys.indexOf(e.key) === -1) {
              this.keys.push(e.key);
          } else if(e.key === 'd') this.game.debug = !this.game.debug;
          //console.log(e.key);

      });
      window.addEventListener('keyup', (e) => {
          //console.log(e.key);
          if(  e.key === 'ArrowDown' ||
               e.key === 'ArrowUp' ||
               e.key == 'ArrowLeft' ||
               e.key == 'ArrowRight' ||
               //e.key == 'Enter' ||
               e.key == 'r') {
              this.keys.splice(this.keys.indexOf(e.key), 1);
          }
          //console.log(this.keys);
      });
    }
}
