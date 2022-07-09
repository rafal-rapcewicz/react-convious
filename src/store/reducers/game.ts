import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CardDeck, getCardDeck, shufleCardDeck } from "../../domain/cardDeck";
import { Card } from "../../domain/card";

export interface CardDeckPart {
  cardDeck: CardDeck;
}

export interface FlippedPart {
  flipped: Card[];
}

export interface IsBusyPart {
  isBusy: boolean;
}

export interface CounterPart {
  counter: number;
}

export type GameState = CardDeckPart & FlippedPart & IsBusyPart & CounterPart;

const initialState: GameState = {
  cardDeck: shufleCardDeck(getCardDeck()),
  counter: 0,
  flipped: [],
  isBusy: false,
};

const gameSlice = createSlice({
  name: "game",
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
    setIsBusy(state, action: PayloadAction<IsBusyPart>) {
      const { isBusy } = action.payload;
      state.isBusy = isBusy;
    },
    increaseCounter(state) {
      state.counter = state.counter + 1;
    },
    addToFlipped(state, action: PayloadAction<Card>) {
      state.flipped = state.flipped.concat(action.payload);
    },
    reset(state) {
      state.cardDeck = shufleCardDeck(state.cardDeck);
      state.counter = 0;
      state.flipped = [];
      state.isBusy = false;
    },
  },
});

export const {
  setCardDeck,
  setFlipped,
  setIsBusy,
  increaseCounter,
  addToFlipped,
  reset
} = gameSlice.actions;

export default gameSlice.reducer;
