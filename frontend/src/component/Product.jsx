import React from 'react'
import {Link} from "react-router-dom"
import ReactStars from "react-rating-stars-component"
import "./Product.scss"
const Product = ({product}) => {

    const options={
        edit:false,
        color:"rgba(20,20,20,0.4",
        activeColor:"tomato",
        value:product.ratings,
        isHalf:true,
        size:window.innerWidth < 600 ? 18 : 22,
        space:0.1,
        precision: 0.5, // Add this line to adjust the precision of half stars
        
    }
  return (
    <Link className='productCard' to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div className="">
        <ReactStars {...options} classNames="stars"/>
        <span style={{fontFamily:"Verdana"}}>({product.numOfReviews} reviews)</span>
      </div>
      <span>{` ₹${product.price}`}</span>
    </Link>
  )
}

export default Product
