import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditAvatarPopupOpen, setEditAvatarState] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfileState] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlaceState] = React.useState(false);
  const [isImagePopupOpen, setImagePopupState] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

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
    setSelectedCard({});
  }

  return (
    <div className="page">

      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <Footer />

      <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        buttonText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <>
          <input type="text" className="popup__text popup__text_type_name" id="name-input" name="name" required minLength="2"
            maxLength="40" />
          <span className="popup__text-error name-input-error"></span>
          <input type="text" className="popup__text popup__text_type_caption" id="caption-input" name="about" required
            minLength="2" maxLength="200" />
          <span className="popup__text-error caption-input-error"></span>
        </>
      </PopupWithForm>

      <PopupWithForm
        name="add"
        title="Новое место"
        buttonText="Сохранить"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <>
        <input type="text" placeholder="Название" className="popup__text popup__text_type_image" name="name"
            id="image-input" required minLength="2" maxLength="30" />
          <span className="popup__text-error image-input-error"></span>
          <input type="url" placeholder="Ссылка на картинку" className="popup__text popup__text_type_link" id="link-input"
            name="link" required />
          <span className="popup__text-error link-input-error"></span>
        </>
      </PopupWithForm>

      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <>
        <input type="url" placeholder="Ссылка на аватарку" className="popup__text popup__text_type_link" id="avatar-input"
            name="avatar" required />
          <span className="popup__text-error avatar-input-error"></span>
        </>
      </PopupWithForm>

      <PopupWithForm
        name="avatar"
        title="Вы уверены?"
        buttonText="Да" />

        <ImagePopup 
        isOpen={isImagePopupOpen}
        card={selectedCard}
        onClose={closeAllPopups}
        />

    </div>
  );
}

export default App;
