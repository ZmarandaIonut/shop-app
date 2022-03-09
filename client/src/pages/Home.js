import React,{useState, useEffect} from 'react'
import Frame from '../Components/Frame'
import Loading from '../Loading';

export default function Home() {
    const [HomeData, setHomeData] = useState([]);
    useEffect( () => {
        callData().then(data => setHomeData(data));
      }, []);
    async function callData(){
       try{
          const data = await fetch("http://localhost:3005/home");
          const resultData = await data.json();
          return resultData;
       }
       catch(err){
          return [];
        }
     }
    return (
      <>
        {HomeData.length === 0 ? <Loading/> : 
          <main>
          <div className='home-items-container'>
          <Frame sectionTitle={`Don't miss this opportunity`} item={HomeData.dailyoffer} titlePosition="center"/>
          </div>
          <div className='home-items-container'>
          <Frame sectionTitle={`Best selling mobiles`} item={HomeData.SMARTPHONE} cardType={'small'}/>
          </div>
          <div className='home-items-container'>
          <Frame sectionTitle={`Best selling monitors`} item={HomeData.MONITOR} cardType={'small'}/>
          </div>
         </main>
         }
      </>
    )
}
