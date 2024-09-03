class ScoreBoard {
  constructor(clearBoardAfterGameHandler, resetGameHandler) {
    this.playerOneScore = document.getElementById('playerOne');
    this.playerTwoScore = document.getElementById('playerTwo');
    this.resetBtn = document.getElementById('gameResetBtn');
    this.playerOneScoreValue = 0;
    this.playerTwoScoreValue = 0;
    this.clearBoardAfterGameHandler = clearBoardAfterGameHandler;
    this.resetGameHandler = resetGameHandler;
  }

  incrementPlayerOneScore() {
    this.playerOneScoreValue++;
    this.updateScoreDisplay();
  }

  incrementPlayerTwoScore() {
    this.playerTwoScoreValue++;
    this.updateScoreDisplay();
  }

  updateScoreDisplay() {
    this.playerOneScore.textContent = this.playerOneScoreValue;
    this.playerTwoScore.textContent = this.playerTwoScoreValue;
  }

  resetPlayerScores() {
    this.resetBtn.addEventListener('click', () => {
      this.playerOneScoreValue = 0;
      this.playerTwoScoreValue = 0;
      this.updateScoreDisplay();
      this.clearBoardAfterGameHandler();
      this.resetGameHandler();
    });
  }
}

export default ScoreBoard;
