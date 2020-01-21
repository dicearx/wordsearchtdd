const response = `BONES,KHAN,KIRK,SCOTTY,SPOCK,SULU,UHURA
U,M,K,H,U,L,K,I,N,V,J,O,C,W,E
L,L,S,H,K,Z,Z,W,Z,C,G,J,U,Y,G
H,S,U,P,J,P,R,J,D,H,S,B,X,T,G
B,R,J,S,O,E,Q,E,T,I,K,K,G,L,E
A,Y,O,A,G,C,I,R,D,Q,H,R,T,C,D
S,C,O,T,T,Y,K,Z,R,E,P,P,X,P,F
B,L,Q,S,L,N,E,E,E,V,U,L,F,M,Z
O,K,R,I,K,A,M,M,R,M,F,B,A,P,P
N,U,I,I,Y,H,Q,M,E,M,Q,R,Y,F,S
E,Y,Z,Y,G,K,Q,J,P,C,Q,W,Y,A,K
S,J,F,Z,M,Q,I,B,D,B,E,M,K,W,D
T,G,L,B,H,C,B,E,C,H,T,O,Y,I,K
O,J,Y,E,U,L,N,C,C,L,Y,B,Z,U,H
W,Z,M,I,S,U,K,U,R,B,I,D,U,X,S
K,Y,L,B,Q,Q,P,M,D,F,C,K,E,A,B`;

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

    for( let row = 0; row < this.grid.length; row++ ) {
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
