export enum Symbol {
    NINE = '9',
    TEN = '10',
    JACK = 'J',
    QUEEN = 'Q',
    KING = 'K',
    ACE = 'A'
};

export enum Color {
    SPADES = 'spades',
    CLUBS = 'clubs',
    DIAMONDS = 'diamonds',
    HEARTS = 'hearts'
};

export interface Card {
    symbol: Symbol;
    color: Color;
};
