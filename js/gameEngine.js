; gameEngine = {
	el: null,
	bulletsArr: [],
	enemyArr: [],
	timer37: null,
	timer38: null,
	timer39: null,
	timer40: null,
	enemyTimer: null,
	scrolTimer: null,
	init() {
		this.el = document.getElementById("main_body");
		return this;
	},
	start(speed) {
		this.el.innerHTML = "";
		this.loading(() => {
			this.el.innerHTML = "";
			myPlane.init().fire(speed);
			gameEngine.keyControll();
			this.createEnemy();
			this.carsPlane();
			this.scrol()
		});
	},
	loading(callback) {
		var logo = document.createElement("div");
		var load = document.createElement("div");
		logo.className = "logo";
		load.className = "loading";
		this.el.appendChild(load);
		this.el.appendChild(logo);
		var num = 0;
		var timer = setInterval(() => {
			num++;
			load.style.backgroundImage = `url(./images/loading${num % 3 + 1}.png)`;
			if (num == 6) {
				clearInterval(timer);
				callback();
			}
		}, 300)
	},
	keyControll() {
		window.onkeydown = (evt) => {
			var e = evt || window.event;
			if (e.keyCode == 37) {
				clearInterval(this.timer37);
				this.timer37 = setInterval(() => {
					if (myPlane.el.offsetLeft <= 0) {
						return;
					}
					myPlane.el.style.left = myPlane.el.offsetLeft - 8 + "px";
				}, 20)
			}
			if (e.keyCode == 38) {
				clearInterval(this.timer38);
				this.timer38 = setInterval(() => {
					if (myPlane.el.offsetTop <= 0) {
						return;
					}
					myPlane.el.style.top = myPlane.el.offsetTop - 8 + "px";
				}, 20)
			}
			if (e.keyCode == 39) {
				clearInterval(this.timer39);
				this.timer39 = setInterval(() => {
					if (myPlane.el.offsetLeft >= gameEngine.el.offsetWidth - myPlane.el.offsetWidth) {
						return;
					}
					myPlane.el.style.left = myPlane.el.offsetLeft + 8 + "px";
				}, 20)
			}
			if (e.keyCode == 40) {
				clearInterval(this.timer40);
				this.timer40 = setInterval(() => {
					if (myPlane.el.offsetTop >= gameEngine.el.offsetHeight - myPlane.el.offsetHeight) {
						return;
					}
					myPlane.el.style.top = myPlane.el.offsetTop + 8 + "px";
				}, 20)
			}
		}
		window.onkeyup = (evt) => {
			var e = evt || window.event;
			if (e.keyCode == 37) {
				clearInterval(this.timer37);
			}
			if (e.keyCode == 39) {
				clearInterval(this.timer39);
			}
			if (e.keyCode == 38) {
				clearInterval(this.timer38);
			}
			if (e.keyCode == 40) {
				clearInterval(this.timer40);
			}
		}
	},
	createEnemy() {
		this.enemyTimer = setInterval(() => {
			new Enemy().init().move();
		}, 1500);
	},
	carsPlane() {
		var carsTimer = setInterval(() => {
			for (const key in this.enemyArr) {
				for (const k in this.bulletsArr) {
					if (crashTest(this.enemyArr[key].el, this.bulletsArr[k].el)) {
						var num = -1;
						clearInterval(this.bulletsArr[k].timer);
						this.bulletsArr[k].el.remove();
						delete (this.bulletsArr[k]);
						this.enemyArr[key].hurt();
					}
				}
			}
			for (const key in this.enemyArr) {
				if (crashTest(this.enemyArr[key].el, myPlane.el)) {
					clearInterval(carsTimer);
					myPlane.boom();
				}
			}
		});
	},
	gameover() {
		window.onkeydown = window.onkeyup = null;
		clearInterval(this.timer37);
		clearInterval(this.timer38);
		clearInterval(this.timer39);
		clearInterval(this.timer40);
		clearInterval(myPlane.myBullets);
		clearInterval(this.enemyTimer);
		for (const key in this.enemyArr) {
			clearInterval(this.enemyArr[key].timer);
		}
		for (const key in this.bulletsArr) {
			clearInterval(this.bulletsArr[key].timer);
		}
	},
	scrol() {
		var long = 0;
		this.scrolTimer = setInterval(() => {
			long += 1;
			gameEngine.el.style.backgroundPositionY = long + "px";
		}, 30);
	}
}