import React from "react";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <div className="element">
      <button className="element__remove-button element__remove-button_invisible"></button>
      <img
        className="element__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="element__wrapper">
        <h2 className="element__text"> {props.name} </h2>
        <div className="element__block-with-likes">
          <button className="element__vector" type="button"></button>
          <p className="element__number-of-likes">{props.likes}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
