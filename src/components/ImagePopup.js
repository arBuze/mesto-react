import React from 'react';
import '../index.css';

function ImagePopup(props) {
  return(
    <div className={`popup popup_type_photo ${props.card.isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__container_type_photo">
        <button className="popup__close-btn" type="button" onClick={props.onClose}></button>
        <figure className="popup__photo-container">
          <img className="popup__photo" src={props.card.link} alt={props.card.description}/>
          <figcaption className="popup__caption">{props.card.description}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
