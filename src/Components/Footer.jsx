import { Link } from "react-router-dom";
const Footer = () => {
    return ( 
        <div className="">
            <section class="row bg-dark p-4">
        <div class="col-md-4 text-light">
            <h4 class="text-center">About Us</h4>
            <p>Gemini Sparkles Jewellers Ltd offers a custom-crafted selection of timeless jewellery pieces that are sure to become a part of your story.</p>
            <p>We are renowned for providing quality jewellery that satisfies all requirements and for having a comprehensive selection available in Kenya. We offer a range of 18ct & 22ct Yellow, White, and Rose Gold jewellery, as well as a selection of Diamonds, Precious gems and Platinum pieces. There is something for everyone!</p>

        </div>

        <div class="col-md-4 text-light">
            <h4 class="text-center">Reviews</h4>
            <form action="">
                <input type="email" placeholder="Enter your Email"  required class="form-control"/><br/>
                <textarea placeholder="Leave a Comment" rows="7" required class="form-control"></textarea>
                <br/>
                <input type="submit" value="Send Message"  class="btn btn-outline-warning"/>
            </form>
        </div>

        
        <div class="col-md-4 text-light">
                <h4 class="text-center">Stay Connected</h4>
                <br />
                <Link src="https://Whatsapp.com">
                    <img src="images/download2.jpeg" alt="" width="20%" height="50px"/>
                    <p>0741436599 </p>
                    <p>Gemini Sparkles</p>
                </Link>
               <br />
                <Link src="https://Instagram.com">
                    <img src="images/download.jpeg" alt="" width="50px" />
                    <p>Gemini Sparkles.com</p>
                </Link>
                <br />
                <Link src="https://Twitter.com">
                    <img src="images/download3.jpeg" alt="" width="50px" />
                    <p>Gemini Sparkles.com</p>
                </Link>

            </div>
     </section>
     <footer class="bg-dark text-white text-center p-2">
        <h5>Developed by Talia Gatama &copy;2025.All rights reserved</h5>
     </footer>
        </div>
    );
}
 
export default Footer;