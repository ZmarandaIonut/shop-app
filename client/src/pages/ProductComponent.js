import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux"
import PagesPanel from './components/PagesPanel'
import Frame from '../Components/Frame';
import Loading from "../Loading";
import FilterItems from './components/FilterItems';
import NotFound from './NotFound';

export default function ProductComponent({url}) {
    const [defaultProduct, setdefaultProduct] = useState('');
    const [products, setProducts] = useState([]);
    const [sortOptions, setSortOptions] = useState('');
    const [filterOptions, setFilterOptions] = useState('');

    const dispatch = useDispatch();
    const MinMaxFilter = useSelector(state => state.MinMaxFilter)

    useEffect(() => {
       getData().then(data => {
        setProducts(data)
        let copyData = [];
        for(let i = 0; i<data.length; i++){
          copyData.push(Object.assign({}, data[i]));
        }
        setdefaultProduct(copyData);
       });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
      let copyData = [];
      for(let i = 0; i<defaultProduct.length; i++){
        copyData.push(Object.assign({}, defaultProduct[i]));
      }
      if(sortOptions === "None"){
        setdefaultProduct(defaultProduct)
      }
     else if(sortOptions === "Low Price"){
      let newData;
       if(filterOptions === "None" || !filterOptions){
        newData = copyData.sort((a,b) => parseFloat(a.price) - parseFloat(b.price));
        setProducts(newData);
       }
       newData = [...products];
       newData.sort((a,b) => parseFloat(a.price) - parseFloat(b.price));
       setProducts(newData);
       return;
      }
     else if(sortOptions === "High Price"){
       let newData;
        if(filterOptions === "None" || !filterOptions){
          newData = copyData.sort((a,b) => parseFloat(b.price) - parseFloat(a.price));
          setProducts(newData);
          return;
        }
        newData = [...products];
        newData.sort((a,b) => parseFloat(b.price) - parseFloat(a.price));
        setProducts(newData);
        return;
      }
 
    }, [sortOptions]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
      let copyData = [];
      for(let i = 0; i<defaultProduct.length; i++){
        copyData.push(Object.assign({}, defaultProduct[i]));
      }
      if(filterOptions === "None" && (sortOptions === "None" || !sortOptions))  {
        setProducts(copyData);
        return;
     }
     if(filterOptions === "None" && sortOptions){
        if(sortOptions === "High Price"){
          const sort = copyData.sort((a,b) => parseFloat(b.price) - parseFloat(a.price));
          setProducts(sort);
          return;
        }
         else if(sortOptions === "Low Price"){
           const sort = copyData.sort((a,b) => parseFloat(a.price) - parseFloat(b.price));
           setProducts(sort);
           return;
       }
    }
    if(filterOptions === "None" && (!sortOptions || sortOptions === "None")){
      setProducts(copyData);
      return;
    }
    if((filterOptions === "Min-Max" && sortOptions === "High Price") || sortOptions === "Low Price"){
      const res = copyData.filter(item => (parseFloat(item.price) >= parseFloat(MinMaxFilter[0]) && (parseFloat(item.price) <= parseFloat(MinMaxFilter[1]))));
      if(sortOptions === "High Price"){        
          return setProducts(res.sort((a,b) => parseFloat(b.price) - parseFloat(a.price)));
      }
      else if(sortOptions === "Low Price"){
          return setProducts(res.sort((a,b) => parseFloat(a.price) - parseFloat(b.price)));
      }
      else{
          return setProducts(res);
      }
  }
  if(filterOptions === "Min-Max" && (!sortOptions || sortOptions === "None")){
    const finalResult = copyData.filter(item => (parseFloat(item.price) >= parseFloat(MinMaxFilter[0]) && (parseFloat(item.price) <= parseFloat(MinMaxFilter[1]))));
    setProducts(finalResult);
    return;
 }

  }, [filterOptions, MinMaxFilter]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
      dispatch({type: "setMinMax", min:0, max:Infinity})
      return;
   }, [filterOptions, dispatch]);
    async function getData(){
        try{
          const data = await fetch(url);
          const resultData = await data.json();
          return resultData;
        }
        catch(err){
          return [];
        }
   }
    return (
       <>
       {!defaultProduct.length ? <Loading/> : 
         <>
         {products.length > 0 ?
         <div className="dr-pages-container">
         <PagesPanel setSortOptions={setSortOptions} setFilterOptions={setFilterOptions} sectionTitle={"Network"}/>
         {!filterOptions || filterOptions === "None" ? null : <FilterItems/>}
         <div className='section-data'>
         <Frame item={products} cardType={"small"}/>    
         </div>
        </div> : <NotFound/> }
        </>
        }
       </>
    )
}
