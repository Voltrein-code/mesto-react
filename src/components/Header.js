import React from 'react';

import logo from '../blocks/header/images/header__logo.svg';

function Header() {
  return (
    <header className="header">
      <a href="." target="_top">
        <img src={logo} className="header__logo" alt="Логотип" />
      </a>
    </header>
  )
}

export default Header;