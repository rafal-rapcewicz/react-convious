import React from "react";

import { Card as CardEntity, Color } from "../../domain/card";
import "./Card.scss";

interface CardProps {
  card: CardEntity;
  flipped: Boolean;
  highlight: Boolean;
  onClick: (card: CardEntity) => void;
}

export const Card = React.memo<CardProps>(
  ({ card, flipped, highlight, onClick }) => {
    const getClassName = () => {
      return ["Card"]
        .concat(card.color)
        .concat(flipped ? "flipped" : [])
        .concat(highlight ? "highlight" : [])
        .join(" ");
    };

    return (
      <div className={getClassName()}>
        {!flipped && (
          <div className="Card__back" onClick={() => onClick(card)}></div>
        )}
        {flipped && (
          <div className="Card__front">
            <span className="color" />
            <span className="symbol">{card.symbol}</span>
          </div>
        )}
      </div>
    );
  }
);
