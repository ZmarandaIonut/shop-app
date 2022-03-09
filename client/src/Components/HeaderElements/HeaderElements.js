import React from 'react'
import { Link } from 'react-router-dom'
import Searchbar from '../../Container/Searchbar'
import Cart from '../../Container/Cart/Cart'

export default function HeaderElements() {
  return (
    <div className='header_components'>
      <Link to ="/" className="title">
      <h1 className='app-title'>Deno IT</h1>
      </Link>
      <Searchbar/>
      <Cart/>
  </div>
  )
}
