import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function NotFound() {
    const navigate = useNavigate();
    const backToStore = () => {
        navigate("/");
     }
  return (
    <div className='not_found_pg'>
         <div className='not_found_pg_elements'>
          <p className='not_found_page_txt'>404 NOT FOUND</p>
          <button onClick={() => backToStore()} className='empty-cart-backToStore-btn'>Back to store</button>
        </div>
    </div>
  )
}
