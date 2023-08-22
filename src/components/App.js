import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isPhotoPopupOnen, setPhotoPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch((err) => {
        console.log(
          "Ошибка получения данных пользователя и первоначального списка карточек",
          err
        );
      });
  }, []);

  function handleCardLike(likes, id) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === id ? newCard : c)));
    });
  }

  function handleCardDelete(id) {
    api.deleteCard(id);
    const result = cards.filter((card) => card._id !== id);
    setCards(result);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handlePhotoClick() {
    setPhotoPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setPhotoPopupOpen(false);
  }

  function handleUpdateUser(user) {
    api
      .saveUserInfo(user.name, user.about)
      .then((newUserInfo) => {
        //setCurrentUser({ ...currentUser, name: user.name, about: user.about });
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка создания новой карточки", err);
      });
  }

  function handleUpdateUserAvatar(avatar) {
    api
      .saveUserAvatar(avatar)
      .then((newUserInfo) => {
        //setCurrentUser({ ...currentUser, avatar });
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка обновления аватара", err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .createNewCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка создания новой карточки", err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header />
        <Main
          onCardClick={setSelectedCard}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onPhotoClick={handlePhotoClick}
          cards={cards}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUserAvatar}
        />

        <ImagePopup
          {...selectedCard}
          isOpen={isPhotoPopupOnen}
          onClose={closeAllPopups}
        />

        {/* <PopupWithForm
          name='delete'
          title='Вы уверены?'
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          buttonText='Да'
        ></PopupWithForm> */}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
