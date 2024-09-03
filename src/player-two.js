class PlayerTwo {
  constructor() {
    this.symbol = 'O';
  }
  
  placeSymbol(tile) {
    tile.textContent = 'O';
    tile.classList.add('o-symbol');
  }
}

export default PlayerTwo;
