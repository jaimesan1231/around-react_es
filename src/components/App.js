import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState();
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState();
  const [currentUser, setCurrentUser] = React.useState("");
  const [cards, setCards] = React.useState([]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleDeleteCardClick = (card) => {
    setSelectedCard(card);
    setIsDeleteCardPopupOpen(true);
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
    setIsDeleteCardPopupOpen(false);
  };

  const handleCardClick = (card) => {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  };
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      });
  };
  const handleDeleteCard = (cardId) => {
    api.deleteCard(cardId).then((res) => {
      if (res.ok) {
        setCards((state) => state.filter((c) => c._id !== cardId));
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
  };

  const handleUpdateUser = ({ name, about }) => {
    api
      .editProfile({ name, about })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .then((data) =>
        setCurrentUser({ ...currentUser, name: data.name, about: data.about })
      );
  };
  const handleUpdateAvatar = (link) => {
    api.editAvatar(link).then((res) => {
      if (res.ok) {
        setCurrentUser({ ...currentUser, avatar: link });
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
  };
  const handleAppPlaceSubmit = ({ title, link }) => {
    api
      .postCard({ title, link })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error:${res.status}`);
        }
      })
      .then((newCard) => {
        setCards([newCard, ...cards]);
      });
  };

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error:${res.status}`);
        }
      })
      .then((data) => {
        setCurrentUser(data);
      });
  }, []);
  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error:${res.status}`);
        }
      })
      .then((data) => {
        setCards(data);
      });
  }, []);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header />
        <Main
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onDeleteCardClick={handleDeleteCardClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          cards={cards}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAppPlaceSubmit}
        />
        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          selectedCard={selectedCard}
          onDeleteCard={handleDeleteCard}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          selectedCard={selectedCard}
          onClose={closeAllPopups}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
