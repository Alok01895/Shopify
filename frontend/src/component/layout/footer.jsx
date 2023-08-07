import React from 'react'
import ins from "../../images/ins.png"
import face from "../../images/face.webp"
import link from "../../images/link.png"

const footer = () => {
  return (
    <footer> 
    <div className="foot-box">
         <div className="foot-content">
            <div className="foot-con">
                  <div className="foot-logo">Shopify</div>
                  <div className="about-us"><h2>About Us</h2> We believe in best quality products </div>
                  <div className="foot-contact"><h2>Contact Us</h2> <div className="number-foot"><i className="fa-solid fa-phone"></i> &nbsp;+9919199999</div> <div className="foot-mail"><i className="fa-solid fa-envelope"></i>&nbsp; example@gmail.com</div></div>

            </div>
            <div className="foot-info">
                <div className="foot-info-heading"><h2>Information</h2></div>
                
            </div>
            
            <div className="foot-register">
                <div className="foot-reg"><h2>Register For More Info</h2></div>
                <div className="take-email">
                     <div><i className="fa-solid fa-envelope"></i><input type="email" placeholder="Enter Your Email"/></div>
                     <button className="foot-button">Register</button>
                </div>
            </div> 
         </div>
         <hr width="100%"/>
         <div className="social-links">
             <div className="foot-social">
                <a href="http://www.instagram.com"><img src={ins} style={{width:"20px",marginRight:"10px"}} alt=""/></a>
                <a href="http://www.facebook.com"><img src={face} style={{width:"20px"}} alt=""/></a>
                <a href="http://www.linkedin.com"><img src={link} style={{width:"20px",marginLeft:"10px"}} alt=""/></a>
                <div className="reserved">2022 © Shopify All Rights Reserved </div>
             </div>
         </div>
    </div>
</footer>
  )
}

export default footer
