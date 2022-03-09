import React from 'react'
import NavBar from './NavBar'
import HeaderElements from './HeaderElements/HeaderElements'
import HeaderMobileElements from './HeaderElements/HeaderMobileElements'

export default function Header() {
    return (
        <div className="header">
          <HeaderElements/>
          <HeaderMobileElements/>
          <NavBar/>
        </div>
    )
}
