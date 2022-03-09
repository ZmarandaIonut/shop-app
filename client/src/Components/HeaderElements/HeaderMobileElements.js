import React from 'react'
import { Link } from 'react-router-dom'
import Searchbar from '../../Container/Searchbar'
import Cart from '../../Container/Cart/Cart'

export default function HeaderMobileElements() {
  return (
    <div className='header_components_mobile'>
      <div className='header_top_components'>
       <Link to ="/" className="title">
           <h2>Deno IT</h2>
        </Link>
        <Cart/>
      </div>
    <div className='header_bottom_components'>
       <Searchbar/>
    </div>
 </div>
  )
}
