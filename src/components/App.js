import React from 'react';
import {useState} from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
    const [selectedCard, setIsSelectedCard] = useState({name: '' , link: ''});

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleDeleteCardClick() {
        setIsDeleteCardPopupOpen(true);
    }

    function handleCardClick(cardData) {
        setIsSelectedCard(cardData);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsDeleteCardPopupOpen(false);
        setIsSelectedCard({name: '', link: ''});
      }


    return (
        <div className="page">
            <div className="page__container">

                <Header/>

                <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardDelete={handleDeleteCardClick}
                onCardClick={handleCardClick}
                />
        
                <Footer/>

                <PopupWithForm 
                    isOpen={isAddPlacePopupOpen} 
                    onClose={closeAllPopups}
                    name="add-image" 
                    title="Новое место" 
                    button="Создать"
                    children={
                        <> 
                            <label className="popup__label"> 
                                <input type="text" className="popup__input popup__add-place" name="name" defaultValue="" placeholder="Название" required/>
                                <span className="popup__error" id="name-error"></span>
                            </label>
                            <label className="popup__label">     
                                <input type="url" className="popup__input popup__add-url" name="link" defaultValue="" placeholder="Ссылка на картинку" required/> 
                                <span className="popup__error" id="link-error"></span>
                            </label>
                        </> 
                    }
                        
                />

                <PopupWithForm 
                    isOpen={isEditProfilePopupOpen} 
                    onClose={closeAllPopups}
                    name="add-image" 
                    title="Редактировать профиль" 
                    button="Сохранить"
                    children={
                        <> 
                            <label className="popup__label">
                                <input type="text" className="popup__input popup__edit-name" name="title" defaultValue="" placeholder="Имя" required />
                                <span className="popup__error" id="title-error"></span>
                            </label>
                            <label className="popup__label">   
                                <input type="text" className="popup__input popup__edit-profession" name="profession" defaultValue=""  placeholder="О себе" required/>
                                <span className="popup__error" id="profession-error"></span>
                            </label> 
                        </> 
                    }
                        
                />

                <PopupWithForm 
                    isOpen={isEditAvatarPopupOpen} 
                    onClose={closeAllPopups}
                    name="edit-avatar" 
                    title="Обновить аватар" 
                    button="Сохранить"
                    children={
                        <> 
                            <label className="popup__label">     
                                <input type="url" className="popup__input popup__add-url" name="avatar" defaultValue="" placeholder="Ссылка на аватар" required/> 
                                <span className="popup__error" id="avatar-error"></span>
                            </label>  
                        </> 
                    }
                />

                <PopupWithForm 
                    isOpen={isDeleteCardPopupOpen} 
                    onClose={closeAllPopups}
                    name="card-delete" 
                    title="Вы уверены?" 
                    button="Да"
                />

                <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

            </div>
        </div>            
    );
}


export default App;
