import React, { useState, useEffect } from "react";
import { api } from "../utils/Api";

function Main(props) {
  const [userName, setUserName] = useState("userName");
  const [userDescription, setUserDescription] = useState("userDescription");
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    api.getUserInfo().then((res) => {
      setUserName(res.name);
      setUserDescription(res.about);
      setUserAvatar(res.avatar);
    });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            // style={{ backgroundImage: `url(${userAvatar})` }}
            className="profile__avatar"
            src={userAvatar}
            alt="Фото профиля"
          />
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

      <section className="elements"></section>
    </main>
  );
}

export default Main;
