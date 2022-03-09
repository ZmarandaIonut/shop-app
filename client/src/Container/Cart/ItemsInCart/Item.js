import React from 'react'
import { Link } from 'react-router-dom'

export default function Item({imgSrc, productname, price,itemURL}) {
    return (
        <Link className="item" to={`/product/${itemURL}`}>
        <img src={imgSrc} alt="source"></img>
        <span>{productname}</span>
        <span>Price: ${price}</span>
      </Link>
    )
}
