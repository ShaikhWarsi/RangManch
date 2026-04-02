import React from 'react';
import './StateComponent.css';

interface CardProps {
  imageSrc: string;
  current_state: string;
}

const Card = ({ imageSrc, current_state }: CardProps) => {
  return (
    <div className={"card " + current_state}>
      <div className="card__image">
        <img src={imageSrc} alt="" />
      </div>
    </div>
  );
}

export default Card;
