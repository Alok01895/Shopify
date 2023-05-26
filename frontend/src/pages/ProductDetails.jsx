import React, { Fragment, useEffect } from 'react'
import Carousel from "react-material-ui-carousel"
import "./productDetails.css"
import {useSelector,useDispatch} from "react-redux"
import  {getProductDetails} from "../actions/productAction"
import { useParams } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"
import ReviewCard from "../component/ReviewCard.js"

const ProductDetails = () => {

    const {id} = useParams()
    const dispatch=useDispatch();
    const {product,loading,error}= useSelector(state=>state.productDetails)
    
    useEffect(() => {
      
        dispatch(getProductDetails(id))
    
    }, [dispatch,id])
    
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
    <Fragment >
        {product && <div className="productDetails" >
            <Carousel className='Carousel'>
                {
                    product.images && 
                        product.images.map((image,i)=>{
                           return <img src={image.url} className='carouselImage' alt={`${i} slide`} key={image.url} />
                        })
                }
            </Carousel>
            <div className="details">
                <div className="detailsBlock-1">
                    <h2>{product.name}</h2>
                    <p style={{fontFamily:"sans-serif"}}>Product #{product._id}</p>
                </div>
                <div className="detailsBlock-2">
                <ReactStars {...options} />
                    <span style={{fontFamily:"Verdana"}}>({product.numOfReviews} reviews)</span>
                </div>
                <div className="detailsBlock-3">
                    <h1>{` ₹${product.price}`}</h1>
                    <div className="detailsBlock-3-1">
                        <div className="detailsBlock-3-1-1">
                            <button>-</button>
                            <input type="number" value="1" />
                            <button>+</button>
                        </div>
                        <button>Add to Cart</button>
                    </div>
                    <p>
                        Status: <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                        {product.stock < 1 ? "Out of Stock" : "In Stock"}
                        </b>
                    </p>
                </div>
                <div className="detailsBlock-4">
                    Description: <p>{product.description}</p>
                </div>

                <button className='SubmitReview'>Submit Review</button>
            </div>
        </div>}

        <h3 className="reviewsTitle">Reviews</h3>
        {product.reviews && product.reviews[0] ? 
        (
            <div className="reviews">
                {product.reviews && product.reviews.map((review)=>
                    <ReviewCard review={review} />
                )}
            </div>
        )
        :
        <p className="noreviews">No reviews yet!..</p>
    }
        
    </Fragment>
  )
}

export default ProductDetails
