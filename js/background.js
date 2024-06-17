class Layer {
    constructor(game, width, height, speedModifier, image) {
      this.game = game;
      this.width = width;
      this.height = height;
      this.speedModifier = speedModifier;
      this.image = image;
      this.x = 0;
      this.y = 0;
      console.log(this.x);
    }

    update() {
      if(this.x < -this.width) this.x = 0;
      else this.x -= this.game.speed * this.speedModifier;
    }

    draw(context) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
      context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }

}


class Background {
    constructor(game) {
      this.game = game;
      this.width = 1667;
      this.height = 500;
      this.imageLayer1 = bgLayer1;
      this.imageLayer2 = bgLayer2;
      this.imageLayer3 = bgLayer3;
      this.imageLayer4 = bgLayer4;
      this.imageLayer5 = bgLayer5;

      this.layer1 = new Layer(this.game, this.width, this.height, 0, this.imageLayer1);
      this.layer2 = new Layer(this.game, this.width, this.height, 0.2, this.imageLayer2);
      this.layer3 = new Layer(this.game, this.width, this.height, 0.4, this.imageLayer3);
      this.layer4 = new Layer(this.game, this.width, this.height, 0.8, this.imageLayer4);
      this.layer5 = new Layer(this.game, this.width, this.height, 1, this.imageLayer5);

      this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5];

      // console.log(this.layer2);
    }

    update() {
        this.backgroundLayers.forEach(layer => {
            layer.update();
        });
    }

    draw(context) {
      this.backgroundLayers.forEach(layer => {
          layer.draw(context);
      });
    }


}
