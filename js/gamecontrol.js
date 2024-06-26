
class GameControl {
    constructor(config) {
      this.element = config.element;
      this.canvas = canvasUltra;
      this.height = canvasUltra.height;
      this.width = canvasUltra.width;
      this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
      this.map = null;

      this.groundMargin = 50;
      this.speed = 0;
      this.maxSpeed = 3;

      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.UI = new UserInterface(this);

      this.particles = [];
      this.maxParticles = 100;
      this.enemies = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;

      this.collisions = [];

      this.debug = false;
      this.score = 0;
      this.fontColor = 'black';

      this.player.currentState = this.player.playerStates[0];
      this.player.currentState.enter();

      this.lastTime = 0;
      this.lives = 5;

      //Time Limit Function
      // this.time = 0;
      // this.maxTime = 2000;
      this.gameOver = false;
    }

    restartGame() {
      this.player.x = 0;
      this.player.y = this.height - this.player.height - this.groundMargin;
      this.player.frameY = 0;
      this.player.frameX = 0;
      this.player.currentState = this.player.playerStates[0];
      this.enemies = [];
      this.score = 0;
      this.lives = 5;
      this.gameOver = false;
      this.init();
      // animate(0);
    }

    update(deltaTime) {
      this.background.update();
      this.player.update(this.input.keys, deltaTime);

      //Enemy handler
      if(this.enemyTimer > this.enemyInterval) {
          this.addEnemy();
          this.enemyTimer = 0;
      } else {
          this.enemyTimer += deltaTime;
      }
      this.enemies.forEach(enemy => {
          enemy.update(deltaTime);
          if(enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);
      });

      //Handle Particles
      this.particles.forEach((particle, index) => {
          particle.update();
          if(particle.markedForDeletion) this.particles.splice(index, 1);
      });
      if(this.particles.length > this.maxParticles) {
          this.particles.length = this.maxParticles;
          //this.particles = this.particles.slice(0, this.maxParticles);
      }

      //Handle Collision Sprites
      this.collisions.forEach((collision, index) => {
          collision.update(deltaTime);
          if(collision.markedForDeletion) this.collisions.splice(index, 1);
      });

    }

    startGameLoop(context) {
        const animate = (timeStamp) => {
          const deltaTime = timeStamp - this.lastTime;
          this.lastTime = timeStamp;

          context.clearRect(0, 0, this.width, this.height)
          this.update(deltaTime);

          this.background.draw(context);
          this.player.draw(context);
          this.enemies.forEach(enemy => {
              enemy.draw(context);
          });

          //Draw Particles
          this.particles.forEach(particle => {
              particle.draw(context);
          });

          //Draw Collision Sprites
          this.collisions.forEach(collision => {
              collision.draw(context);
          });

          this.UI.draw(context)

          if(!this.gameOver) requestAnimationFrame(animate);

          //Does not pass deltaTime variable. frameTimer NaN
          // requestAnimationFrame(() => {
          //     animate();
          // })
        }
        animate(0);
    }

    addEnemy() {
        //Only want to add plant ground chaacters when the game is moving
        //Otherwise they would just be accumulating off screen
        if(this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
        else if(this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
        this.enemies.push(new AerialEnemy(this));
    }

    startMap() {

    }

    init() {
      this.startGameLoop(this.ctx);
    }

}
