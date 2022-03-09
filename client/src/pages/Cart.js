import React,{useState} from 'react'
import {useSelector,useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import CartDeliverOrder from './components/CartDeliverOrder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping, faTruck} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export default function Cart() {
    const [submitOrder, setSubmitOrder] = useState(false);
    const ItemsInCart = useSelector(state => state.ItemsInCart);
    const totalCartValue = useSelector(state => state.GetCartTotal);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function removeItemFromCart(item){
       const itemName = item.productname;
       localStorage.removeItem(itemName);
       dispatch({type: "REMOVE_ITEM", payload: {removedItem: itemName}});
       dispatch({type: "REMOVE", payload: {quantity: item.quantity}})
       dispatch({type: "edit_total", payload:{value: (parseFloat(item.price) * item.quantity)}})
    }

    const backToStore = () => {
       navigate("/");
    }

    return (
        
        <div className="cart-container">
         {ItemsInCart.length === 0 ? 
            <div className='empty-cart-container'>
               <div className='empty-cart-elements' style={submitOrder ? {filter: "blur(2px)"} : null}>
                 <FontAwesomeIcon icon={faCartShopping} size={"5x"} />
                 <p className='empty-cart-text'>Your cart is empty</p>
                 <p className='empty-cart-anno'>If you want to add items in your cart, go back to the store.</p>
                 <button onClick={() => backToStore()} className='empty-cart-backToStore-btn'>Back to store</button>
               </div>
                {submitOrder ? 
                 <div className='submit-order'>
                   <div className='submit-order-elements'>
                     <div className='submit-order-closeTab' onClick={() => setSubmitOrder(false)}>✖</div>
                     <FontAwesomeIcon icon={faTruck} size={"4x"}/>
                     <p className='submit-anno'>Thank you for submiting the order.</p>
                     <p>Order ID: #{Math.floor(Math.random() * 100)}</p>
                    <p className='submit-anno-2'>We stay in touch. You will be contacted soon!</p>
                     <button onClick={() => backToStore()} className='empty-cart-backToStore-btn'>Back to store</button>
                   </div>
                 </div>
                 : null}
            </div> :  
            <>
            <h1>Your shopping cart</h1>
            <div className="cart-table-frame">
               <table>
                <tbody>
                  <tr className="table-header">
                      <th>Product</th>
                      <th></th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Remove item</th>
                  </tr>
                  {ItemsInCart ? ItemsInCart.map(item => {
                    return(
                        <tr key={uuidv4()} className="table-content">
                        <th className="table-image"><Link to={`/product/${item.itemURL}`}><img alt="prodImage" width='80' src={item.imgSrc}></img></Link></th>
                        <th className="table-productname">{item.productname}</th>
                        <th className="table-quantity">{item.quantity || 1}</th>
                        <th className="table-price">${(parseFloat(item.price) * (parseInt(item.quantity))).toFixed(2)}</th>
                        <th className='table-removeItem'><p onClick={() => removeItemFromCart(item)}>Remove Item</p></th>
                        </tr>  
                    )
                  }) : null}
                  <tr className="table-total">
                      <th className="table-e1"></th>
                      <th className="table-e2"></th>
                      <th></th>
                      <th>Total:</th>
                      <th>${totalCartValue.toFixed(2)}</th>
                  </tr>
                  </tbody>
               </table>
            </div>
             <CartDeliverOrder ItemsInCart={ItemsInCart} totalCartValue={totalCartValue} setSubmitOrder={setSubmitOrder}/>
            </>
          }
        </div>
    )
}
