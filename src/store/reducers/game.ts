import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CardDeck, getCardDeck, shufleCardDeck } from '../../domain/cardDeck';
import { Card } from '../../domain/card';

export interface CardDeckPart {
  cardDeck: CardDeck;
}

export interface FlippedPart {
    flipped: Card[];
}

export type GameState = CardDeckPart & FlippedPart;

const initialState: GameState = {
    cardDeck: shufleCardDeck(getCardDeck()),
    flipped: []
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCardDeck(state, action: PayloadAction<CardDeckPart>) {
      const { cardDeck } = action.payload;
      state.cardDeck = cardDeck;
    },
    setFlipped(state, action: PayloadAction<FlippedPart>) {
      const { flipped } = action.payload;
      state.flipped = flipped;
    },
  },
});

export const { setCardDeck, setFlipped } = gameSlice.actions;

export default gameSlice.reducer;
