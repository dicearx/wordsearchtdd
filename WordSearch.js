const response = `DEVELOPMENT,DRIVEN,KATA,TEST,THIS
D,P,E,T,K,H,S,Y,B,S,J,K,L,M,V
G,R,E,Q,Y,L,P,H,B,Z,N,J,W,Z,O
D,S,I,C,Q,S,S,M,L,O,K,U,S,R,S
T,J,V,V,D,H,Z,Z,O,J,W,G,F,G,W
Q,J,F,Z,E,O,Y,N,F,S,L,U,M,S,Z
P,A,Q,W,E,N,T,G,B,S,B,U,D,L,Y
Y,N,L,F,Y,P,F,W,C,S,A,C,Q,V,B
D,H,S,B,P,X,I,D,X,Q,M,T,W,E,R
V,P,E,J,T,A,P,G,Z,B,O,H,N,D,W
I,U,S,F,M,C,A,T,A,K,A,I,A,Z,X
U,G,W,U,S,X,X,A,I,K,P,S,N,F,D
Q,A,G,J,B,S,M,D,K,Q,V,W,M,A,F
Q,T,B,C,E,R,S,A,Z,S,G,M,O,F,E
Z,T,Q,G,U,L,O,B,B,X,O,Z,R,H,Y
D,E,V,E,L,O,P,M,E,N,T,O,Z,K,T`;

class WordSearch {
  constructor( res = response ) {
    this.grid = [];
    this.answers = [];

    this.transformData( res );
  }

  get( which ) {
    return this[ which ];
  }

  transformData( res ) {
    const lines = res.split( /\n/g );

    if( lines.length > 1 ) {
      const answers = lines.shift();

      this.answers = answers.split( ',' );

      this.grid = lines.map( ( line ) => line.split( ',' ) );

      if( this.grid.length !== this.grid[ 0 ].length ) {
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

  findWordHorizontally( answer ) {
    const answerRE = new RegExp( answer, 'i' );
    let str = '';

    for( let row = 0; row < this.grid.length; row++ ) {
      const rowAsString = this.grid[ row ].join( '' );
      const match = rowAsString.match( answerRE );

      if( match ) {
        str += `${answer}: ${this.buildAnswer( match.index, row )}`;

        for( let i = 1; i < answer.length; i++ ) {
          str += this.buildAnswer( i, row, i < ( answer.length - 1 ) );
        }
      }
    }

    if( str ) {
      return str;
    } else {
      console.log( `Not able to find ${answer}` );
    }
  }

  findWordVertically( answer ) {
    const firstLetter = answer.substr( 0, 1 );
    const beginning = `${answer}: `;
    let str = beginning;

    for( let row = 0; row < ( this.grid.length - answer.length + 1 ); row++ ) {
      const currentRow = this.grid[ row ];

      for( let col = 0; col < currentRow.length; col++ ) {
        const letter = currentRow[ col ];

        if( letter === firstLetter ) {
          str += this.buildAnswer( col, row );

          for( let a = 1; a < answer.length; a++ ) {
            const nextLetter = answer.substr( a, 1 );
            const nextRow = this.grid[ row + a ];

            if( nextLetter === nextRow[ col ] ) {
             str += this.buildAnswer( col, row + a, a < ( answer.length - 1 ) );
            } else {
              str = beginning;

              break;
            }
          }
        }

        if( str !== beginning ) {
          return str;
        }
      }
    }

    console.log( `Not able to find ${answer}` );
  }
}

module.exports = WordSearch;
