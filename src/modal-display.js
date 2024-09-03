import LABELS from "./labels.js";
import CONSTANTS from "./constants.js";

class ModalDisplay {
  constructor(playerHandler) {
    this.modalMessage = document.querySelector('.modal-message');
    this.modalWindow = document.querySelector('.modal-window');
    this.playerHandler = playerHandler;
  }

  showEndGameModal(result) {
    if (result === `${LABELS.TIE}`) {
      this.modalMessage.textContent = `${LABELS.CATS}`;
    } else if (result === 'X' || result === 'O') {
      this.modalMessage.textContent = `${result} ${LABELS.WIN}`;
    } else if (result === `${LABELS.NO_WINNER}`) {
      this.modalMessage.textContent = `${LABELS.NO_WINNER}`;
    }
    this.modalWindow.style.display = 'flex';
    setTimeout(() => {
      this.modalWindow.style.display = 'none';
      this.playerHandler.clearBoardAfterGame();
    }, CONSTANTS.TIMEOUT_HIDE);
  }

  clearTimeOut() {
    this.modalWindow.style.display = 'none';
    this.playerHandler.clearBoardAfterGame();
  }
}

export default ModalDisplay;

