class PlayerOne {
  constructor() {
    this.symbol = 'X';
  }

  placeSymbol(tile) {
    tile.textContent = 'X';
    tile.classList.add('x-symbol');
  }
}

export default PlayerOne;
