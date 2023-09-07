import React, { useEffect } from 'react';
import { api } from '../utils/Api';
import Card from './Card';



function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);

        setCards(cardsData);

      })
      .catch( err => {
        console.log(err);
      });
  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__information">
            <button className="profile__avatar-btn" type="button" onClick={props.onEditAvatar}>
              <img className="profile__avatar" src={userAvatar} alt="аватар профиля"/>
            </button>
            <div className="profile__info">
              <div className="profile__item">
                <h1 className="profile__name">{userName}</h1>
                <button className="profile__edit-btn" type="button" onClick={props.onEditProfile}></button>
              </div>
              <p className="profile__status">{userDescription}</p>
            </div>
          </div>
          <button className="profile__add-btn" type="button" onClick={props.onAddPlace}></button>
        </div>
      </section>
      <section className="photo-feed">
        <ul className="photo-feed__list">
          {cards.map((data) => {
            return(<Card key={data._id} card={data} onCardClick={props.onCardClick} />)
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
