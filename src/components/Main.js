import { useEffect, useState } from "react";
import avatar from "../images/avatar.png";
import api from "../utils/api";
import Card from "./Card";

const dataCards = (cards) => {
  return cards.map((item) => ({
    id: item._id,
    src: item.link,
    text: item.name,
    likesCount: item.likes.length ? item.likes.length : 0,
  }));
};

function Main({ onCardClick, onEditProfile, onAddPlace, onEditAvatar }) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardData]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);

        const newCards = dataCards(cardData);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(
          "Ошибка получения данных пользователя и первоначального списка карточек",
          err
        );
      });
  }, []);

  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile-info'>
          <img
            className='profile-info__avatar'
            src={userAvatar ? userAvatar : avatar}
            alt='Фото профиля'
            onClick={onEditAvatar}
          />
          <div className='profile-info__avatar-hover'></div>
          <div className='profile-info__text'>
            <div className='profile-info__name'>
              <h1 className='profile-info__nametext'>{userName}</h1>
              <button
                className='profile-info__edit'
                aria-label='Редактировать'
                type='button'
                onClick={onEditProfile}
              ></button>
            </div>
            <p className='profile-info__description'>{userDescription}</p>
          </div>
        </div>
        <button
          className='profile__add'
          aria-label='Добавить'
          type='button'
          onClick={onAddPlace}
        ></button>
      </section>

      <section className='gallery'>
        <ul className='gallery-items'>
          {cards.map((item) => (
            <Card key={item._id} {...item} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
