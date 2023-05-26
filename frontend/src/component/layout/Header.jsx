import React from 'react'

const header = () => {
  return (
    <div className='Navbar'>
      <div className="nav-left">
        <div className="logo">Shopify</div>
      </div>
      <div className="nav-mid">
        <div className="product">Products</div>
        <div className="contact">Contact</div>
        <div className="about">About</div>
      </div>
      <div className="nav-right">
        <div className="search"><i className="fa-solid fa-magnifying-glass" style={{color:"grey"}}><input type="text" placeholder='Looking for Something?..' /></i></div>
        <div className="shop"><i className="fa-solid fa-cart-shopping"></i><div className="shoppy">cart</div> </div>
        <div className="user"><i className="fa-solid fa-user"><div className="profile">profile</div></i></div>
      </div>
    </div>
  )
}

export default header
