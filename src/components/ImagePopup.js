function ImagePopup({ src, text, onClose }) {
  return (
    <div className={`popup popup-photo ${src ? "popup_opened" : ""}`}>
      <div className='popup__container popup__container_photo'>
        <img className='popup__img' src={src} alt={text} />
        <p className='popup__description'>{text}</p>
        <button
          className='popup__close popup__close_photo'
          aria-label='Закрыть'
          onClick={onClose}
          type='button'
        ></button>
      </div>
    </div>
  );
}
export default ImagePopup;
