import Shopify1 from "../images/Shoppy1.jpg"
import Shopify2 from "../images/Shopify13.jpg"
import Shopify3 from "../images/shopify3.jpg"
import Shopify4 from "../images/shopify4.jpg"
import Shopify5 from "../images/Shopify5.jpg"
import Shopify6 from "../images/Shopify12.jpg"
import Shopify7 from "../images/Shopify7.avif"
import Shopify8 from "../images/Shopify14.jpg"
import { useEffect, useRef, useCallback } from "react"

const SlideShow = () => {
  const slideIndexRef = useRef(0);
  const timerIdRef = useRef(null);

  const slideEffect = (n) => {
    const slides = document.getElementsByClassName("image");
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndexRef.current += n;
    if (slideIndexRef.current > slides.length) {
      slideIndexRef.current = 1;
    } else if (slideIndexRef.current < 1) {
      slideIndexRef.current = slides.length;
    }
    slides[slideIndexRef.current - 1].style.display = "block";
    clearTimeout(timerIdRef.current);
    timerIdRef.current = setTimeout(showSlides, 6000);
  };

  const showSlides = useCallback(() => {
    const slides = document.getElementsByClassName("image");
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndexRef.current++;
    if (slideIndexRef.current > slides.length) {
      slideIndexRef.current = 1;
    } else if (slideIndexRef.current < 1) {
      slideIndexRef.current = slides.length;
    }
    slides[slideIndexRef.current - 1].style.display = "block";
    clearTimeout(timerIdRef.current);
    timerIdRef.current = setTimeout(showSlides, 6000);
  }, []);

  useEffect(() => {
    showSlides();
  }, [showSlides]);

  return (
    <div className="Slideshow">
      <div className="arrow-left">
        <i
          className="fa-solid fa-circle-chevron-left"
          onClick={() => slideEffect(-1)}
        ></i>
      </div>
      <div className="images">
        <img src={Shopify1} className="image" alt="" />
        <img src={Shopify2} className="image" alt="" />
        <img src={Shopify3} className="image" alt="" />
        <img src={Shopify4} className="image" alt="" />
        <img src={Shopify5} className="image" alt="" />
        <img src={Shopify6} className="image" alt="" />
        <img src={Shopify7} className="image" alt="" />
        <img src={Shopify8} className="image" alt="" />
      </div>
      <div className="arrow-right">
        <i
          className="fa-solid fa-circle-chevron-right"
          onClick={() => slideEffect(1)}
        ></i>
      </div>
    </div>
  );
};

export default SlideShow;
