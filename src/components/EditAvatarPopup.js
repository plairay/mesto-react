import PopupWithForm from './PopupWithForm';
import { useRef, useState } from 'react';


function EditAvatarPopup(props) {

    const [avatar, setAvatar] = useState('');
    const avatarRef = useRef();

    function handleAvatarChange(e) {
        setAvatar(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        });
        setAvatar('');
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            name="edit-avatar"
            title="Обновить аватар"
            button="Сохранить"
            onSubmit={handleSubmit}
        >
            <label className="popup__label">     
                <input 
                    type="url" 
                    className="popup__input popup__add-url" 
                    name="avatar" 
                    value={avatar} 
                    ref={avatarRef}
                    placeholder="Ссылка на аватар" 
                    onChange={handleAvatarChange}
                    required
                /> 
                <span className="popup__error" id="avatar-error"></span>
            </label>  
        </PopupWithForm>
    );
}

export default EditAvatarPopup;