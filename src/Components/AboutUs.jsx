import { Link } from "react-router-dom";
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, rgb(7, 7, 7), rgb(249, 104, 26) 40%, rgb(15, 15, 15) 60%, rgb(250, 93, 21))",
      paddingTop: "50px",
      paddingBottom: "50px"
    }}>
      <div className="container py-5">
        <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
          <div
                className="card-header text-white rounded-top-4"
                style={{
                  background: "linear-gradient(135deg, #0f0f0f, #ff5722)"
                }}
              >
                <h4 className="text-center mb-0 py-2 fw-bold">About Gemini Sparkles</h4>
              </div>

          <div className="card-body p-5 bg-light">
            <div className="row g-5 align-items-center">
              {/* Image */}
              <div className="col-md-6 text-center">
                <img
                  src="/images/Slide4.jpeg"
                  alt="Gemini Sparkles Jewellery"
                  className="img-fluid rounded shadow-sm"
                  style={{ maxHeight: "400px", objectFit: "cover" }}
                />
              </div>

              {/* About Text */}
              <div className="col-md-6">
                <h4 className="fw-bold mb-3 text-primary">High-Quality Jewellery</h4>
                <p className="text-muted">
                  Gemini Sparkles Jewellers is the perfect destination for customers looking for
                  high-quality, timeless pieces. Our collection includes 18ct & 22ct Yellow, White
                  and Rose Gold, Diamonds, Precious Gems, Platinum Jewellery, and more.
                </p>
                <p className="text-muted">
                  From elegant traditional designs to modern statement pieces, every item is crafted
                  with precision and passion. Discover jewellery that reflects your unique style and
                  makes every moment sparkle.
                </p>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-5" />

            {/* Our Values */}
            <div className="row">
              <div className="col">
                <h4 className="fw-bold mb-3 text-primary">Our Values</h4>
                <p className="text-muted">
                  At Gemini Sparkles, we believe jewellery is more than adornment — it tells stories
                  and celebrates life’s milestones. We are dedicated to quality, craftsmanship, and
                  exceptional service.
                </p>
                <p className="text-muted">
                  We uphold ethical sourcing and sustainable practices, supporting local artisans and
                  responsible materials. We're proud to be part of a vibrant community, giving back
                  while delivering brilliance in every creation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
