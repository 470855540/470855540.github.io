class Bullets {
    constructor() {
        this.el = null;
        this.id = parseInt(Math.random() * 100000) + "";
        this.timer = null;
    }
    init() {
        this.el = document.createElement("div");
        this.el.className = "bullet";
        gameEngine.el.appendChild(this.el);
        gameEngine.bulletsArr[this.id] = this;
        this.el.style.left = myPlane.el.offsetLeft + myPlane.el.offsetWidth / 2 - this.el.offsetWidth / 2 + "px";
        this.el.style.top = myPlane.el.offsetTop - this.el.offsetHeight + "px";
        return this;
    }
    move() {
        this.timer = setInterval(() => {
            if (this.el.offsetTop <= -this.el.offsetHeight) {
                clearInterval(this.timer);
                this.el.remove();
                delete (gameEngine.bulletsArr[this.id]);
            }
            this.el.style.top = this.el.offsetTop - 20 + "px";
        }, 30)
    }
}