import React, { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  // открытие попапа редактирования данных профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  // открытие попапа добавления картинки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  // открытие попапа изменения аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  // Открытие поапа картинки при клике на карточку
  function handleCardClick({ link, name }) {
    setImagePopupOpen(true);
    setSelectedCard({ link, name });
  }

  //закрытие попапов
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
  }
  //_________________________________________________________________________________________
  // Спасибо за ревью! Извините, что не все "можно лучше" исправил. Исправлю в следующей. Дедлайн жёсткий :)
  //_________________________________________________________________________________________

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        name="edit-form"
        title="Редактировать профиль"
        btnText="Сохранить">
        <input
          type="text"
          id="name-card"
          className="popup__field popup__field_name popup__field_edit-form"
          name="name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="error" id="name-card-error"></span>
        <input
          type="text"
          id="about-myself"
          className="popup__field popup__field_about popup__field_edit-form"
          name="about-myself"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="error" id="about-myself-error"></span>
      </PopupWithForm>

      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        name="add-form"
        title="Новое место"
        btnText="Создать">
        <input
          type="text"
          id="name-of-picture"
          className="popup__field popup__field_add-form popup__field_name-of-picture"
          name="name-of-picture"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
        />
        <span className="error" id="name-of-picture-error"></span>
        <input
          type="url"
          id="link"
          className="popup__field popup__field_add-form popup__field_link"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="error" id="link-error"></span>
      </PopupWithForm>

      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        name="change-avatar"
        title="Обновить аватар"
        btnText="Сохранить">
        <input
          type="url"
          id="link-of-avatar"
          className="popup__field popup__field_change-avatar popup__field_link"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="error" id="link-of-avatar-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="delete-card"
        title="Вы уверены?"
        btnText="Да"></PopupWithForm>

      <ImagePopup
        className="popup popup-photo"
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}></ImagePopup>
    </div>
  );
}

export default App;
