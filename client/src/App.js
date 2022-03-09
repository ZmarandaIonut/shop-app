import React, {useEffect} from "react";
import {useDispatch} from "react-redux"
import {BrowserRouter} from "react-router-dom";
import "./App.css"
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import RoutesDir from "./Routes/RoutesDir";
import ScrollToTop from "./ScrollToTop"

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
     Object.keys(localStorage).forEach(item => {
       const currentItem = JSON.parse(localStorage.getItem(item));
       dispatch({type:"ADD", payload: currentItem.quantity});
      dispatch({type: "ADD_ITEM", payload: {
          imgSrc: currentItem.imageSource,
          productname: currentItem.productname,
          quantity: currentItem.quantity || 1,
          price: currentItem.price,
          itemURL: currentItem.itemURL
      }})
      dispatch({type: "calculate_total", payload: parseFloat(currentItem.price * currentItem.quantity)});
     });
  }, [dispatch]);
  return (
    <BrowserRouter>
    <div className="App">
      <Header/>
      <RoutesDir/>
      <Footer/>
      <ScrollToTop/>
    </div>
   </BrowserRouter>
  );
}

export default App;
