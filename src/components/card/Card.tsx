import React from "react";

import { Card as CardEntity } from '../../domain/card';
import "./Card.scss";

interface CardProps {
    card: CardEntity;
    flipped: Boolean;
};

export const Card = React.memo<CardProps>(({ card, flipped }) => {
  return (
    <div className="Card">
      CARD
    </div>
  );
});
