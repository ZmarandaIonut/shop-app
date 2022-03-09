import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from "react-redux"
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Frame from '../Components/Frame'
import PagesPanel from './components/PagesPanel';
import FilterItems from './components/FilterItems';
import Loading from '../Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

export default function SearchPage() {
   const [data, setData] = useState([]);
   const itemSearch = useSelector(state => state.SearchDir);
   const [filterItems, setFilterItems] = useState([]);
   const [sortOptions, setSortOptions] = useState('');
   const [filterOption, setFilterOption] = useState('');

   const dispatch = useDispatch();
   const MinMaxFilter = useSelector(state => state.MinMaxFilter)
   const {id} = useParams();
   const navigate = useNavigate();

   async function getData(){
       try{
        const res = await fetch("http://localhost:3005/data");
        const data = await res.json();
        const finalResult = [];
        for(let i in data){
            finalResult.push(data[i]);
        }
        return finalResult.flat();
       }
       catch(err){
           return [];
       }
    }
    function filterData(){
        const transformParams = id.split(" ").filter(x => x !== "").join(" ");
        const regExpr = new RegExp(`${transformParams}`, "gi");
        const newData = data.filter(items => items.productname.match(regExpr) != null);
        return newData;
    }

    const backToStore = () => {
        navigate("/");
     }

    useEffect(() => {
      getData().then(items => setData(items))
               .catch(e => console.log(e));
    },[]);
    useEffect(() => {
        setSortOptions("None");
         setFilterOption("None");
        return
    }, [id])
    useEffect(() => {
        const items = filterData();
        if(!sortOptions) setFilterItems(items);
        if(sortOptions === "None" && (!filterOption || filterOption === "None")){
          setFilterItems(items);
          return;
        }
       else if(sortOptions === "Low Price"){
           const newData = [...filterItems].sort((a,b) =>  parseFloat(a.price) - parseFloat(b.price));
           setFilterItems(newData);
           return;
        }
        else if(sortOptions === "High Price"){
           const newData = [...filterItems].sort((a,b) =>  parseFloat(b.price) - parseFloat(a.price))
            setFilterItems(newData);
            return;
        }
     }, [sortOptions, data, itemSearch]) // eslint-disable-line react-hooks/exhaustive-deps
     useEffect(() => {
         const items = filterData();
         if(filterOption === "None" && (sortOptions === "None" || !sortOptions))  {
            setFilterItems(items);
            return;
         }
         if(filterOption === "None" && sortOptions){
             if(sortOptions === "High Price"){
                 const sort = items.sort((a,b) => parseFloat(b.price) - parseFloat(a.price));
                setFilterItems(sort);
                return;
             }
            else if(sortOptions === "Low Price"){
                const sort = items.sort((a,b) => parseFloat(a.price) - parseFloat(b.price));
                setFilterItems(sort);
                return;
             }
         }
         if(filterOption === "None" && (!sortOptions || sortOptions === "None")){
             setFilterItems(items);
             return;
         }
         if((filterOption === "Min-Max" && sortOptions === "High Price") || sortOptions === "Low Price"){
               const res = items.filter(item => (parseFloat(item.price) >= parseFloat(MinMaxFilter[0]) && (parseFloat(item.price) <= parseFloat(MinMaxFilter[1]))));
               if(sortOptions === "High Price"){        
                      return setFilterItems(res.sort((a,b) => parseFloat(b.price) - parseFloat(a.price)));
               }
               else if(sortOptions === "Low Price"){
                      return setFilterItems(res.sort((a,b) => parseFloat(a.price) - parseFloat(b.price)));
               }
               else{
                   return setFilterItems(res);
               }
         }
         if(filterOption === "Min-Max" && (!sortOptions || sortOptions === "None")){
            const finalResult = items.filter(item => (parseFloat(item.price) >= parseFloat(MinMaxFilter[0]) && (parseFloat(item.price) <= parseFloat(MinMaxFilter[1]))));
            setFilterItems(finalResult);
            return;
         }
         
     }, [filterOption, MinMaxFilter]) // eslint-disable-line react-hooks/exhaustive-deps
     useEffect(() => {
        dispatch({type: "setMinMax", min:0, max:Infinity})
        return;
     }, [filterOption,dispatch])
    return (
        <>
         {!data.length ? <Loading/> : 
          <div className='serachpage-container'>  
          {
              //if there's nothing found for that result, return not found page.
              filterItems.length === 0 ? 
              <div className='search-notFound-container'>
                 <div className='search-not-founds-elements'>
                 <FontAwesomeIcon icon={faSearch} size={"4x"} />
                  <p className='search-notFound-anno'>Sorry, we couldn't find anything for that result.</p>
                  <button onClick={() => backToStore()} className='empty-cart-backToStore-btn'>Back to store</button>
                </div>
              </div> 
                :
              <>
             <PagesPanel setSortOptions={setSortOptions} sortOptions={sortOptions} setFilterOptions={setFilterOption} filterOption={filterOption} sectionTitle={`Result for "${id.split(" ").filter(x => x !== "").join(" ")}"`}/>
              {!filterOption || filterOption === "None" ? null : <FilterItems/>}
              <div className='searchpage-data'>
              <Frame item={filterItems} cardType={'small'}/>
              </div>
              </>

          }
         
         </div>
         }
        </>
    )
}
