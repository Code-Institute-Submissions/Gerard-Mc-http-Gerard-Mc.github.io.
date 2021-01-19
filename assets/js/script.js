const GAMEKEY = 'ape-array-storage-key';
const MAX_LEVEL = 5;

class ApeArray {
    constructor() {
        this.score = 0;
        this.boxes = 4;
        this.started = false;
        this.clickCounter = 0;
        this.randomNumbers = this.creatingRandomNumbers(this.boxes);
        this.startButtonEl = document.getElementById("start-button");
        this.resetButtonEl = document.getElementById("reset-button");
        this.startGameCountDownTime = 6;
        this.gameStageCountDownTime = 2;
        this.loadGameState();
        this.addListener();
    }

    start() {
        this.clickCounter = 0;
        this.score = 0;
        this.started = false;
        this.gameStageCountDownTime = MAX_LEVEL - this.gameState.record; // will be level
        this.randomNumbers = this.creatingRandomNumbers(this.boxes);
        this.startButtonEl.classList.remove('start-button-hide');
        this.countDown(this.startGameCountDownTime, () => {
            this.startButtonEl.classList.add('start-button-hide');
            this.renderBoard();
            this.countDown(this.gameStageCountDownTime, () => {
                this.gameStarted();
            });
        }, (seconds) => {
            if (seconds > 3) {
                this.startButtonEl.innerText = "You have " + (MAX_LEVEL - this.gameState.record) + " secs to memorize the boxes";
                this.startButtonEl.style.fontSize = "18px";
                this.startButtonEl.style.padding = "18px";
            } else {
                this.startButtonEl.style.fontSize = "30px";
                this.startButtonEl.innerText = seconds;
            }
        });
    }
    /* Creates default scores or retrieves scores from local storage */
    loadGameState() {
		this.gameState = JSON.parse(localStorage.getItem(GAMEKEY));
		if(!this.gameState) {
			this.gameState = {
				record: 0,
				level: 1
			};
		}
        
        this.renderState();
	}
    
    /* Updates local storage values */
    updateGameState() {
		localStorage.setItem(GAMEKEY, JSON.stringify(this.gameState));
	}
    /* removes numbers once the game has started */
    gameStarted() {
        Array.from(document.getElementsByClassName('box-number')).forEach((el, index) => {
            el.innerHTML = '';
        });
        this.started = true;
    }

    /* checks if box value is equal to the amount of attemps of clicks. The value should be equal to the amount of clicks as the game sequence only increments by one each attemp*/
    checkClick(boxElement) {
        return parseInt(boxElement.dataset.value) === this.clickCounter;
    }

    /* Checks when start button is pressed to begin game */
    addListener() {
        const boxContainer = document.getElementById("box-container");
        boxContainer.addEventListener("click", (event) => {
            if (!this.started) {
                return;
            }
            this.clickCounter++;
            if (!this.checkClick(event.target.firstElementChild)) {
                // Game Over!
                this.gameOver();
            } else {
                // Hide the clicked number
                event.target.classList.add('hide-boxes');
                this.score++;
                // Update Scores
				if(this.score == this.boxes && this.gameState.level < MAX_LEVEL + 1) {
					this.gameState.level++;
					this.gameState.record++;
					this.score = 0;
				}
            }
			// Game state is always store after a click on the board.
			this.updateGameState();
            this.renderState();
		});


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
            if (seconds === 0) {
                clearInterval(clock);
                callback();
            }
            if (iterCallback) {
                iterCallback(seconds);
            }
        }, 100);
    }
    
    /* Renders scores to html elements */
    renderState() {
		const scoreLabel = document.getElementById('score');
		const levelScoreLabel = document.getElementById('level');
		const recordScoreLabel = document.getElementById('record');
		scoreLabel.innerText = this.score;
		levelScoreLabel.innerText = this.gameState.level;
		recordScoreLabel.innerText = this.gameState.record;
	}

    /* Renders boxes */
    renderBox(index) {
        return `<div class="box" id="number-box-${index}">
                    <p class="box-number" data-value="${this.randomNumbers[index]}">${this.randomNumbers[index]}</p>
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