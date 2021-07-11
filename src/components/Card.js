import React from "react";

function Card(card) {
  function handleClick() {
    card.onCardClick(card);
  }

  return (
    <div className="element">
      <button className="element__remove-button element__remove-button_invisible"></button>
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__wrapper">
        <h2 className="element__text"> {card.name} </h2>
        <div className="element__block-with-likes">
          <button className="element__vector" type="button"></button>
          <p className="element__number-of-likes">{card.likes}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
