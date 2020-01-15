const WordSearch = require( './WordSearch' );

test( 'WordSearch class exists', () => {
    expect( new WordSearch() );
} );

test( 'API request gets puzzle and answers', () => {
    const ws = new WordSearch();

    expect( ws.get( 'puzzle' ).length ).toBeGreaterThan( 0 );
    expect( typeof ws.get( 'answers' ) ).toBe( 'object' );
    expect( ws.get( 'answers' ).length ).toBeGreaterThan( 0 );
} );
