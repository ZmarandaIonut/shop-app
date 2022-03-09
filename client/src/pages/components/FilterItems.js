import React, {useState} from 'react'
import {useDispatch} from "react-redux"

export default function FilterItems() {
    const [minMax, setMinMax] = useState([0,Infinity]);
    const dispatch = useDispatch();

    function applyFilter(){
        const givenMin = parseInt(minMax[0]) >= 0 ? parseInt(minMax[0]) : 0;
        const givenMax = parseInt(minMax[1]) >= 0 ? parseInt(minMax[1]) : Infinity;
        dispatch({type:"setMinMax", min: givenMin, max: givenMax});
    }
    return (
        <div className='pages-filter-container'>
            <input placeholder='MIN' onChange={(e) => setMinMax([e.target.value, minMax[1]])}/>
            <input placeholder='MAX'onChange={(e) => setMinMax([minMax[0], e.target.value])}/>
            <button className='apply-filter-btn' onClick={() => applyFilter()}>Apply filter</button>
        </div>
    )
}
