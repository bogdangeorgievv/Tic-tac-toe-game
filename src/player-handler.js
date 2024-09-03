import PlayerOne from './player-one.js';
import PlayerTwo from './player-two.js';
import WinOrTie from './win-or-tie.js';
import ModalDisplay from './modal-display.js';
import ScoreBoard from './score-board.js';
import CONSTANTS from './constants.js';

class PlayerHandler {
  constructor() {
    this.init();
  }

  init() {
    this.tiles = document.querySelectorAll('td');
    this.playerOneDot = document.querySelector('.player-one-dot');
    this.playerTwoDot = document.querySelector('.player-two-dot');
    this.playerOne = new PlayerOne();
    this.playerTwo = new PlayerTwo();
    this.currentPlayer = this.playerOne;
    this.winOrTie = new WinOrTie(this);
    this.modalDisplay = new ModalDisplay(this);
    this.scoreBoard = new ScoreBoard(
      this.clearBoardAfterGame.bind(this),
      this.resetGame.bind(this)
    );
    this.setActivePlayerDot();
    this.initializeTileListeners();
    this.gameCounter = 1;
    this.scoreBoard.resetPlayerScores();
  }

  initializeTileListeners() {
    this.tiles.forEach((tile) =>
      tile.addEventListener('click', this.handleTileClick.bind(this))
    );
  }

  handleTileClick(event) {
    const currentTile = event.target;

    // Prevents clicking on already occupied cell
    if (currentTile.textContent) {
      return;
    }

    this.currentPlayer.placeSymbol(currentTile);

    const result = this.winOrTie.checkWinner();
    if (result) {
      if (result === this.playerOne.symbol) {
        this.scoreBoard.incrementPlayerOneScore();
      } else if (result === this.playerTwo.symbol) {
        this.scoreBoard.incrementPlayerTwoScore();
      }
      setTimeout(() => {
        this.modalDisplay.showEndGameModal(result);
        setTimeout(() => this.prepareNextGame(), CONSTANTS.TIMEOUT_HIDE);
      }, CONSTANTS.TIMEOUT_APPEAR);
    } else {
      this.switchPlayer();
    }
  }

  switchPlayer() {
    this.currentPlayer =
      this.currentPlayer === this.playerOne ? this.playerTwo : this.playerOne;
    this.setActivePlayerDot(this.currentPlayer);
  }

  setActivePlayerDot() {
    const activeDot =
      this.currentPlayer === this.playerOne ? this.playerOneDot : this.playerTwoDot;
    const inactiveDot =
      this.currentPlayer === this.playerOne ? this.playerTwoDot : this.playerOneDot;

    activeDot.classList.add('active');
    inactiveDot.classList.remove('active');
  }

  clearBoardAfterGame() {
    this.tiles.forEach((tile) => {
      tile.textContent = '';
      tile.classList.remove('x-symbol', 'o-symbol');
    });
  }

  playerTradeOff() {
    this.gameCounter++;
    this.currentPlayer =
      this.gameCounter % 2 === 0 ? this.playerTwo : this.playerOne;
    this.setActivePlayerDot();
  }

  resetGame() {
    this.gameCounter = 1;
    this.currentPlayer = this.playerOne;
    this.setActivePlayerDot();
  }

  prepareNextGame() {
    this.clearBoardAfterGame();
    this.playerTradeOff();
  }
}

export default PlayerHandler;
