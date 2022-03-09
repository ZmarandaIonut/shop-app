import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTruck} from '@fortawesome/free-solid-svg-icons'

export default function SubmitOrder({setRoutePermission}) {
 
    const navigate = useNavigate();

  const backToStore = () => {
     navigate("/");
  }
  return (
    <div className='submit-order'>
        <FontAwesomeIcon icon={faTruck} size={"4x"}/>
        <p className='submit-order-anno'>Thank you for submiting the order.</p>
        <button onClick={() => backToStore()} className='empty-cart-backToStore-btn'>Back to store</button>
    </div>
  )
}
