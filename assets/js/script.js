class ApeArray {
	constructor() {
		this.startButtonEl = document.getElementById("start-button");
		this.resetButtonEl = document.getElementById("reset-button");
		this.score = 0;
		this.boxes = 9;
		this.startGameCountDownTime = 3;
	}
    start() {
		this.started = false;
		this.randomNumbers = this.creatingRandomNumbers(this.boxes);
		this.renderBoard();
		this.gameStarted();
	
	}
}
    
const apeArray = new ApeArray();