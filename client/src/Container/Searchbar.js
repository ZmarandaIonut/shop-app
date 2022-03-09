import React, { useState } from 'react'
import searchImage from "../images/Search_icon.png"
import {useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux"

export default function Searchbar() {
    const navigate = useNavigate();
    const [serachValue, setSearchValue] = useState('');
    const dispatch = useDispatch();

    function transformSearchInput(string){
      setSearchValue(string);
    }
    function pressKey(e){
         if(e.key === "Enter"){
             gotoPath();
         }
    }
    function gotoPath(){
        const transformSearch = serachValue.split(" ").filter(x => x !== "").join(' ');
        if(transformSearch.length >= 3){
            dispatch({type:"edit", payload:transformSearch})
            navigate(`/search/${transformSearch}`);
            setSearchValue('');
        }
    }
    return (
        <div className="search_container">
            <input className="searchbar" value={serachValue} type="text" placeholder="Search for a product" onChange={(e) => transformSearchInput(e.target.value)} onKeyPress={(e) => pressKey(e)}/>
            <button className="search-button" onClick={() => gotoPath()}>
             <img alt="search_image" className="search-image" src={searchImage}/>
            </button> 
        </div>
    )
}
