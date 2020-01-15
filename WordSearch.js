const response = require( './api.json' );

class WordSearch {
    constructor() {
        this.puzzle = response.puzzle;
        this.answers = response.answers;
    }

    get( which ) {
        return this[ which ];
    }
}

module.exports = WordSearch;
