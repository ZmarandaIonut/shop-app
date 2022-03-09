import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBarElements() {

  return (
    <div className="navbar-elements">
      <li><Link className='nav-btn' to="/">Home</Link></li>
      <li><Link className='nav-btn' to="/laptops">Laptops</Link></li>
      <li><Link className='nav-btn' to="/mobiles">Mobiles</Link></li>
      <li><Link className='nav-btn' to="/components">Components</Link></li>
      <li><Link className='nav-btn' to="/tablets">Tablets</Link></li>
      <li><Link className='nav-btn' to="/monitors">Monitors</Link></li>
      <li><Link className='nav-btn' to="/network">Networking</Link></li>
  </div>
  )
}
