import React from 'react';
import api from '../utils/api';
import Card from './Card';

function Main(props) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then((user) => {
        setUserName(user.name);
        setUserDescription(user.about);
        setUserAvatar(user.avatar);
      })
      .catch((err) => {
        console.log(err);
      })
  },[])

  React.useEffect(() => {
    api.getCards()
    .then((data) => {
      setCards(data);
    })
    .catch((err) => {
      console.log(err);
    })
  },[])

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img src={userAvatar} alt=" "
            className="profile__avatar" />
          <button className="profile__avatar-edit" type="button" onClick={props.onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
          <p className="profile__caption">{userDescription}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="cards">
        {cards.map(card => (
          <Card
          key={card._id}
          card={card}
          onCardClick={props.onCardClick}
          />
        ))}
      </section>
    </main>
  )

}

export default Main;