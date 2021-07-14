import React, { useState, useEffect } from "react";
import { api } from "../utils/Api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import { CurrentUserContext } from "../context/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });

  //получение данных о пользователе и карточках из сервера
  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cardList, res]) => {
        setCards(cardList);
        setCurrentUser(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  //обновление информации пользователя
  function handleUpdateUser(data) {
    api
      .editInfo(data)
      .then((res) => setCurrentUser(res))
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  }

  //обновление аватара пользователя
  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data.avatar)
      .then((res) => setCurrentUser(res))
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  }

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

  //добавление новой карточки через форму
  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => setCards([newCard, ...cards]))
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  }

  //закрытие попапов
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
  }

  //лайк карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some((element) => element === currentUser._id); // Проверяем, есть ли уже лайк на этой карточке
    api
      .changeLikeCardStatus(card._id, !isLiked) // Отправляем запрос в API и получаем обновлённые данные карточки
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  //удаление карточки
  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          cards={cards}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        {/*попап редактирования данных профиля*/}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/*попап изменения аватара*/}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/*попап добавления картинки*/}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        {/*попап открытия картинки*/}
        <ImagePopup
          className="popup popup-photo"
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}></ImagePopup>

        {/*попап удаления карточки*/}
        <PopupWithForm name="delete-card" title="Вы уверены?"></PopupWithForm>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
