function Card({ src, text, likesCount, onCardClick }) {
  const handleCardClick = () => {
    onCardClick({ src, text });
  };

  return (
    <div className='gallery-item-template'>
      <li className='gallery-item'>
        <img
          className='gallery-item__img'
          src={src}
          alt={text}
          onClick={handleCardClick}
        />
        <div className='gallery-item__info'>
          <h2 className='gallery-item__text'>{text}</h2>
          <div className='gallery-item__like'>
            <button
              className='gallery-item__btnlike'
              aria-label='Нравится'
              type='button'
            ></button>
            <p className='gallery-item__textlikes'>{likesCount}</p>
          </div>
        </div>
        <button
          className='gallery-item__delete'
          aria-label='Удалить'
          type='button'
        ></button>
      </li>
    </div>
  );
}
export default Card;
