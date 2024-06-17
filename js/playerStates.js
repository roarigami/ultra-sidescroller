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
        this.game.player.maxFrame = 4;
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
        this.game.player.maxFrame = 8;
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
        this.game.player.frameX = 0;
        this.game.player.frameY = 1;
        this.game.player.maxFrame = 6;
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

class Falling extends PlayerState {
    constructor(game) {
        super('FALLING', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.frameY = 2;
        this.game.player.maxFrame = 6;
    }
    handleInput(input) {
        if(this.game.player.onGround()) {
            this.game.player.setState(playerStates.RUNNING, 3);
        } else if(input.includes('ArrowDown')) {
            this.game.player.setState(playerStates.DIVING, 0);
        }
    }
}

 class Rolling extends PlayerState {
    constructor(game) {
        super('ROLLING', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.frameY = 6;
        this.game.player.maxFrame = 6;
    }
    handleInput(input) {


        if(!input.includes('r') && this.game.player.onGround()) {
            this.game.player.setState(playerStates.RUNNING, 3);
        } else if(!input.includes('r') && !this.game.player.onGround()) {
            this.game.player.setState(playerStates.FALLING, 3);
        } else if(input.includes('r') && input.includes('ArrowUp') && this.game.player.onGround()) {
            this.game.player.vy -= 25;
        } else if(input.includes('ArrowDown') && !this.game.player.onGround()) {
            this.game.player.setState(playerStates.DIVING, 0);
        }
    }
}


 class Diving extends PlayerState {
    constructor(game) {
        super('DIVING', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.frameY = 6;
        this.game.player.maxFrame = 6;
        this.game.player.vy = 35;
    }
    handleInput(input) {

        if(this.game.player.onGround()) {
            this.game.player.setState(playerStates.RUNNING, 3);
        } else if(input.includes('r') && this.game.player.onGround()) {
            this.game.player.setState(playerStates.ROLLING, 10);
        }

    }
}
