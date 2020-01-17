class WordSearch {
  constructor( res = response ) {
    this.puzzle = [];
    this.answers = [];

    this.transformData( res );

    // for( let a = 0; a < this.answers.length; a++ ) {
    //   for( let i = 0; i < this.puzzle.length; i++ ) {
    //     if( this.answerExistsHorizontally( this.answers[ a ], this.puzzle[ i ] ) ) {
    //       console.log( `${this.answers[a]}: (${i})`);
    //     }
    //   }
    // }
  }

  get( which ) {
    return this[ which ];
  }

  transformData( res ) {
    const lines = res.split( /\n/g );

    if( lines.length > 1 ) {
      const answers = lines.shift();

      this.answers = answers.split( ',' );

      this.puzzle = lines.map( ( line ) => line.replace( /,/g, '' ) );

      if( this.puzzle.length !== this.puzzle[ 0 ].length ) {
        console.error( 'Puzzle is not a square. Exiting...' );
        exit();
      }
    } else {
      console.error( 'Not enough data. Exiting...' );
      exit();
    }
  }

  buildAnswer( col, row, includeComma = true ) {
    return `(${col},${row})${includeComma ? ',' : ''}`;
  }

  answerExistsHorizontally( answer, line ) {
    const answerRE = new RegExp( answer, 'i' );

    return line.match( answerRE );
  }

  findWordHorizontally( answer, lineIndex = null, positionIndex = null ) {
    if( lineIndex !== null && positionIndex !== null ) {
      let str = `${answer}: ${this.buildAnswer( positionIndex, lineIndex )}`;

      for( let i = positionIndex + 1; i < answer.length; i++ ) {
        str += `${this.buildAnswer( i, lineIndex, i < answer.length - 1 )}`;
      }

      return str;
    } else {
      for( let i = 0; i < this.puzzle.length; i++ ) {
        const matches = this.answerExistsHorizontally( answer, this.puzzle[ i ] );

        if( matches ) {
          return this.findWordHorizontally( answer, i, matches.index );
        }
      }
    }
  }
}

module.exports = WordSearch;
