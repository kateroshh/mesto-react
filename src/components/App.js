import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useState } from "react";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isPhotoPopupOnen, setPhotoPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

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

  return (
    <div className='page'>
      <Header />
      <Main
        onCardClick={setSelectedCard}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onPhotoClick={handlePhotoClick}
      />
      <Footer />

      <PopupWithForm
        name='edit'
        title='Редактировать профиль'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        buttonText='Сохранить'
      >
        <input
          className='popup-form__input'
          type='text'
          id='name'
          name='name'
          placeholder='Ваше имя'
          minLength='2'
          maxLength='40'
          required
        />
        <span className='popup-form__error name-error'></span>
        <input
          className='popup-form__input'
          type='text'
          id='description'
          name='link'
          placeholder='Ваша профессия'
          minLength='2'
          maxLength='200'
          required
        />
        <span className='popup-form__error description-error'></span>
      </PopupWithForm>

      <PopupWithForm
        name='create'
        title='Новое место'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        buttonText='Создать'
      >
        <input
          className='popup-form__input'
          type='text'
          id='title-card'
          name='name'
          placeholder='Название'
          minLength='2'
          maxLength='30'
          required
        />
        <span className='popup-form__error title-card-error'></span>
        <input
          className='popup-form__input'
          type='url'
          id='link-card'
          name='link'
          placeholder='Ссылка на картинку'
          required
        />
        <span className='popup-form__error link-card-error'></span>
      </PopupWithForm>

      <PopupWithForm
        name='avatar'
        title='Обновить аватар'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonText='Сохранить'
      >
        <input
          className='popup-form__input'
          type='url'
          id='avatar'
          name='avatar'
          placeholder='Укажите ссылку на новый аватар пользователя'
          minLength='2'
          maxLength='500'
          required
        />
        <span className='popup-form__error avatar-error'></span>
      </PopupWithForm>

      <ImagePopup
        {...selectedCard}
        isOpen={isPhotoPopupOnen}
        onClose={closeAllPopups}
      />

      <PopupWithForm
        name='delete'
        title='Вы уверены?'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonText='Да'
      ></PopupWithForm>
    </div>
  );
}

export default App;
