import React from "react";

const Card = ({ card, onCardClick }) => {
  const handleClick = () => {
    onCardClick(card);
  };
  return (
    <li className="card">
      <button className="card__delete-icon card__delete-icon_visible"></button>
      <img
        src={card.link}
        alt=""
        className="card__image"
        onClick={handleClick}
      />
      <div className="card__footer">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button className="card__like-icon"></button>
          <span className="card__like-number card__like-number_visible">
            {card.likes.length}
          </span>
        </div>
      </div>
    </li>
  );
};

export default Card;
