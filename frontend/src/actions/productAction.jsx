import axios from "axios"

import { ALL_PRODUCT_FAIL,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_REQUEST, CLEAR_ERRORS ,PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_SUCCESS} from "../constants/productConstant"

export const getProduct = (keyword="",currentPage=1)=> async (dispatch)=>{
    try{
        dispatch({type:ALL_PRODUCT_REQUEST})
        
        const {data}= await axios.get(`http://localhost:8080/api/v1/products?keyword=${keyword}&page=${currentPage}`)
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        })
    }
    catch (error){
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        }) 
    }
}


export const getProductDetails = (id)=> async (dispatch)=>{
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST})
        
        const {data}= await axios.get(`http://localhost:8080/api/v1/products/${id}`)
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product
        })
    }
    catch (error){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        }) 
    }
}

export const clearErrors = ()=> async (dispatch)=>{

    dispatch({type:CLEAR_ERRORS})
}