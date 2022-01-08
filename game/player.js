class Player {
  constructor(ctx, x,y) {
    this.ctx = ctx;

    this.cooldown = 0;

    this.width = 90;
    this.height = 150;
    this.x = 400;
    this.y = ctx.canvas.height-this.height;

    this.speed=6;

    this.vx = 0
    this.vy = 0

    this.movements = {
      left: false,
      right: false,
    };
  
    this.shoot=false,


  this.img = new Image();
  this.img.src ='/game/images/spaceship.png';
  this.img.isReady= false;
  this.img.onload = () => {
  this.img.isReady=true
  }
}

  draw() {
    this.ctx.save();

   if(this.img.isReady){
        this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.width,
        this.height,
      )
    }
    this.ctx.restore()
  }


  setupListeners(event) {
    const status = event.type === "keydown";

    switch (event.keyCode) {
      case KEY_RIGHT:
        this.movements.right = status;
        break;
      case KEY_LEFT:
        this.movements.left = status;
        break;
      case KEY_SHOOT:
        if (status) {
          if (this.cooldown <= 0) {
            this.shoot = true;
            this.cooldown = 50;
          } else{
            this.shoot = false;
          }
        }else {
          this.shoot = false;
        }
        break;
      default:
        break;
    }
  }

  move() {
    this.cooldown -= 1;

    if (!this.movements.right && !this.movements.left) {
      this.vx = 0;
    }
    if (this.movements.right) {
      this.vx = this.speed;
    }
    if (this.movements.left) {
      this.vx = -this.speed;
    }

    this.x += this.vx;
    this.y += this.vy;

    if (this.x <= 0) {
      this.x = 0;
    }
    if (this.x + this.width >= this.ctx.canvas.width) {
      this.x = this.ctx.canvas.width - this.width;
    }

    if (this.y <= 0) {
      this.y = 0;
    }
    if (this.y + this.height >= this.ctx.canvas.height) {
      this.y = this.ctx.canvas.height - this.height;
    }
  }

  collidesWith(invader) {
    if (
      this.x < invader.x + invader.width &&
      this.x + this.size > invader.x &&
      this.y < invader.y + invader.height &&
      this.y + this.size > invader.y
    ) {
      return true;
    }

    return false;
  }
}
