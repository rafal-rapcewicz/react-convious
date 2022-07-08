import { Card, Color, Symbol } from "./card";

export type CardDeck = Card[];

export const getCardDeck: () => CardDeck = () => Object.values(Color)
  .map((color) => Object.values(Symbol).map((symbol) => ({ symbol, color })))
  .flat();

export const shufleCardDeck = (cardDeck: CardDeck) => cardDeck.sort(() => Math.random() > 0.5 ? 1 : -1);
