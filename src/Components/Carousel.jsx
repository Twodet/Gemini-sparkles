import { Link } from "react-router-dom";
const Carousel = () => {
    return ( 
        <div>

        <section className="row">
        <div className="col-md-12">
            <div className="carousel slide" id="my_Carousel" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="images/Slide4.jpeg" alt="" className="d-block w-100" height="400px"/>
                    </div>
                    <div className="carousel-item">
                        <img src="images/Slide1.jpeg" alt="" className="d-block w-100" height="350px"/>
                    </div>
                    <div className="carousel-item">
                        <img src="images/Slide2.jpeg" alt="" className="d-block w-100" height="350PX"/>
                    </div>
                    <div className="carousel-item">
                        <img src="images/Slide3.png" alt="" className="d-block w-100" height="350PX "/>
                        <div className="carousel-caption">
                            <h2>Accessorise your Life</h2>
                            <p>With us accessory is a necessity that becomes easy</p>
                            <button className="btn btn-danger">Buy Now</button>
                        </div>
                    </div>
                </div>
                <Link to="#my_Carousel" className="carousel-control-prev" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </Link >
                <Link
                 to="#my_Carousel" className="carousel-control-next" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </Link >

                <ol className="carousel-indicators">
                    <li data-bs-target="#my_Carousel" data-bs-slide-to="0" className="active"></li>
                    <li data-bs-target="#my_Carousel" data-bs-slide-to="1" ></li>
                    <li data-bs-target="#my_Carousel" data-bs-slide-to="2" ></li>
                    <li data-bs-target="#my_Carousel" data-bs-slide-to="3"></li>

                </ol> 
            </div>
        </div>
     </section>
    </div>
     );
};
 
export default Carousel;