
class Game {
  constructor(ctx) {
    this.ctx = ctx;

    this.player = new Player(ctx);
    this.invaders = [
      new Invader(ctx, 180, 100),
      new Invader(ctx, 330, 100),
      new Invader(ctx, 480, 100),
      new Invader(ctx, 630, 100),
      new Invader(ctx, 95, 200),
      new Invader(ctx, 255, 200),
      new Invader(ctx, 405, 200),
      new Invader(ctx, 555, 200),
      new Invader(ctx, 705, 200),
    ];

    this.lasers = [];

    this.intervalId = undefined;
    this.fps = 1000 / 60;
    this.score = 0;
  }

  start() {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.clear();

        this.move();

        this.draw();

        this.checkCollissions();
      }, this.fps);
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  draw() {
    this.invaders.forEach((invader) => invader.draw());

    this.player.draw();

    this.lasers.forEach((laser) => laser.draw());

    this.drawScore();
  }

  drawScore() {
    this.ctx.save();

    this.ctx.fillStyle = "white";
    this.ctx.font = " bold 24px sans-serif";

    this.ctx.fillText(`Score: ${this.score} ptos`, 20, 40);

    this.ctx.restore();
  }

  move() {
    this.player.move();

    this.lasers.forEach((laser) => laser.move());

    if (this.player.shoot) {
      this.lasers.push(
        new Laser(ctx, this.player.x + this.player.width / 2.5, this.player.y)
      );
    }

    this.invaders.forEach((invader) => invader.move());

    if (this.invaders.length > 0) {
      this.anInvaderWon = false;
      this.invaders.forEach((invader) => {
        this.anInvaderWon = this.anInvaderWon || invader.y+invader.height >= this.player.y;
      });
      if (this.anInvaderWon) {
        this.youLose();
      }
    } else {
      this.youWin();
    }
  }

  setupListeners(event) {
    this.player.setupListeners(event);
  }

  checkCollissions() {
    const hitInvader = this.invaders.find((invader) =>
      this.lasers.some((laser) => laser.collidesWith(invader))
    );

    if (hitInvader) {
      this.invaders = this.invaders.filter((invader) => invader !== hitInvader);

      this.score++;
    }
  }

  youWin() {
    this.gameOver("You Win")
  }

  youLose() {
    this.gameOver("You Lose")
  }

  gameOver(message) {
    clearInterval(this.intervalId);

    this.ctx.save();

    this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.font = "bold 32px sans-serif";
    this.ctx.fillText(
      message,
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );

    this.ctx.restore();
  }

}
