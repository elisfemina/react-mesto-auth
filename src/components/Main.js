import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import Card from "./Card";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={`${currentUser.avatar}`}
            alt="Фото профиля"
          />
          <button
            className="profile__avatar-button"
            onClick={props.onEditAvatar}
            type="button"></button>
        </div>
        <div className="profile__info-wrapper">
          <div className="profile__info-inner">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              onClick={props.onEditProfile}
              type="button"></button>
          </div>
          <p className="profile__text">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          onClick={props.onAddPlace}
          type="button"></button>
      </section>

      <section className="elements">
        {props.cards.map((card) => (
          <Card
            card={card}
            onCardClick={props.onCardClick}
            key={card._id}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
