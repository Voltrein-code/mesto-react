import React from 'react';

export default function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  } 

  return (
    <article className="card">
      <img src={props.card.link} className="card__image" alt={props.card.name} onClick={handleClick} />
      <button className="card__delete-button" type="button"></button>
      <div className="card__caption">
        <h2 className="card__name">{props.card.name}</h2>
        <div className="card__like-display">
          <button className="card__like-button" type="button"></button>
          <p className="card__like-counter" name="">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}