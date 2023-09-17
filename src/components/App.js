import React, { useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState();
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch( err => {
        console.log(err);
      });
  },[])

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
    setSelectedCard();
  }

  /* обработчики для работы с карточкой */
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.find(user => user._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then( newCard => {
        setCards(state => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch( err => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(item => !(item._id === card._id)))
      })
      .catch( err => {
        console.log(err);
      });
  }

  /* обработчики сабмитов */
  function handleUpdateUser({name, about}) {
    api.saveUserInfo(name, about)
      .then( userData => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch( err => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({avatar}) {
    api.saveAvatar(avatar)
      .then(userData => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch( err => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit({name, link}) {
    api.addNewCard(name,link)
      .then( newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch( err => {
        console.log(err);
      });
  }

  return (
    <div className="page__content">
      <Header />

      <CurrentUserContext.Provider value={currentUser}>
        <Main cards={cards} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />

        {/* попап редактирования профиля */}
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      </CurrentUserContext.Provider>

      <Footer />

      {/* попап редактирования аватара */}
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      {/* попап добавления карточки */}
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
      {/* попап с картинкой */}
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
    </div>
  );
}

export default App;
