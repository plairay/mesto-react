import {useState, useEffect} from 'react';
import {api} from '../utils/Api.js';
import Card from './Card.js';



function Main(props) {

    const [userName, setUserName] = useState([]);
    const [userDescription , setUserDescription] = useState([]);
    const [userAvatar, setUserAvatar] = useState([]);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getUserInfo().then((userData) => {
          setUserAvatar(userData.avatar);
          setUserDescription(userData.about);
          setUserName(userData.name);
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
    

    return(
        <main className="content">

            <section className="profile">
                <div className="profile__info">
                    <div className ="profile__avatar-container" onClick={props.onEditAvatar}>
                        <img src={userAvatar} className="profile__image" alt="аватар"/>
                    </div>    
                    <div className="profile__name">
                        <h1 className="profile__title">{userName}</h1>
                        <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button> 
                        <p className="profile__subtitle">{userDescription}</p>
                    </div>             
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>
            
            <section className="cards">

                {cards.map((item) => {
                    return (  
                        
                        <Card name={item.name}
                        link={item.link} 
                        likes={item.likes.length} 
                        key={item._id} 
                        onCardDelete={props.onCardDelete} 
                        onCardClick={props.onCardClick}
                        />
                        
                    )
                })}

            </section>

        </main>
    )
}


export default Main;