import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setSuccess("");
      setLoading("Please wait...");

      const data = new FormData();
      data.append("username", username);
      data.append("password", password);

      const response = await axios.post("https://twodet.pythonanywhere.com/api/signin", data);
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      } else {
        setLoading("");
        setError(response.data.message);
      }
    } catch {
      setLoading("");
      setError("Something went wrong");
    }
  };

  const togglePassword = () => {
    const passwordInput = document.getElementById("password");
    const icon = document.getElementById("icon");
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    icon.classList.toggle("bi-eye-fill");
    icon.classList.toggle("bi-eye-slash-fill");
  };

  return (
    <div className="container py-5" style={{
        background: "linear-gradient(135deg, rgb(7, 7, 7), rgb(249, 104, 26) 40%, rgb(15, 15, 15) 60%, rgb(250, 93, 21))"
    }}>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div
            className="card shadow-lg border-0 rounded-4"
            style={{ backgroundColor: "#ffffff" }}
          >
            <div
              className="card-header text-white rounded-top-4"
              style={{
                background: "linear-gradient(135deg, rgb(7, 7, 7), rgb(249, 104, 26) 40%, rgb(15, 15, 15) 60%, rgb(250, 93, 21))"
              }}
            >
              <h4 className="text-center mb-0 py-2 fw-bold">Sign In</h4>
            </div>
            <div className="card-body p-4">
              {loading && <div className="alert alert-warning">{loading}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <form onSubmit={submitForm}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    placeholder="Enter your username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <input
                      type="password"
                      className="form-control rounded-start-pill"
                      id="password"
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span
                      className="input-group-text bg-white rounded-end-pill"
                      style={{ cursor: "pointer" }}
                      onClick={togglePassword}
                    >
                      <i className="bi bi-eye-fill" id="icon"></i>
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 rounded-pill fw-bold"
                  style={{
                    background: "linear-gradient(135deg, rgb(86, 37, 233), rgb(245, 110, 13))",
                    border: "none",
                  }}
                >
                  Sign In
                </button>
              </form>

              <p className="text-center mt-4">
                Don’t have an account?{" "}
                <Link to="/signup" className="text-decoration-none fw-bold text-primary">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
