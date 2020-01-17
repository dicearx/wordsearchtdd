const WordSearch = require( './WordSearch' );

const ws1 = new WordSearch(`BONES,KHAN,KIRK,SCOTTY,SPOCK,SULU,UHURA
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
K,Y,L,B,Q,Q,P,M,D,F,C,K,E,A,B`);
const ws2 = new WordSearch(`DEVELOPMENT,DRIVEN,KATA,TEST,THIS
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
D,E,V,E,L,O,P,M,E,N,T,O,Z,K,T`);

test( 'API request gets puzzle and answers', () => {
  expect( ws1.get( 'puzzle' ).length ).toBeGreaterThan( 0 );
  expect( ws1.get( 'answers' ).length ).toBeGreaterThan( 0 );
} );

test( 'Should find SCOTTY horizontally', () => {
  expect( ws1.findWordHorizontally( 'SCOTTY' ) ).toBe( 'SCOTTY: (0,5),(1,5),(2,5),(3,5),(4,5),(5,5)' );
} );

test( 'Should find DEVELOPMENT horizontally', () => {
  expect( ws2.findWordHorizontally( 'DEVELOPMENT' ) ).toBe( 'DEVELOPMENT: (0,14),(1,14),(2,14),(3,14),(4,14),(5,14),(6,14),(7,14),(8,14),(9,14),(10,14)' );
} );
