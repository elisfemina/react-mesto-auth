import React, { useState, useEffect } from "react";
import { api } from "../utils/Api";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = useState("userName");
  const [userDescription, setUserDescription] = useState("userDescription");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  //Получить данные юзера
  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch((err) => console.log(err));
  }, []);

  //Получить карточки с сервера
  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        const formattedCards = res.map((card) => {
          return {
            id: card._id,
            link: card.link,
            name: card.name,
            likes: card.likes.length,
          };
        });
        setCards(formattedCards);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img src={userAvatar} className="profile__avatar" alt="Аватар" />
          <button
            onClick={props.onEditAvatar}
            className="profile__avatar-button"
            type="button"></button>
        </div>

        <div className="profile__info-wrapper">
          <div className="profile__info-inner">
            <h1 className="profile__name">{userName}</h1>
            <button
              onClick={props.onEditProfile}
              className="profile__edit-button"
              type="button"></button>
          </div>
          <p className="profile__text">{userDescription}</p>
        </div>

        <button
          onClick={props.onAddPlace}
          className="profile__add-button"
          type="button"></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            card={card}
            key={card.id}
            link={card.link}
            name={card.name}
            likes={card.likes}
            onCardClick={props.onCardClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
