import React from 'react';
import {Link} from 'react-router-dom';
import './header.css'

const Header = () =>{
    return(
       <header id="main" > 
         <div className="container">
          <Link to="/">Bigblog</Link>
          <Link to="/loguin">Entrar</Link>
         </div>
       </header> 
    );

}

export default Header;