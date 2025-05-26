import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import Footer from "./Footer";

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState("Fetching products...");
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCartState] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const setCart = (newCart) => {
    setCartState(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const navigate = useNavigate();
  const fetchProducts = async () => {
    setError(null);
    setLoading("Fetching products...");
    try {
      const res = await axios.get("https://twodet.pythonanywhere.com/api/getproducts");
      setProducts(res.data);
      setLoading(null);
    } catch {
      setLoading(null);
      setError("Failed to fetch products.");
    }
  };

  useEffect(() => {
    fetchProducts();
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const groupedProducts = products.reduce((acc, product) => {
    const cat = product.product_cat;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(product);
    return acc;
  }, {});

  const addToCart = (product) => {
    const exists = cart.find(p => p.product_id === product.product_id);
    if (exists) {
      setCart(cart.map(p =>
        p.product_id === product.product_id
          ? { ...p, quantity: p.quantity + 1 }
          : p
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const filteredCategories = ["All", ...new Set(products.map(p => p.product_cat))];

  return (
    <div className="min-vh-100 pt-5" style={{ background: "linear-gradient(135deg,rgb(7, 7, 7),rgb(249, 104, 26) 40%,rgb(15, 15, 15) 60%,rgb(250, 93, 21))" }}>
      <div className="container-xl py-5 bg-white rounded-4 shadow-sm">
        <Carousel />
        <hr className="mb-5" />

        {loading && <div className="text-primary text-center display-6">{loading}</div>}

        <div className="row g-3 justify-content-center mb-5 bg-white py-4 px-3 rounded-3 shadow-sm">
          {/* Search */}
          <div className="col-md-4 col-12">
            <input
              type="text"
              className="form-control form-control-lg shadow-sm rounded-pill px-4"
              placeholder="🔍 Search for a product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Category */}
          {/* <div className="col-md-3 col-12">
            <select
              className="form-select form-select-lg shadow-sm rounded-pill px-4"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {filteredCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div> */}
          {/* Sort Order */}
          <div className="col-md-3 col-12">
            <select
              className="form-select form-select-lg shadow-sm rounded-pill px-4"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Price: Low → High</option>
              <option value="desc">Price: High → Low</option>
            </select>
          </div>
        </div>

        {/* Display products and other UI components */}
        <h3 className="display-6 text-dark mb-4">Available Products</h3>
        {error && <b className="text-danger">{error}</b>}

        {Object.entries(groupedProducts)
          .filter(([cat]) => selectedCategory === "All" || cat === selectedCategory)
          .map(([cat, catProducts]) => {
            const filtered = catProducts
              .filter(p => p.product_name.toLowerCase().includes(searchTerm.toLowerCase()))
              .sort((a, b) => sortOrder === "asc" ? a.product_cost - b.product_cost : b.product_cost - a.product_cost);

            return (
              <div key={cat} className="mt-5">
                <h4 className="text-secondary border-bottom pb-2 mb-3">{cat}</h4>
                <div className="row">
                  {filtered.map(product => (
                    <div key={product.product_id} className="col-md-3 mb-4">
                      <div className="card shadow-sm border-0 rounded-4 h-100 bg-light">
                        <img
                          src={`https://twodet.pythonanywhere.com/static/images/${product.product_photo}`}
                          alt={product.product_name}
                          className="card-img-top rounded-top-4"
                          style={{ height: "250px", objectFit: "cover" }}
                        />
                        <div className="card-body d-flex flex-column">
                          <h5 className="fw-bold text-dark">{product.product_name}</h5>
                          <p className="text-muted small mb-1">{product.product_desc.slice(0, 50)}...</p>
                          <h6 className="text-primary">Ksh {product.product_cost.toLocaleString()}</h6>
                          <div className="mt-auto d-grid gap-2">
                            <button
                              className="btn btn-dark rounded-pill"
                              onClick={() => addToCart(product)}
                            >
                              🛒 Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

        {/* <div className="text-center mt-5">
          <button className="btn btn-lg btn-success rounded-pill px-5" onClick={() => navigate("/cart")}>
            View Cart ({cart.length})
          </button>
        </div> */}
      </div>

      {/* Fixed Cart Button */}
      <button
        className="btn btn-warning rounded-circle p-4 position-fixed bottom-0 end-0 m-4 shadow-lg"
        style={{ zIndex: 1000 }}
        onClick={() => navigate("/cart")}
      >
        <span className="text-white fw-bold" style={{ fontSize: "1.5rem" }}>🛒</span>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {cart.length}
        </span>
      </button>

      <Footer />
    </div>
  );
}

export default GetProducts;
