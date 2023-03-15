import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState();
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState();
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  };
  const handleCardClick = (link) => {
    setIsImagePopupOpen(true);
    setSelectedCard(link);
  };
  return (
    <div className="page__content">
      <Header />
      <Main
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onEditAvatarClick={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <PopupWithForm
        title="Editar"
        name="edit"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <>
          <label className="form__label">
            <input
              type="text"
              className="form__input"
              id="name"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="form__input-error" id="name-error"></span>
          </label>
          <label className="form__label">
            <input
              type="text"
              className="form__input"
              id="job"
              minLength="2"
              maxLength="200"
              required
            />
            <span className="form__input-error" id="job-error"></span>
          </label>
          <button className="form__button form__button_disabled">
            Guardar
          </button>
        </>
      </PopupWithForm>
      <PopupWithForm
        title="Agregar"
        name="add"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <>
          <label className="form__label">
            <input
              type="text"
              className="form__input"
              id="title"
              placeholder="Titulo"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="form__input-error" id="title-error"></span>
          </label>
          <label className="form__label">
            <input
              type="url"
              className="form__input"
              id="link"
              placeholder="Enlace a la imagen"
              required
            />
            <span className="form__input-error" id="link-error"></span>
          </label>
          <button className="form__button form__button_disabled">Crear</button>
        </>
      </PopupWithForm>
      <PopupWithForm
        title="Avatar"
        name="avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <>
          <label className="form__label">
            <input
              type="url"
              className="form__input"
              id="avatar"
              placeholder="Enlace a la imagen"
              required
            />
            <span className="form__input-error" id="avatar-error"></span>
          </label>
          <button className="form__button form__button_disabled">
            Guardar
          </button>
        </>
      </PopupWithForm>
      <PopupWithForm title="Eliminar" name="delete">
        <button className="form__button form__button_disabled">Sí</button>
      </PopupWithForm>
      <ImagePopup
        isOpen={isImagePopupOpen}
        selectedCard={selectedCard}
        onClose={closeAllPopups}
      />
      <Footer />
    </div>
  );
}

export default App;
