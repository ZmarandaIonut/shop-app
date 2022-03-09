import React from 'react'
import {useDispatch} from "react-redux"
import {Link} from "react-router-dom"
export default function Card({price, imageSource, productname, itemURL, cardSize}) {

    const dispatch = useDispatch();

    function initializeCart(){
        dispatch({type:"ADD"});
        dispatch({type: "ADD_ITEM", payload: {
            imgSrc: imageSource,
            productname: productname,
            quantity: 1,
            price: price,
            itemURL: itemURL
        }})
        dispatch({type: "calculate_total", payload: parseFloat(price)});
        if(localStorage.getItem(productname)){
          const currentItemQuantity = JSON.parse(localStorage.getItem(productname)).quantity;
         localStorage.setItem(productname, JSON.stringify({productname, price, imageSource, itemURL, quantity: currentItemQuantity + 1}))
        }
        else localStorage.setItem(productname, JSON.stringify({productname, price, imageSource, itemURL, quantity: 1}));
    }
    return (
        <div className={cardSize === "big" ? "card" : "small-card"}>
            <Link to={`/product/${itemURL}`} className='card-components'>
            <img alt="Productimage" className="card-image" src={imageSource}/>
            <p className="card-price">${price}</p>
            <p className="card-productName">{productname}</p>
            </Link>           
            <Link to={"/cart"} className="card-addToCart" onClick={() => initializeCart()}>
                Add to cart
            </Link>
        </div>
    )
}
