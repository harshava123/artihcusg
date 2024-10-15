import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../images/logo.jpg";
function Header() {
    return (
        <div className="flex mt-4 mb-4 justify-between mr-10">
      
                <img src={logo} alt="logo" width={200} height={100} />
            
        <h1 className='flex text-3xl font-serif'></h1>
      </div>
    );
}

export default Header;
