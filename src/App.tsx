import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "./store/reducers/rootReducer";
import {
  setFlipped,
  setIsBusy,
  increaseCounter,
  addToFlipped,
  reset
} from "./store/reducers/game";
import { Card } from "./components/card";
import { Card as CardEntity } from "./domain/card";
import "./App.scss";

const App = () => {
  const dispatch = useDispatch();
  const { cardDeck, flipped, counter, isBusy } = useSelector(
    (state: RootState) => state.game
  );
  const onReset = () => {
    dispatch(reset());
  };
  const getFlipped = (card: CardEntity) => flipped.includes(card);
  const getHighlight = (card: CardEntity) => {
    const indexOfLastCard = flipped.length - 1;
    const isFirstCardOfRevealedPair =
      flipped.length % 2 === 1 && flipped[indexOfLastCard] === card;
    const isInNewlyReavilingPair =
      isBusy && flipped.slice(indexOfLastCard - 1).includes(card);

    if (isFirstCardOfRevealedPair || isInNewlyReavilingPair) return true;

    return false;
  };
  const flip = useCallback(
    (card: CardEntity) => {
      if (isBusy) return;

      dispatch(setIsBusy({ isBusy: true }));
      dispatch(addToFlipped(card));
    },
    [dispatch, isBusy]
  );

  useEffect(() => {
    if (!isBusy) return;

    const isClickOnSecondCardFromAPair = flipped.length % 2 === 0;

    if (!isClickOnSecondCardFromAPair) {
      dispatch(setIsBusy({ isBusy: false }));

      return;
    }

    const timeoutRef = setTimeout(() => {
      const indexA = flipped.length - 2;
      const cardA = flipped[indexA];
      const cardB = flipped[indexA + 1];

      dispatch(setIsBusy({ isBusy: false }));
      dispatch(increaseCounter());

      if (cardA.symbol !== cardB.symbol) {
        dispatch(setFlipped({ flipped: flipped.slice(0, indexA) }));
      }
    }, 1000);

    return () => clearTimeout(timeoutRef);
  }, [dispatch, isBusy, flipped]);

  return (
    <div className="App">
      <header>
        <button onClick={onReset}>Reset</button>
        <h3>COUNTER: {counter}</h3>
      </header>
      <main>
        {cardDeck.map((card, index) => (
          <Card
            card={card}
            flipped={getFlipped(card)}
            highlight={getHighlight(card)}
            onClick={flip}
            key={index}
          />
        ))}
      </main>
    </div>
  );
};

export default App;
