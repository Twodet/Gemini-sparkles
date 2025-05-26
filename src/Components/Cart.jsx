import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCartState] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [cartTotal, setCartTotal] = useState(0);
  const [phone, setPhoneNumber] = useState("");

  const calculateTotal = () => {
    if (cart.length === 0) {
      setCartTotal(0);
      return;
    }

    const total = cart.reduce((sum, item) => {
      const cost = parseFloat(item.product_cost) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return sum + cost * quantity;
    }, 0);

    setCartTotal(total);
  };

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  const setCart = (newCart) => {
    setCartState(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeFromCart = (productIdToRemove) => {
    const updatedCart = cart.filter(item => item.product_id !== productIdToRemove);
    setCart(updatedCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cart.map(item =>
      item.product_id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ).filter(item => item.quantity > 0);
    setCart(updatedCart);
  };

  const handleMpesaCheckout = async () => {
    const normalizedPhone = phone.replace(/\s+/g, "").replace(/^(\+?254|0)/, "254");

    if (!/^2547\d{8}$/.test(normalizedPhone)) {
      alert("Please enter a valid Safaricom phone number (e.g. 0712345678 or +254712345678)");
      return;
    }

    if (cartTotal <= 0) {
      alert("Cart is empty or total is invalid.");
      return;
    }

    try {
      const response = await fetch("https://twodet.pythonanywhere.com/api/mpesa_payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: normalizedPhone, amount: cartTotal }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("M-Pesa prompt sent. Please complete the payment.");
        setCart([]);
        setCartTotal(0);
        setPhoneNumber("");
        navigate("/order-success");
      } else {
        alert(`Payment failed: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("M-Pesa Checkout Error:", error);
      alert("Error connecting to M-Pesa server.");
    }
  };

  return (
    <div className="container py-5" style={{ background: "linear-gradient(135deg,rgb(5, 5, 5),rgb(7, 7, 7))", minHeight: "100vh" }}>
      <h3 className="text-center text-white mb-5 fw-bold" style={{ fontSize: "2.5rem", textShadow: "3px 3px 5px rgba(0, 0, 0, 0.7)" }}>
        🛒 Your Luxurious Cart
      </h3>

      {cart.length === 0 ? (
        <div className="alert alert-warning text-center" style={{ fontSize: "1.2rem", fontWeight: "bold", borderRadius: "12px" }}>
          Your cart is empty. Add some premium items to your cart!
        </div>
      ) : (
        <div className="row gy-4">
          {cart.map((item) => (
            <div key={item.product_id} className="col-md-4 col-lg-3">
              <div className="card h-100 shadow-lg border-0 rounded-4 overflow-hidden" style={{ background: "#fff" }}>
                <img
                  src={`https://twodet.pythonanywhere.com/static/images/${item.product_photo}`}
                  alt={item.product_name}
                  className="card-img-top"
                  style={{ height: "250px", objectFit: "cover", borderRadius: "12px" }}
                />
                <div className="card-body d-flex flex-column justify-content-between p-4" style={{ color: "#333" }}>
                  <div className="mb-3">
                    <h5 className="fw-bold mb-2" style={{ fontSize: "1.1rem", color: "#2b2d42" }}>{item.product_name}</h5>
                    <small className="text-muted" style={{ fontSize: "0.85rem" }}>{item.product_cat}</small>
                    <p className="mt-3 mb-0 fw-semibold" style={{ fontSize: "1.1rem", color: "#f4a300" }}>
                      Ksh {item.product_cost}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.product_id, parseInt(e.target.value, 10))
                      }
                      min="1"
                      className="form-control form-control-sm"
                      style={{ width: "70px", borderRadius: "12px", padding: "8px 12px" }}
                    />
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeFromCart(item.product_id)}
                      style={{ borderRadius: "12px", padding: "8px 12px", fontSize: "0.9rem" }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-5 p-4 bg-white rounded-4 shadow-lg">
          <h4 className="fw-bold" style={{ fontSize: "1.5rem", color: "#2b2d42" }}>
            Total: <span className="text-success" style={{ fontSize: "1.5rem" }}>Ksh {cartTotal.toFixed(2)}</span>
          </h4>
          <label className="form-label mt-3" style={{ fontWeight: "bold", color: "#333", fontSize: "1.1rem" }}>
            M-Pesa Phone Number
          </label>
          <input
            type="tel"
            placeholder="e.g. 0712345678"
            value={phone}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="form-control rounded-4 shadow-sm"
            style={{ padding: "10px 15px", fontSize: "1rem" }}
          />
          <button
            className="btn btn-success w-100 mt-4 rounded-4 shadow-sm fw-bold"
            onClick={handleMpesaCheckout}
            style={{
              fontSize: "1.2rem",
              padding: "12px 20px",
              background: "#f4a300",
              color: "#fff",
              borderRadius: "12px",
              transition: "background 0.3s ease",
            }}
            onMouseOver={(e) => e.target.style.background = "#ff9800"}
            onMouseOut={(e) => e.target.style.background = "#f4a300"}
          >
            Pay with M-Pesa
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
