import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "./store/reducers/rootReducer";
import { setCardDeck, setFlipped } from "./store/reducers/game";
import { Card } from "./components/card";
import { Card as CardEntity } from './domain/card';
import { getCardDeck, shufleCardDeck } from './domain/cardDeck';
import "./App.scss";

const App = () => {
  const dispatch = useDispatch();
  const { cardDeck, flipped } = useSelector((state: RootState) => state.game);
  const onReset = () => {
    const newCardDeck = shufleCardDeck(getCardDeck());

    dispatch(setCardDeck({ cardDeck: newCardDeck }));
    dispatch(setFlipped({ flipped: [] }));
  }
  const getFlipped = (card: CardEntity) => flipped.includes(card);

  return (
    <div className="App">
      <header>
        <button onClick={onReset}>Reset</button>
        <h3>foo</h3>
      </header>
      <main>
        {cardDeck.map((card, index) => (
          <Card card={card} flipped={getFlipped(card)} key={index} />
        ))}
      </main>
    </div>
  );
};

export default App;
