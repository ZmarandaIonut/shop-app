import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import Card from '../Container/Card/Card'
export default function Frame({sectionTitle, titlePosition, item, cardType}) {
    const titleStyle = {
        position: 'absolute',
        justifySelf: titlePosition,
        padding: '1.3rem'       
    }
    return (
        <div className="frame">
            <h2 style={titleStyle}>{sectionTitle}</h2>
            {item ? item.map(prod => {
              return( 
               <Card key={uuidv4()}
                price={prod.price}
                productname={prod.productname}
                imageSource={prod.imagesource}
                itemURL={prod.itemURL}
                cardSize={cardType === "small" ? "small" : "big"}
                />
              )
            }) : null}
        </div>
    )
}
