class Laser {
  constructor(ctx, x, y) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;

    this.width = 20;
    this.height = 20;

    this.speed=-6;
    this.vy = 0;

    this.img = new Image();
    this.img.src = "/game/images/pngfind.com-overwatch-png-6736737.png";
    this.img.isReady = false;
    this.img.onload = () => {
      this.img.isReady = true;
    };

    this.dead=false;
  }

  draw() {
 if (this.img.isReady) {
     console.log();
   this.ctx.drawImage(
    this.img, 
    this.x,
    this.y, 
    this.width,
    this.height);
 }
  }

  move() {
     this.vx = 0;
     this.vy = this.speed;

   this.x += this.vx;
   this.y += this.vy;

   if (this.y >= this.ctx.canvas.height) {
        this.dead=true;
   }
  }

  collidesWith(invader) {
    if (
      this.x < invader.x + invader.width &&
      this.x + this.width > invader.x &&
      this.y < invader.y + invader.height &&
      this.y + this.height > invader.y
    ) {
      return true;
    }
    return false;
  
  }
}
