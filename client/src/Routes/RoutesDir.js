import {Routes, Route} from "react-router-dom";
import Home from "../pages/Home"
import Cart from "../pages/Cart"
import DynamicPage from "../DynamicRouting/DynamicPage"
import Laptops from "../pages/Laptops"
import Mobiles from "../pages/Mobiles"
import Components from "../pages/Components"
import Monitors from "../pages/Monitors"
import SearchPage from "../pages/SearchPage";
import Network from "../pages/Network"
import Tablets from "../pages/Tablets"
import NotFound from "../pages/NotFound";
 

export default function RoutesDir() {
  return (
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/product/:id" element={<DynamicPage/>}/>
    <Route path="/laptops" element={<Laptops/>}/>
    <Route path="/mobiles" element={<Mobiles/>}/>
    <Route path="/components" element={<Components/>}/>
    <Route path="/monitors" element={<Monitors/>}/>
    <Route path="/search/:id" element={<SearchPage/>}/>
    <Route path="/network" element={<Network/>}/>
    <Route path="/tablets" element={<Tablets/>}/>
    <Route path="*" element={<NotFound/>}/>
   </Routes>
  )
}

