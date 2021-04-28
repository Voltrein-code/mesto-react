import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePopup from './DeletePopup';
import api from '../utils/api';

export default function App() {

  const [isEditAvatarPopupOpen, setEditAvatarState] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfileState] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlaceState] = React.useState(false);
  const [isImagePopupOpen, setImagePopupState] = React.useState(false);
  const [isDeletePopupOpen, setDeletePopupState] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isAvatarLoading, setAvatarLoading] = React.useState(false);
  const [isUserInfoLoading, setUserInfoLoading] = React.useState(false);
  const [isButtonSubmitLoading, setButtonSubmitLoading] = React.useState(false);

  React.useEffect(() => {
    setAvatarLoading(true);
    setUserInfoLoading(true);
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setUserInfoLoading(false);
        setAvatarLoading(false);
      })
  }, [])

  React.useEffect(() => {
    api.getCards()
    .then((data) => {
      setCards(data);
    })
    .catch((err) => {
      console.log(err);
    })
  },[])

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupState(!isImagePopupOpen);
  }

  function handleEditAvatarClick() {
    setEditAvatarState(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setEditProfileState(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setAddPlaceState(!isAddPlacePopupOpen);
  }

  function closeAllPopups() {
    setEditAvatarState(false);
    setEditProfileState(false);
    setAddPlaceState(false);
    setImagePopupState(false);
    setDeletePopupState(false);
    setSelectedCard({});
  }

  function handleUpdateUser(updatedUserInfo) {
    setButtonSubmitLoading(true);
    setUserInfoLoading(true);
    api.setUserInfo(updatedUserInfo)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setUserInfoLoading(false);
        setButtonSubmitLoading(false);
      })
  }

  function handleUpdateAvatar(updatedAvatar) {
    setAvatarLoading(true);
    setButtonSubmitLoading(true);
    api.setAvatar(updatedAvatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setAvatarLoading(false);
        setButtonSubmitLoading(false);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);

    api.changeLikeCardStatus(isLiked, card._id)
      .then((updateCard) => {
        const updatedCards = cards.map((c) => (c._id === card._id ? updateCard : c))
        setCards(updatedCards);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    setButtonSubmitLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        const updatedCards = cards.filter((c) => (c._id !== card._id))
        setCards(updatedCards)
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setButtonSubmitLoading(false);
      })
  }

  function handleAddPlace(card) {
    setButtonSubmitLoading(true);
    api.addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setButtonSubmitLoading(false);
      })
  }

  function handleCardDeleteClick(card) {
    setSelectedCard(card);
    setDeletePopupState(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">

        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDeleteClick={handleCardDeleteClick}
          cards={cards}
          isAvatarLoading={isAvatarLoading}
          isUserInfoLoading={isUserInfoLoading}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isButtonSubmitLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          isLoading={isButtonSubmitLoading}
        />

        <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isButtonSubmitLoading}
        />

        <DeletePopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          isLoading={isButtonSubmitLoading}
          selectedCard={selectedCard}
        />

        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />

      </div>

    </CurrentUserContext.Provider>
  );
}