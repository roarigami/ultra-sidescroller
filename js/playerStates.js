const playerStates = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4,
    DIVING: 5,
    HIT: 6,
    DIZZY: 7,
    KNOCKOUT: 8
}

class PlayerState {
    constructor(playerState, game) {
        this.game = game;
        this.game.playerState = playerState;
    }
}

class Sitting extends PlayerState {
    constructor(game) {
        super('SITTING', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.frameY = 5;
    }
    handleInput(input) {
      if(input.includes('ArrowLeft') || input.includes('ArrowRight')) {
          this.game.player.setState(playerStates.RUNNING, 3);
      } else if(input.includes('r')) {
          this.game.player.setState(playerStates.ROLLING, 10);
      }
    }
}

class Running extends PlayerState {
    constructor(game) {
        super('RUNNING', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.frameY = 3;
    }
    handleInput(input) {
        if(input.includes('ArrowDown')) {
            this.game.player.setState(playerStates.SITTING, 0);
        } else if(input.includes('ArrowUp')) {
            this.game.player.setState(playerStates.JUMPING, 3);
        } else if(input.includes('r')) {
            this.game.player.setState(playerStates.ROLLING, 10);
        }
    }
}

class Jumping extends PlayerState {
    constructor(game) {
        super('JUMPING', game);
    }
    enter() {
        if(this.game.player.onGround()) this.game.player.vy -= 25;
        console.log(this.game.player.vy);
        this.game.player.frameX = 0;
        this.game.player.frameY = 1;
    }
    handleInput(input) {
        if(this.game.player.vy > this.game.player.gravity) {
            this.game.player.setState(playerStates.FALLING , 3);
        } else if(input.includes('r')) {
            this.game.player.setState(playerStates.ROLLING, 10);
        } else if(input.includes('ArrowDown')) {
            this.game.player.setState(playerStates.DIVING, 0);
        }
        // if(input.includes('ArrowUp')) {
        //     this.game.player.setState(playerStates.SITTING);
        // }
    }
}
