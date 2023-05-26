import React, { Fragment, useEffect } from 'react'
import SlideShow from "../component/SlideShow.jsx"
import Product from "../component/Product.jsx"
import Metadata from "../component/layout/Metadata"
import {getProduct} from "../actions/productAction"
import {useSelector,useDispatch} from "react-redux"
import Loader from '../component/layout/loader/loader.jsx'
import {useAlert} from "react-alert"
const Home = () => {

  const alert=useAlert()
  const dispatch=useDispatch();
  const {loading,error,products,productsCount}=useSelector(state=>state.products)
  
  useEffect(() => {

    if(error){
      return alert.error(error)
    }
    dispatch(getProduct())
  }, [dispatch,error,alert])

 
  
  
  return (
   <Fragment>
    {
      loading ? (<Loader/>) : (
        <div className='home'>
        <Metadata title="SHOPIFY"/>
       <SlideShow/>
  
      <div className="pro-container">
        <h2 className='products'>Featured Products</h2>
        <div className="container" id='container'>
          {products && products.map(product=>(
            <Product product={product}/>
          ))}
  
        </div>
      </div>
      </div>
      )
    }
   </Fragment>
  )
}

export default Home
