class ApeArray {
	constructor() {
        this.randomNumbers = null;
		this.startButtonEl = document.getElementById("start-button");
		this.resetButtonEl = document.getElementById("reset-button");
		this.score = 0;
		this.boxes = 9;
		this.startGameCountDownTime = 3;
	}
    start() {
		this.randomNumbers = this.creatingRandomNumbers(this.boxes); this.creatingRandomNumbers(this.boxes);
		this.renderBoard();
		this.gameStarted();
	
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