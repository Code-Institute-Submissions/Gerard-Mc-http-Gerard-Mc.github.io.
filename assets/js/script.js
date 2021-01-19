class ApeArray {
    constructor() {
        this.score = 0;
        this.boxes = 9;
        this.randomNumbers = this.creatingRandomNumbers(this.boxes);
        this.startButtonEl = document.getElementById("start-button");
        this.resetButtonEl = document.getElementById("reset-button");
        this.startGameCountDownTime = 4;
        this.addListener();
    }


    start() {
        this.randomNumbers = this.creatingRandomNumbers(this.boxes);
        this.startButtonEl.classList.remove('start-button-hide');
        this.countDown(this.startGameCountDownTime, () => {
                this.startButtonEl.classList.add('start-button-hide');
                this.renderBoard();
                this.gameStarted();
            }

        );
    }

    gameStarted() {
        Array.from(document.getElementsByClassName('box-number')).forEach((el, index) => {
            el.innerHTML = '';
        });
    }


    addListener() {
        this.startButtonEl.addEventListener("click", () => {
            if ((this.startButtonEl.innerText === "Start")) {
                this.start();
            }
        });
    }

    countDown(timeInSeconds, callback) {
        let seconds = timeInSeconds;
        const clock = setInterval(() => {
            seconds--;
            this.startButtonEl.innerText = seconds;
            if (seconds === 0) {
                clearInterval(clock);
                callback();
            }

        }, 300);
    }

    renderBox(index) {
        return `<div class="box" id="number-box-${index}">
                    <p class="box-number" >${this.randomNumbers[index]}</p>
                </div>
            </div>`;
    }

    renderBoard() {
        const boxContainer = document.getElementById("box-container");
        this.randomNumbers.forEach((item, index) => {
            let col = document.createElement("div");
            col.className = "col";
            col.innerHTML = this.renderBox(index);
            boxContainer.appendChild(col);
        });
    }

    /* Fisher–Yates shuffle algorithm */
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