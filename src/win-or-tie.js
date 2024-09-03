import LABELS from './labels.js';
import CONSTANTS from './constants.js';

class WinOrTie {
  constructor(playerHandler) {
    this.playerHandler = playerHandler;
    this.tiles = playerHandler.tiles;

    this.winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  }

  checkWinner() {
    for (let combination of this.winningCombos) {
      let [a, b, c] = combination;
      let tileA = this.tiles[a].textContent;
      let tileB = this.tiles[b].textContent;
      let tileC = this.tiles[c].textContent;

      if (tileA && tileA === tileB && tileA === tileC) {
        return tileA;
      }
    }
    // Check if every tile has symbol on it
    const isBoardFull = Array.from(this.tiles).every(
      (tile) => tile.textContent
    );

    if (isBoardFull) {
      return `${LABELS.TIE}`;
    }
    const emptyTiles = Array.from(this.tiles).filter(
      (tile) => !tile.textContent
    );
    if (emptyTiles.length <= CONSTANTS.LAST_THREE_TILES && this.noWinningMovesLeft()) {
      return `${LABELS.NO_WINNER}`;
    }
    
    return null;
  }

  noWinningMovesLeft() {
    const emptyTiles = Array.from(this.tiles).filter((tile) => !tile.textContent);
    const nextPlayer =
      this.playerHandler.currentPlayer === this.playerHandler.playerOne
        ? this.playerHandler.playerTwo
        : this.playerHandler.playerOne;

    if (emptyTiles.length === CONSTANTS.LAST_TILE) {
      const currentTile = emptyTiles[0];
      const nextPlayerSymbol = nextPlayer.symbol;
      currentTile.textContent = nextPlayerSymbol;

      const isWinningMove = this.winningMove(nextPlayerSymbol);

      currentTile.textContent = '';

      if (!isWinningMove) {
        return true;
      }
    }

    const allPlayerSymbols = [this.playerHandler.playerOne.symbol, this.playerHandler.playerTwo.symbol];
    for (let tile of emptyTiles) {
      for (let playerSymbol of allPlayerSymbols) {
        tile.textContent = playerSymbol;
        const isWinningMove = this.winningMove(playerSymbol);

        tile.textContent = '';

        if (isWinningMove) {
          return false;
        }
      }
    }

    return true;
  }

  winningMove(playerSymbol) {
    return this.winningCombos.some((combination) => {
      const [a, b, c] = combination;
      return (
        this.tiles[a].textContent === playerSymbol &&
        this.tiles[b].textContent === playerSymbol &&
        this.tiles[c].textContent === playerSymbol
      );
    });
  }
}

export default WinOrTie;
