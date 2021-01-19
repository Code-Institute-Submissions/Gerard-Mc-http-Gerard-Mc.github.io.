class ApeArray {
	constructor() {
        this.score = 0;
		this.boxes = 9;
        this.randomNumbers = this.creatingRandomNumbers(this.boxes); 
		this.renderBoard();
		this.startButtonEl = document.getElementById("start-button");
		this.resetButtonEl = document.getElementById("reset-button");
		this.startGameCountDownTime = 3;
	}
    start() {
		this.gameStarted();
	
	}
    
    renderBox(index) {
		return `<div class="box" id="number-box-${index}">
                    <p class="box-number">${this.randomNumbers[index]}</p>
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
		for(let i = 0; i < total; i++) {
			randomNumbers.push(i + 1);
		}
		for(let j = total - 1; j >= 0; j--) {
			let swapIndex = Math.floor(Math.random() * j);
			let tmp = randomNumbers[swapIndex];
			randomNumbers[swapIndex] = randomNumbers[j];
			randomNumbers[j] = tmp;
		}
		return randomNumbers;
	}
    
}
    
const apeArray = new ApeArray();