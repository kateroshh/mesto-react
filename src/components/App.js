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
        <button className='popup-form__send' type='submit' disabled={false}>
          Сохранить
        </button>
      </PopupWithForm>

      <PopupWithForm
        name='create'
        title='Новое место'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
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
        <button className='popup-form__send' type='submit'>
          Создать
        </button>
      </PopupWithForm>

      <PopupWithForm
        name='avatar'
        title='Обновить аватар'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
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
        <button className='popup-form__send' type='submit' disabled={false}>
          Сохранить
        </button>
      </PopupWithForm>

      <ImagePopup
        {...selectedCard}
        isOpen={isPhotoPopupOnen}
        onClose={closeAllPopups}
      />

      <div className='popup popup-delete-card'>
        <div className='popup__container'>
          <h3 className='popup__text'>Вы уверены?</h3>
          <form className='popup__form popup-form' name='delete-card'>
            <button className='popup-form__send' type='submit'>
              Да
            </button>
          </form>
          <button
            className='popup__close popup__close_delete-card'
            aria-label='Закрыть'
            type='button'
          ></button>
        </div>
      </div>
    </div>
  );
}

export default App;
