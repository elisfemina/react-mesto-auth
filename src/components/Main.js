import React from "react";

function Main(props) {



  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src="#" alt="Фото профиля" />
          <button
            onClick={props.onEditAvatar}
            className="profile__avatar-button"
            type="button"></button>
        </div>

        <div className="profile__info-wrapper">
          <div className="profile__info-inner">
            <h1 className="profile__name">Жак-Ив-Кусто</h1>
            <button
              onClick={props.onEditProfile}
              className="profile__edit-button"
              type="button"></button>
          </div>
          <p className="profile__text">Исследователь океана</p>
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
