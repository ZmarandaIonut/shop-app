import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router';
import {useDispatch} from "react-redux"
import Loading from '../Loading';
import { Link } from 'react-router-dom';
import NotFound from '../pages/NotFound';

export default function TestRouter() {
    const [data, setData] = useState('');
    const [currentImage, setCurrentImage] = useState([]);
    const {id} = useParams();
    const dispatch = useDispatch();
    const [item, setItem] = useState('');
    const [itemQuantity, setItemQuantity] = useState(1);
    const [highLightImage, sethighLightImage] = useState(0);
    async function getData(){
        const data = await fetch("https://deno-it.herokuapp.com/data");
        const result = await data.json();
        return result;
    }
    useEffect(() => {
      getData().then(data => setData(data));
    }, [])
    useEffect(() => {
       if(item){
         setCurrentImage(item.imagesource);
       }
    }, [item])
   async function getItem(){
        const itemURL = id;
        const itemType = id.split("-")[0];  // represent what kind of item is (SSD, GPU,CPU etc)
        const correctSection = await data[itemType];
        if(correctSection){
            for(let i = 0; i<correctSection.length; i++){
                if(correctSection[i].itemURL === itemURL){
                     return correctSection[i];
                }
              }
        }
    }
    
    getItem().then(item => setItem(item));

     function addToCart(){
        dispatch({type:"ADD", payload:itemQuantity});
        dispatch({type: "ADD_ITEM", payload: {
             imgSrc: item.imagesource,
             productname: item.productname,
             price: item.price,
             quantity: itemQuantity,
             itemURL: item.itemURL
        }})
        dispatch({type: "calculate_total", payload: (parseFloat(item.price) * parseInt(itemQuantity))});
 
        //add item to the local storage.
        if(localStorage.getItem(item.productname)){
           const currentItemQuantity = JSON.parse(localStorage.getItem(item.productname)).quantity;
           localStorage.setItem(item.productname, JSON.stringify({productname: item.productname, price: item.price, imageSource: item.imagesource, itemURL: item.itemURL, quantity: currentItemQuantity + itemQuantity}))
        }
        else localStorage.setItem(item.productname, JSON.stringify({productname: item.productname, price: item.price, imageSource: item.imagesource, itemURL: item.itemURL, quantity: itemQuantity}));
        
    }

    return (
        <>
      {data.length === 0 ? <Loading/> :
             <>
             {item ?
              <div className="product-page">
              <div className='product-page-content'>
                <h1 className="product-title">{item.productname}</h1>
                <div className="product-overview">
                  <div>
                    <img className='dr_product_image_ov' alt="Productimage" src={currentImage}></img>
                    <div className='product-images-container'>
                    {item ? item.imagesContainer.map((image,key) => <img className={highLightImage === key ? "active" : null} alt="imagesrc" key={key} src={image} width='65' onClick={() => {
                      setCurrentImage(item.imagesContainer[key])
                      sethighLightImage(key);
                    }}/>) : null}
                     </div>
                  </div>
                  <div className="product-details">
                    <p className="product-avabile"><span>•</span>In stock</p>
                    <p className="about-product-title">About this item</p>
                    <div className="product-description">
                        {item.about.split("\n").map((data,idx) => {
                            return <li key={idx}>{data}</li>
                        })}
                    </div>
                  </div>
                </div>
   
              <div className="product-page-addToCart-container">
                <p className="product-page-price">${item.price}</p>
                <div className="product-quntity-container">
                   <p>Quantity :</p>
                    <select className="product-quantity" onChange={(e) => setItemQuantity(parseInt(e.target.value))}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <Link
                to="/cart"
                className="product-page-btn"
                onClick={() => addToCart()}
                >    
                   Add to cart
              </Link>
              </div>
             </div>
            </div> : <NotFound/> }
             </>
        }
        </>
    )
}