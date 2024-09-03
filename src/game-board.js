import PlayerHandler from './player-handler.js';

class Gameboard {
  constructor() {
    this.playerHandler = new PlayerHandler();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const gameboard = new Gameboard();
});
