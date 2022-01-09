class Invader {
  constructor(ctx, x, y) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;

    this.width =75;
    this.height = 75;

    this.vx = -3;
    this.vy = 10;

    this.alienMarginLeft = this.x-100;
    this.alienMarginRight = this.x + 100;

    this.gameOver=false;

    this.img = new Image();
    this.img.src = "./game/images/Daco_5686022.png";
    this.img.isReady = false;
    this.img.onload = () => {
      this.img.isReady = true;
    };

  }

  draw() {
    if (this.img.isReady) {
      console.log();
      this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }

  }

  move() {
    this.x += this.vx;

     if (this.x <= this.alienMarginLeft) {
       this.x = this.alienMarginLeft;
       this.y+=this.vy;
       this.vx=-this.vx;
     }
     if (this.x + this.width >= this.alienMarginRight) {
       this.x = this.alienMarginRight - this.width;
       this.y+=this.vy;
       this.vx = -this.vx;
     }

  }
}
