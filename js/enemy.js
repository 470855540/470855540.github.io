class Enemy {
    constructor() {
        this.el = null;
        this.id = parseInt(Math.random() * 100000) + "";
        this.hp = null;
        this.timer = null;
        this.moveSpeed = 0;
    }
    init() {
        this.el = document.createElement("div");
        if (Math.random() < 0.7) {
            this.el.className = "enemy-small";
            this.hp = 1;
            this.moveSpeed = 20;
        } else if (Math.random() < 0.8) {
            this.el.className = "enemy-middle";
            this.hp = 5;
            this.moveSpeed = 40;
        } else {
            this.el.className = "enemy-large";
            this.hp = 10;
            this.moveSpeed = 80;
        }
        gameEngine.el.appendChild(this.el);
        gameEngine.enemyArr[this.id] = this;
        this.el.style.left = parseInt(Math.random() * (gameEngine.el.offsetWidth - this.el.offsetWidth)) + "px";
        this.el.style.top = -this.el.offsetHeight + "px";
        return this;
    }
    move() {
        this.timer = setInterval(() => {
            if (this.el.offsetTop >= gameEngine.el.offsetHeight) {
                clearInterval(this.timer);
                this.el.remove();
                delete (gameEngine.bulletsArr[this.id]);
            }
            this.el.style.top = this.el.offsetTop + 2 + "px";
        }, this.moveSpeed);
    }
    hurt() {
        this.hp--;
        if (this.hp == 0) {
            this.boom();
        }
    }
    boom() {
        clearInterval(this.timer);
        delete (gameEngine.bulletsArr[this.id]);
        var num = -1;
        var boomTimer = setInterval(() => {
            num++;
            if (this.el.className == "enemy-small") {
                this.el.style.backgroundImage = `url(./images/plane1_die${num % 3 + 1}.png)`;
                if (num == 3) {
                    this.el.remove();
                    clearInterval(boomTimer);
                }
            } else if (this.el.className == "enemy-middle") {
                this.el.style.backgroundImage = `url(./images/plane2_die${num % 4 + 1}.png)`;
                if (num == 4) {
                    this.el.remove();
                    clearInterval(boomTimer);
                }
            } else {
                this.el.style.backgroundImage = `url(./images/plane3_die${num % 6 + 1}.png)`;
                if (num == 6) {
                    this.el.remove();
                    clearInterval(boomTimer);
                }
            }
        }, 180);
    }
}