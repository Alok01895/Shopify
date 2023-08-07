import React, { Fragment, useEffect, useState } from 'react';
import './ProductChild.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../layout/loader/loader';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';


import Product from '../Product';

function ProductChild() {

  const [minValue, setMinValue] = useState('0');
  const [maxValue, setMaxValue] = useState('25000');
  const progress = document.querySelector('.progress');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0,25000])
  const dispatch = useDispatch();

  const { loading, productCount, products, error, resultPerPage } = useSelector((state) => state.products);
  const { keyword } = useParams();

  useEffect(() => {
    dispatch(getProduct(keyword,currentPage));
  }, [dispatch, keyword,currentPage]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleMinInputChange = (e) => {
    if(maxValue-minValue>10000)
    {
      setMinValue(parseInt(e.target.value));
    }
    else{
      setMinValue(parseInt(maxValue-10000));
      
    }
      setPrice([minValue,maxValue])
      progress.style.left=(minValue/e.target.max)*100 + "%"
    
  };

  const handleMaxInputChange = (e) => {
    setMaxValue(parseInt(e.target.value));
    setPrice([minValue,maxValue])
    progress.style.right=100-(maxValue/e.target.max)*100 + "%"
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productsHeading">Products</h2>


          <div className="wrapper">
            <h3>Price Range</h3>
            <div className="price-input">
              <div className="field">
                <input type="Number"  className='input-min' placeholder='Min'/>
              </div>
              <div className="separator">-</div>
              <div className="field">
                <input type="Number"  className='input-max' placeholder='Max' />
              </div>
            </div>
            <div className="slider">
              <div className="progress">
              </div>
            </div>
            <div className="range-input">
              <input type="range" className="range-min" min="0" max="25000" value={minValue} onChange={handleMinInputChange}/>
              <input type="range" className="range-max" min="0" max="25000" value={maxValue} onChange={handleMaxInputChange}/>
            </div>
          </div>



          <div className="products">
            {products &&
              products.map((product) => {
                return <Product product={product} key={product._id} />;
              })}
          </div>

              



          {resultPerPage<productCount &&
           (<div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productCount}
              onChange={setCurrentPageNo}
              nextPageText={<FaChevronRight />}
              prevPageText={<FaChevronLeft />}
              firstPageText={<FaAngleDoubleLeft />}
              lastPageText={<FaAngleDoubleRight />}
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
              
              
            />
          </div>)}
        </Fragment>
      )}
    </Fragment>
  );
}

export default ProductChild;
