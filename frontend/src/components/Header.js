import React from 'react';
import {Link, Routes, Route} from "react-router-dom";
import headerLogo from '../images/header-logo.svg';


function Header(props) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={headerLogo}
        alt="Логотип Места России"
      />

      <Routes>
        <Route path='/sign-up' element={
          <Link to='/sign-in' className='header__auth-link'>
            Войти
          </Link>
        }/>

        <Route path='/sign-in' element={
          <Link to='/sign-up' className='header__auth-link'>
            Регистрация
          </Link>
        }/>

        <Route path='/react-mesto-auth' element={
          <div className='header__container'>
            <p className='header__email'>{props.email}</p>
            <Link to='sign-in' className='header__logout' onClick={props.onLogout}>
              Выйти
            </Link>
          </div>
        }/>
      </Routes>
    </header>
  );
}

export default Header;