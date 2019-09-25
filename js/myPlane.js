; myPlane = {
    el: null,
    myBullets:null,
    init() {
        this.el = document.createElement("div");
        this.el.className = "myplane";
        gameEngine.el.appendChild(this.el);
        this.el.style.bottom = "0px";
        this.el.style.left = gameEngine.el.offsetWidth / 2 - this.el.offsetWidth / 2 + "px";
        return this;
    },
    fire(speed) {
        this.myBullets = setInterval(() => {
            new Bullets().init().move();
        }, speed);
    },
    boom() {
        gameEngine.gameover();
        var num = -1;
        var timer = setInterval(() => {
            num++;
            this.el.style.backgroundImage = `url(./images/me_die${num % 4 + 1}.png)`;
            if (num == 4) {
                clearInterval(timer);
                alert("游戏结束！");
                window.location.reload(true);
            }
        }, 200);
    }
}