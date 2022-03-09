import React from 'react'
import {Link} from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import CartImage from "./CartImage.png"
import {useSelector} from "react-redux"
import Item from "./ItemsInCart/Item"

export default function Cart() {
    const CountItemsInCart = useSelector(state => state.CountItemsInCart)
    const ItemsInCart = useSelector(state => state.ItemsInCart);
    const totalCartValue = useSelector(state => state.GetCartTotal);
    
    return (
    <div className='cart_container'>
         <Link to="/cart" className="cart">
            <span className="items-in-cart">{CountItemsInCart}</span>
             <img alt="Productimage" src={CartImage}/>
             <div className="items-in-cart"></div>
         </Link>
        <div className="show_items_in_cart">
          <div className="items-container">
             {ItemsInCart ? ItemsInCart.map(item =>
                 <Item key={uuidv4()}
                 imgSrc={item.imgSrc}
                 productname={item.productname.length > 50 ? item.productname.slice(0,50)+"[...]" : item.productname}
                 price={item.price}
                 itemURL={item.itemURL}
                 />) : []
             }
           </div>
          {ItemsInCart.length > 0 ? <div className="checkout-container">
          <p className="checkout-total">Total to pay: <span>${totalCartValue.toFixed(2)}</span></p>
          <span></span>
          <Link to="/cart" className="checkout-button" role="button">
          <span>Place order</span>
          </Link>
          </div> : null}
      </div>
    </div>
 
    )
}
