import React from 'react'
import NavBarMobile from './NavBarElements/NavBarMobileElements';
import NavBarElements from './NavBarElements/NavBarElements';

export default function NavBar() {
    return (
          <div className="navbar">
            <NavBarMobile/> 
            <NavBarElements/>
        </div>
    )
}
