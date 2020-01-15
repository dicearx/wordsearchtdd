const response = require( './api.json' );

class WordSearch {
  constructor() {
    this.puzzle = '';
    this.answers = [];

    if( Math.sqrt( response.puzzle.length ) % 1 === 0 ) {
      this.puzzle = response.puzzle;
      this.answers = response.answers;
    } else {
      console.error( 'Puzzle is not a square. Exiting...' );
    }
  }

  get( which ) {
    return this[ which ];
  }
}

module.exports = WordSearch;
