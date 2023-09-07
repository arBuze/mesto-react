import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({isOpen: false});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({isOpen: false});
  }

  function handleCardClick(card) {
    setSelectedCard({isOpen: true, link: card.link, description: card.name});
  }

  return (
    <div className="page__content">
      <Header />
      <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick} />
      <Footer />
      <PopupWithForm name="edit-avatar" title="Обновить аватар" buttonTitle="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
        children={
          <>
            <input type="url" required placeholder="Ссылка на картинку" className="popup__item popup__item_el_link" name="avatar" id="avatar-link-input"/>
            <span className="popup__input-error avatar-link-input-error"></span>
          </>
        }
      />
      <PopupWithForm name="edit-profile" title="Редактировать профиль" buttonTitle="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
        children={
          <>
            <input type="text" required placeholder="Никнейм" className="popup__item popup__item_el_name" name="nickname" id="name-input" minLength="2" maxLength="40" />
            <span className="popup__input-error name-input-error"></span>
            <input type="text" required placeholder="Статус" className="popup__item popup__item_el_status" name="status" id="status-input" minLength="2" maxLength="200" />
            <span className="popup__input-error status-input-error"></span>
          </>
        }
      />
      <PopupWithForm name="add-place" title="Новое место" buttonTitle="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
        children={
          <>
            <input type="text" required placeholder="Название" className="popup__item popup__item_el_title" name="title" id="title-input" minLength="2" maxLength="30" />
            <span className="popup__input-error title-input-error"></span>
            <input type="url" required placeholder="Ссылка на картинку" className="popup__item popup__item_el_link" name="link" id="link-input" />
            <span className="popup__input-error link-input-error"></span>
          </>
        }
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
    </div>
  );
}

export default App;
