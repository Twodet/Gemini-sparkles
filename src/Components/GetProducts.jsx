import axios from "axios";
import { useEffect,useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import Footer from "./Footer";

 
 
 const GetProducts = ()=>{

        let [products, setProducts] = useState([]);
        let [loading, setLoading] = useState("");
        let [error, setError] = useState("");
        let [filteredProducts, setFilteredProducts] = useState([])
        const [searchQuery, setSearchQuery] = useState(''); // state for search input

    
        const img_url = "https://twodet.pythonanywhere.com/static/images/"
    
        const navigate = useNavigate();
    
        // Function to fetch products from API
        const getProducts = async() =>{
            setError("");
            setLoading("Please wait, receiving the products...")
    
            try {
               const response = await axios.get ("https://twodet.pythonanywhere.com/api/getproducts") 
            
               setLoading("");
               setProducts(response.data);
               setFilteredProducts(response.data);
            } catch (error) {
               setLoading("");
               setError(error.message);
    
            }
        };
        const handleSearch = (value) => {
            const filtered = products.filter((product) =>
                product.product_name.toLowerCase().includes(value.toLowerCase()) 
              
            )
            setFilteredProducts(filtered);
        };

//         const handleSearch = (e) => {
//             const query = e.target.value;
//             setSearchQuery(query);

//             // Filter products by name or description
// const filtered = products.filter(
//     (product) =>
//     product.product_name.toLowerCase().includes(query.toLowerCase()) ||
//     product.product_desc.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredProducts(filtered); // Update the filtered products
//     };
    
        useEffect(()=> {
            getProducts();
        },[])
    
        return(
            <div className="row">
                {/* Mount Navbar Component */}
                {/* <nav className="m-4">
                    <Link className="btn btn-dark mx-2" to = "/"  >Home</Link>
                    <Link className="btn btn-dark mx-2" to = "/addproduct"  >Add Product</Link>
                    <Link className="btn btn-dark mx-2" to = "/signin"  >Sign In</Link>
                    <Link className="btn btn-dark mx-2" to = "/signup"  >Sign Up</Link>
                </nav> */}

                <Navbar />
                {/* Mount the Carousel Component */}
                <Carousel/>
    
                <h3>Available Products</h3>
    
                <b className="text-danger">{error}</b>
                <b className="text-warning">{loading}</b>
                <div className="row justify-content-center my-4">
                    <div className="col-md-4">
                        <input 
                        type="text" 
                        placeholder="Search product by name" 
                        className="form-control" 
                        onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                </div>


                {filteredProducts.map((product)=>(
                    <div className="col-md-3 justify-content-center mb-4">
                    <div className="card shadow">

                        <img
                        src={img_url+ product.product_photo}
                        alt="" 
                        className="product_img mt-4" />
    
    
                        <div className="card-body">
                            <h5 className="mt-2">{product.product_name}</h5>
                            <p className="text-muted">{product.product_desc.slice(0,10)} </p>
                            <b className="text-warning">ksh{product.product_cost}</b>
                            {/* {product.product_id} */}
                            <button 
                            className="btn btn-secondary w-100" 
                            onClick={()=> navigate("/singleproduct",{state: { product }})}
                            
                            >
                            View Product
                            </button>
                        </div>
                    </div>
                </div>
    
                ))}
                <Footer/>
    
                
            </div>
    
    
);
    };

export default GetProducts;