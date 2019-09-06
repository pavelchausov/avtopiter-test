import React from 'react';
import './Header.css';
import Logo from './logo.png';

const Header = () => {
    return (<div className='header'>
        <div className="logo">
            <img src={Logo} alt='logo'/>
        </div>
    </div>)
}

export default Header;