import axios from "axios";
import { useEffect,useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import Footer from "./Footer";



const AboutUs = () => {
    return ( 
        <div className="container-fluid">

        <Navbar/>
            <div className="col-md-6">
                <img src="images/Slide0.jpeg" alt="" height="400px" width="50%"/>
            </div>
            <br />
            <div className="col-md-6">
                <p>High-quality Jewellery
                Gemini Sparkles Jewellers is the perfect destination for customers looking for high-quality, timeless pieces. Our variety consists of 18ct & 22ct Yellow, White and Rose Gold, along with Diamonds, Precious gems, Platinum Jewellery and much more. Whether it is a precious gemstone or a simple bangle, Gemini Sparkles’s selection delivers impeccable craftsmanship, outstanding beauty, and lasting shine. With on-trend collections from traditional designs to edgy modern pieces, you can find jewellery that suits your individual style</p>
            </div>
        
        </div>


     );
     <Footer/>
}
 
export default AboutUs;