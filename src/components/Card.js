import React from 'react';

function Card(props) {

    function handleClick() {
        props.onCardClick({name: props.name, link: props.link});
    }


    return (
        
        <div className="card">
            <img src ={props.link} alt={props.name} className="card__image" onClick={handleClick}/>
            <div className="card__name">
                <h2 className="card__title">{props.name}</h2>
                <div className="card__like-container">
                    <button type="button" className="card__like"></button>
                    <p className="card__number-likes">{props.likes}</p>
                </div>
            </div>
            <button type="button" onClick={props.onCardDelete} className="card__delete-button"></button>  
        </div>

    )
}

export default Card;