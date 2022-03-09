import React,{useState} from 'react';
import {useDispatch} from "react-redux"
import { v4 as uuidv4 } from 'uuid';

export default function CartDeliverOrder({ItemsInCart,totalCartValue, setSubmitOrder}) {
   const [payWithCard, setPayWithCart] = useState(false);

   const [validateFirstName, setFirstName] = useState("");
   const [validateLastName, setLastName] = useState("");
   const [validateAdress, setAdress] = useState("");
   const [validateCountry, setCountry] = useState("");
   const [validatePostCode, setPostCode] = useState("");
   const [validateEmail, setEmail] = useState("");
   const [validatePhoneNumber, setPhoneNumber] = useState("");

   const [submitOrderErr, setSubmitOrderErr] = useState(false);

   const dispatch = useDispatch();

   const submitOrder = () => {
       if(validateInput()){
          localStorage.clear();
          dispatch({type: "REMOVE_ALL"});
          dispatch({type: "CLEAR"}); // CLEANS numbers of items inside the cart
          dispatch({type: "EMPTY_TOTAL"})
          setSubmitOrder(true);
       }
       else
         setSubmitOrderErr(true);
   }
   const validateInput = () => {
       const firstNameVal = validateFirstName.match(/[a-z|A-Z]/g);
       const lastNameVal = validateLastName.match(/[a-z|A-Z]/g);
       const adressVal = validateAdress.match(/[^\s]/g);
       const countryVal = validateCountry.match(/[a-z|A-Z]/g);
       const postCodeVal = validatePostCode.match(/[a-z|A-Z|0-9]/g);
       const emailVal = validateEmail.match(/\S+@\S+\.\S+/g);
       const phoneVal = validatePhoneNumber.match(/^[0-9]+$/g);
       
       return firstNameVal && lastNameVal && adressVal && countryVal && postCodeVal && emailVal && phoneVal;

   }
  return (
    <div className="payment-container">
    <form className='payment-form'>
        <p className="payment-info">1. Personal informations: </p>
        <label>
            First name:
            <input onChange={(e) => setFirstName(e.target.value)} className="payment-userInfo" placeholder='Kaur'></input>
        </label>
        <label>
            Last name:
            <input onChange={(e) => setLastName(e.target.value)} className="payment-userInfo" placeholder='John'></input>
        </label>
        <p className="payment-info">2. Deliver adress: </p>
        <label>
            Adress:
            <input onChange={(e) => setAdress(e.target.value)} className="payment-userInfo" placeholder='61 Kingsway North'></input>
        </label>
        <label>
            Country:
            <input onChange={(e) => setCountry(e.target.value)} className="payment-userInfo" placeholder='United Kingdom'></input>
        </label>
        <label>
            Postal code:
            <input onChange={(e) => setPostCode(e.target.value)} className="payment-userInfo postalCode" placeholder='DH2 1AH'></input>
        </label>
        <p className="payment-info">3. Payment method: </p>
        <label className='paymethod-container'>
            <input type="checkbox" onChange={(e) => setPayWithCart(e.target.checked)}/>
            I would like to pay with my credit card
            {payWithCard ? <p className='checkbox-msg'>Because it is not a real shop app, you don't have to enter anything else.</p> : null}
        </label>
        <p className="payment-info">4. Other personal informations:</p>
        <label>
            Email adress:
            <input onChange={(e) => setEmail(e.target.value)} className="payment-userInfo" placeholder='example@something.com'></input>
        </label>
        <label>
            Phone number:
            <input onChange={(e) => setPhoneNumber(e.target.value)} className="payment-userInfo" placeholder='0151 496 0731'></input>
        </label>
        <div className="payment-items">
            <p className="payment-info">Your products: </p>
            {ItemsInCart.map(item => {
                return <p key={uuidv4()} style={{color: '#cc6666', margin: '0.6rem 1rem'}}>{item.productname} ({item.quantity}pcs)</p>
            })}
            <div className="cart-totalpay">
            <p className="payment-total">Total:</p>
             <span>${totalCartValue.toFixed(2)}</span>
            </div>
        </div>
         {submitOrderErr ? <p className='deliver-validate-err'>*Please make sure you fill the above fields correctly!</p> : null}
        <button type='button' className="btn-placeorder" onClick={() => submitOrder()}>Place order</button>
    </form>
  </div>
  )
}
