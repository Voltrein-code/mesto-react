import React from 'react';

function PopupWithForm(props) {

  return (
    <article className={`popup popup_type_${props.name} ${props.isOpen?'popup_opened':''}`}>
    <form action="#" className="popup__container" name={props.name} noValidate>
      <button className="popup__close" type="button" onClick={props.onClose}></button>
      <h2 className="popup__caption">{props.title}</h2>
      {props.children}
      <button className="popup__submit" type="submit">{props.buttonText}</button>
    </form>
  </article>
  )

}

export default PopupWithForm;