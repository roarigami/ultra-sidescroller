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
      
    }
    handleInput(input) {

    }
}
