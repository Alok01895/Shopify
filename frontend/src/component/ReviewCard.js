import React from 'react'
import ReactStars from "react-rating-stars-component"
import profile from "../images/profile.png"
import "../pages/productDetails.css"

const ReviewCard = ({review}) => {

  const options={
    edit:false,
    color:"rgba(20,20,20,0.4",
    activeColor:"tomato",
    value:review.rating,
    isHalf:true,
    size:window.innerWidth < 600 ? 18 : 22,
    space:0.1,
    precision: 0.5, // Add this line to adjust the precision of half stars
    
}



  return (
    <div className='reviewCard'>
      <img src={profile} alt="User" />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard
