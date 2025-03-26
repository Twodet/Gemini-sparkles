import { Link } from "react-router-dom";
const Navbar = () => {

    return ( 
        <section className="row">
        <div className="col-md-12">
            <div className="navbar navbar-expand-md navbar-light bg-light">
                <Link to="index.html" className="navbar-brand  " >Gemini Sparkles</Link >

                <button className="navbar-toggler" data-bs-target="#prada" data-bs-toggle="collapse">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="prada">
                    <div className="navbar-nav bg">
                        <Link to="/" className="nav-link">Home</Link >
                        <Link to="/addProducts" className="nav-link">Add Products</Link >
                        <Link to="/signin" className="nav-link">Sign In</Link >
                        <Link to="/signup" className="nav-link">Sign Up</Link >
                        <Link to="/aboutus" className="nav-link">About Us</Link >


                    </div>

                    <div className="navbar-nav ms-auto">
                        <Link to="#" className="nav-link">Login</Link >
                        <Link to="#" className="nav-link">Register</Link >
                    </div>
                </div>

            </div>
        </div>
     </section>
     );
}
 
export default Navbar;