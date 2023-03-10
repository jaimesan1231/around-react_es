import React from "react";
import addIcon from "../images/add.svg";
import editIcon from "../images/edit.svg";
import api from "../utils/api";
import Card from "./Card";
const Main = ({
  children,
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
}) => {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

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
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
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
    <main>
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatarClick}>
          <img
            src={userAvatar}
            alt="Persona mayor con el mar de fondo"
            className="profile__avatar"
          />
        </div>

        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className="profile__edit-button" onClick={onEditProfileClick}>
            <img src={editIcon} alt="Icono de editar" />
          </button>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button className="profile__add-button" onClick={onAddPlaceClick}>
          <img src={addIcon} alt="Icono de agregar" />
        </button>
      </section>
      <section>
        <ul className="cards-container">
          {cards.map((card) => (
            <Card card={card} key={card._id} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
