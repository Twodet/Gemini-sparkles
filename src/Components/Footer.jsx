import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5 pt-5">
      <div className="container">
        <div className="row text-center text-md-start">

          {/* About Us */}
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold mb-3 text-warning">About Us</h4>
            <p>
              Gemini Sparkles Jewellers Ltd offers a custom-crafted selection of timeless jewellery pieces that are sure to become a part of your story.
            </p>
            <p>
              We are renowned for providing quality jewellery that satisfies all requirements and for having a comprehensive selection available in Kenya. We offer a range of 18ct & 22ct Yellow, White, and Rose Gold jewellery, as well as a selection of Diamonds, Precious gems and Platinum pieces. There is something for everyone!
            </p>
          </div>

          {/* Reviews */}
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold mb-3 text-warning">Reviews</h4>
            <form>
              <input
                type="email"
                placeholder="Enter your Email"
                required
                className="form-control mb-3 rounded-pill px-3 shadow-sm"
              />
              <textarea
                placeholder="Leave a Comment"
                rows="5"
                required
                className="form-control mb-3 rounded shadow-sm"
              ></textarea>
              <input
                type="submit"
                value="Send Message"
                className="btn btn-outline-warning w-100 rounded-pill shadow-sm"
              />
            </form>
          </div>

          {/* Social Media */}
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold mb-3 text-warning">Stay Connected</h4>
            <div className="d-flex flex-column align-items-center align-items-md-start">
              <a href="https://wa.me/254741436599" target="_blank" rel="noreferrer" className="text-decoration-none text-light mb-3">
                <img src="images/download2.jpeg" alt="WhatsApp" width="40" height="40" className="me-2 rounded" />
                <div>
                  <p className="mb-0 fw-bold">0741 436599</p>
                  <p className="mb-0">Gemini Sparkles</p>
                </div>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-decoration-none text-light mb-3">
                <img src="images/download.jpeg" alt="Instagram" width="40" className="me-2 rounded" />
                <p className="mb-0">@geminisparkles</p>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-decoration-none text-light">
                <img src="images/download3.jpeg" alt="Twitter" width="40" className="me-2 rounded" />
                <p className="mb-0">@geminisparkles</p>
              </a>
            </div>
          </div>

        </div>
      </div>

      <div className="bg-black text-white text-center py-3 mt-4">
        <h6 className="mb-0">Developed by Talia Gatama &copy; 2025. All rights reserved.</h6>
      </div>
    </footer>
  );
};

export default Footer;