import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom"

const Header = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const _handleKeyDown = (e) => {
    if (e.key === 'Enter' && keyword.trim() !== '') {
      navigate(`/products/${keyword}`);
      setKeyword("")
    }
  };

  return (
    <div className='Navbar'>
      <div className="nav-left">
        <Link to={"/"} style={{textDecoration:"none", color:"aliceblue"}}> <div className="logo">Shopify</div></Link>
      </div>
      <div className="nav-mid">
        <Link  to={'/products'} style={{textDecoration:"none", color:"aliceblue"}} > <div className="product">Products</div></Link>
        <div className="contact">Contact</div>
        <div className="about">About</div>
      </div>
      <div className="nav-right">
        <div className="search">
          <i className="fa-solid fa-magnifying-glass" style={{ color: "grey" }}>
            <input
              type="text"
              placeholder='Looking for Something?..'
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={_handleKeyDown}
            />
          </i>
        </div>
        <div className="shop">
          <i className="fa-solid fa-cart-shopping"></i>
          <div className="shoppy">cart</div>
        </div>
        <div className="user">
          <i className="fa-solid fa-user">
            <div className="profile">profile</div>
          </i>
        </div>
      </div>
    </div>
  );
};

export default Header;
