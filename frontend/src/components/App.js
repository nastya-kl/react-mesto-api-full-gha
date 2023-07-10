import React from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import api from '../utils/Api';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import auth from "../utils/Auth";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePupopOpen, setIsImagePupopOpen] = React.useState(false);
  const [isConfirmPupopOpen, setIsConfirmPupopOpen] = React.useState(false);
  const [isInfoTooltipPupopOpen, setIsInfoTooltipPupopOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipCorrect, setIsInfoTooltipCorrect] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn === true) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData.data);
        setCards(cardsData.data.reverse());
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(data) {
    setSelectedCard(data);
    setIsImagePupopOpen(true);
  }

  function handleConfirmPopupclick(data) {
    setSelectedCard(data);
    setIsConfirmPupopOpen(true);
  }

  function handleUpdateUser(userInfo) {
    setIsLoading(true)
    api.changeUserInfo(userInfo)
      .then((user) => {
        setCurrentUser(user.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setIsLoading(false))
  }

  function handleUpdateAvatar(userInfo) {
    setIsLoading(true)
    api.changeUserAvatar(userInfo)
      .then((user) => {
        setCurrentUser(user.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setIsLoading(false))
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true)
    api.addNewCard(card)
      .then((card) => {
        setCards([card.data, ...cards]); 
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setIsLoading(false))
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePupopOpen(false);
    setIsConfirmPupopOpen(false);
    setIsInfoTooltipPupopOpen(false)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards => cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  function handleRegister(email, password) {
    auth.register(email, password)
      .then((res) => {
        if(res) {
          setIsInfoTooltipCorrect(true);
          navigate("/sign-in", {replace: true})
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsInfoTooltipCorrect(false);
      })
      .finally(() => {
        setIsInfoTooltipPupopOpen(true);
      })
  }

  function handdleLogin(email, password) {
    auth.authorize(email, password)
    .then((res) => {
      if(res.token) {
        localStorage.setItem("jwt", res.token);
        setUserEmail(`${email}`);
        setLoggedIn(true);
        navigate("/", {replace: true})
      }
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      setIsInfoTooltipCorrect(false);
      setIsInfoTooltipPupopOpen(true);
    })
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');

    if (jwt){
      auth.checkToken(jwt)
        .then((res) => {
          if(res) {
            setUserEmail(`${res.data.email}`);
            setLoggedIn(true);
            navigate('/', {replace: true})
          }
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
    };
  }

  
  React.useEffect(() => {
    handleTokenCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    navigate('/sign-in', {replace: true})
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={userEmail}
          onLogout={handleLogout}
        />

        <Routes>
          <Route path='/' element={<ProtectedRoute
            element={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleConfirmPopupclick}
            cards={cards}
            loggedIn={loggedIn}/>}
          />

          <Route path='/sign-up' element={
            <Register
              title='Регистрация'
              buttonText='Зарегистрироваться'
              onRegister={handleRegister}
            />}
          /> 

          <Route path='/sign-in' element={
            <Login
              title='Вход'
              buttonText='Войти'
              onLogin={handdleLogin}
            />}
          />

          <Route path='*' element={loggedIn ? <Navigate to='/'/> : <Navigate to='/sign-in'/>}/>
        </Routes>

        {loggedIn && <Footer/>}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        /> 

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        /> 

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        /> 

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePupopOpen}
          onClose={closeAllPopups}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmPupopOpen}
          onClose={closeAllPopups}
          onDelete={handleCardDelete}
          card={selectedCard}
        />

        <InfoTooltip
          isOpen={isInfoTooltipPupopOpen}
          onClose={closeAllPopups}
          isCorrect={isInfoTooltipCorrect}
          title={isInfoTooltipCorrect ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}
        />
        
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
