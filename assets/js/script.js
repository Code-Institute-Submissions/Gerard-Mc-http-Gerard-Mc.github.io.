class ApeArray {
    constructor() {
        this.score = 0;
        this.boxes = 9;
        this.randomNumbers = this.creatingRandomNumbers(this.boxes);
        this.startButtonEl = document.getElementById("start-button");
        this.resetButtonEl = document.getElementById("reset-button");
        this.startGameCountDownTime = 6;
        this.gameStageCountDownTime = 2;
        this.addListener();
    }

    start() {
        this.randomNumbers = this.creatingRandomNumbers(this.boxes);
        this.startButtonEl.classList.remove('start-button-hide');
       this.countDown(this.startGameCountDownTime, () => {
			this.startButtonEl.classList.add('start-button-hide');
			this.renderBoard();
			this.countDown(this.gameStageCountDownTime, () => {
				this.gameStarted();
			});
		}, (seconds) => {
			if(seconds > 3) {
				this.startButtonEl.innerText = "You have 3 secs to memorize the boxes";
				this.startButtonEl.style.fontSize = "18px";
				this.startButtonEl.style.padding = "18px";
			} else {
				this.startButtonEl.style.fontSize = "30px";
				this.startButtonEl.innerText = seconds;
			}
		});
	}
/* removes numbers once the game has started */
    gameStarted() {
        Array.from(document.getElementsByClassName('box-number')).forEach((el, index) => {
            el.innerHTML = '';
        });
    }

    /* Checks when start button is pressed to begin game */
    addListener() {
        this.startButtonEl.addEventListener("click", () => {
            if ((this.startButtonEl.innerText === "Start")) {
                this.start();
            }
        });
    }

    	countDown(timeInSeconds, callback, iterCallback = null) {
		let seconds = timeInSeconds;
		const clock = setInterval(() => {
			seconds--;
			if(seconds === 0) {
				clearInterval(clock);
				callback();
			}
			if(iterCallback) {
				iterCallback(seconds);
			}
		}, 1000);
	}
    
    /* Renders boxes */
    renderBox(index) {
        return `<div class="box" id="number-box-${index}">
                    <p class="box-number" >${this.randomNumbers[index]}</p>
                </div>
            </div>`;
    }
/* Renders boxes into divs into a div container */
    renderBoard() {
        const boxContainer = document.getElementById("box-container");
        this.randomNumbers.forEach((item, index) => {
            let col = document.createElement("div");
            col.className = "col";
            col.innerHTML = this.renderBox(index);
            boxContainer.appendChild(col);
        });
    }

    /* Fisher–Yates shuffle algorithm to create non repeating array of a set length of 9 */
    creatingRandomNumbers(total) {
        var randomNumbers = [];
        for (let i = 0; i < total; i++) {
            randomNumbers.push(i + 1);
        }
        for (let j = total - 1; j >= 0; j--) {
            let swapIndex = Math.floor(Math.random() * j);
            let tmp = randomNumbers[swapIndex];
            randomNumbers[swapIndex] = randomNumbers[j];
            randomNumbers[j] = tmp;
        }
        return randomNumbers;
    }

}

const apeArray = new ApeArray();