import React from 'react';
import { useState, useEffect } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api }  from '../utils/api';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setIsSelectedCard] = useState({name: '' , link: ''});
    const [currentUser, setCurrentUser] = useState('');
    const [cards, setCards] = useState([]);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }


    function handleCardClick(cardData) {
        setIsSelectedCard(cardData);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsSelectedCard({name: '', link: ''});
    }

    useEffect(() => {
        api.getUserInfo().then((userData) => {
          setCurrentUser(userData);
        })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        api
            .getInitialCards()
            .then((cardsData) => {
              setCards(cardsData);
            })
            .catch((err) => console.log(err));
    }, []);


    function handleUpdateUser(formData) {
        api.setUserInfo(formData).then((formData) => {
          setCurrentUser(formData);
        })
            .catch((err) => console.log(err));
        closeAllPopups();
    }

    function handleUpdateAvatar(formData) {
        api.setUserAvatar(formData).then((formData) => {
          setCurrentUser(formData);
        })
            .catch((err) => console.log(err));
        closeAllPopups();
    }

    function handleAddPlaceSubmit(newCard) {
        api.createCard(newCard).then((newCard) => {
          setCards([newCard, ...cards]);
        })
            .catch((err) => console.log(err));
        closeAllPopups();
      }

    function handleCardDelete(removedCard) {
        api.removeCard(removedCard._id).then(() => {
          const newArr = cards.filter(card => card._id !== removedCard._id);
          setCards(newArr);
        })
            .catch((err) => console.log(err));
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__container">

                    <Header/>

                    <Main
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />
            
                    <Footer/>

                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}  onAddPlace={handleAddPlaceSubmit} /> 

                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}  onUpdateUser={handleUpdateUser} /> 

                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}  onUpdateAvatar={handleUpdateAvatar} /> 

                    <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

                </div>
            </div>    
        </CurrentUserContext.Provider>            
    );
}


export default App;
