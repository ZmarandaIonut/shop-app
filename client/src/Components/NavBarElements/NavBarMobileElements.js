import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptop, faMobile, faDesktop,faNetworkWired, faTabletScreenButton, faTools } from '@fortawesome/free-solid-svg-icons'
 
export default function NavBarMobile() {

  const [active, setActive] = useState(false);

  useEffect(() => {
     if(active){
      document.body.style.overflowY = "hidden"
     }
     else{
      document.body.style.overflowY = "auto"
     }
  }, [active])

  return (
    <div className="nav-mobile">
    <p className="mobile-nav-menu noselect" onClick={() => setActive(!active)}>{active ? "✖" : "☰"}</p>
    {active ? 
       <div className='mob-nav-container'>
         <div className='mob-nav-elements'>
           
           <Link to={"/laptops"} className="mob-nav-element-route-container" onClick={() => setActive(false)}>
             <FontAwesomeIcon icon={faLaptop} size={"xs"} />
             <li className='nav-element-des'>Laptops</li>
           </Link>
           <Link to={"/mobiles"} className="mob-nav-element-route-container" onClick={() => setActive(false)}>
             <FontAwesomeIcon icon={faMobile} size={"xs"} />
             <li className='nav-element-des'>Mobiles</li>
           </Link>
           <Link to={"/components"} className="mob-nav-element-route-container" onClick={() => setActive(false)}>
             <FontAwesomeIcon icon={faTools} size={"xs"} />
             <li className='nav-element-des'>Components</li>
           </Link>
           <Link to={"/tablets"} className="mob-nav-element-route-container" onClick={() => setActive(false)}>
             <FontAwesomeIcon icon={faTabletScreenButton} size={"xs"} />
             <li className='nav-element-des'>Tablets</li>
           </Link>
           <Link to={"/monitors"} className="mob-nav-element-route-container" onClick={() => setActive(false)}>
             <FontAwesomeIcon icon={faDesktop} size={"xs"} />
             <li className='nav-element-des'>Monitors</li>
           </Link>
           <Link to={"/network"} className="mob-nav-element-route-container" onClick={() => setActive(false)}>
             <FontAwesomeIcon icon={faNetworkWired} size={"xs"} />
             <li className='nav-element-des'>Networking</li>
           </Link>
        </div>
       </div>
      : null
    }
  </div>
  )
}
