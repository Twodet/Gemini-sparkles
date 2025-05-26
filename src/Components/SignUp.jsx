import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [strength, setStrength] = useState('');
  const [progress, setProgress] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const evaluateStrength = (pwd) => {
    let strengthValue = "";
    let progressValue = 0;

    if (pwd.length === 0) {
      strengthValue = "";
      progressValue = 0;
    } else if (pwd.length < 6) {
      strengthValue = "Weak";
      progressValue = 33;
    } else if (
      /[A-Z]/.test(pwd) &&
      /[0-9]/.test(pwd) &&
      /[^A-Za-z0-9]/.test(pwd)
    ) {
      strengthValue = "Strong";
      progressValue = 100;
    } else {
      strengthValue = "Medium";
      progressValue = 66;
    }

    setStrength(strengthValue);
    setProgress(progressValue);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      setLoading('Please be patient...');
      setError('');
      setSuccess('');

      const data = new FormData();
      data.append('username', username);
      data.append('password', password);
      data.append('email', email);
      data.append('phone', phone);
      data.append('address', address);

      const response = await axios.post('https://twodet.pythonanywhere.com/api/signup', data);
      setLoading('');
      setSuccess(response.data.success);
      setUsername('');
      setPassword('');
      setEmail('');
      setPhone('');
      setAddress('');
      setStrength('');
      setProgress(0);
    } catch (error) {
      setLoading('');
      setError(error.message);
    }
  };

  const strengthColor = {
    Weak: "bg-danger",
    Medium: "bg-warning",
    Strong: "bg-success",
  }[strength] || "";

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, rgb(7, 7, 7), rgb(249, 104, 26) 40%, rgb(15, 15, 15) 60%, rgb(250, 93, 21))",
      paddingTop: "50px",
      paddingBottom: "50px"
    }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="card shadow-lg border-0 rounded-4">
              <div
                className="card-header text-white rounded-top-4"
                style={{
                  background: "linear-gradient(135deg, #0f0f0f, #ff5722)"
                }}
              >
                <h4 className="text-center mb-0 py-2 fw-bold">Create Account</h4>
              </div>
              <div className="card-body p-4">
                {loading && <div className="alert alert-warning">{loading}</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={submitForm}>
                  {/* Username */}
                  <div className="mb-3 input-group">
                    <input
                      className="form-control form-control-lg rounded-start-pill shadow-sm"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      type="text"
                      placeholder="Username"
                      required
                    />
                    <span className="input-group-text rounded-end-pill bg-white">
                      <i className="bi bi-person-circle"></i>
                    </span>
                  </div>

                  {/* Password */}
                  <div className="mb-3 input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      onChange={(e) => {
                        const pwd = e.target.value;
                        setPassword(pwd);
                        evaluateStrength(pwd);
                      }}
                      value={password}
                      required
                      placeholder="Password"
                      className="form-control form-control-lg rounded-start-pill shadow-sm"
                    />
                    <span
                      className="input-group-text rounded-end-pill bg-white"
                      onClick={togglePassword}
                      style={{ cursor: "pointer" }}
                    >
                      <i className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
                    </span>
                  </div>

                  {/* Password Strength Meter */}
                  {strength && (
                    <div className="mb-3">
                      <small>Password Strength: <strong className={strengthColor}>{strength}</strong></small>
                      <div className="progress" style={{ height: "8px" }}>
                        <div
                          className={`progress-bar ${strengthColor}`}
                          role="progressbar"
                          style={{ width: `${progress}%` }}
                          aria-valuenow={progress}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  <div className="mb-3 input-group">
                    <input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                      placeholder="Email"
                      className="form-control form-control-lg rounded-start-pill shadow-sm"
                    />
                    <span className="input-group-text rounded-end-pill bg-white">
                      <i className="bi bi-envelope-heart-fill"></i>
                    </span>
                  </div>

                  {/* Phone */}
                  <div className="mb-3 input-group">
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      className="form-control form-control-lg rounded-start-pill shadow-sm"
                    />
                    <span className="input-group-text rounded-end-pill bg-white">
                      <i className="bi bi-telephone-fill"></i>
                    </span>
                  </div>

                  {/* Address */}
                  <div className="mb-4 input-group">
                    <input
                      type="text"
                      className="form-control form-control-lg rounded-start-pill shadow-sm"
                      required
                      placeholder="Address"
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                    />
                    <span className="input-group-text rounded-end-pill bg-white">
                      <i className="bi bi-geo-alt-fill"></i>
                    </span>
                  </div>

                  {/* Submit */}
                  <button
                    className="btn btn-lg w-100 rounded-pill fw-bold shadow-sm text-white"
                    type="submit"
                    style={{
                      background: "linear-gradient(135deg, #5625e9, #f56e0d)",
                      border: "none"
                    }}
                  >
                    Sign Up
                  </button>

                  {/* Terms */}
                  <div className="form-check mt-4 text-center">
                    <input type="checkbox" className="form-check-input me-2" required />
                    <label className="form-check-label small">
                      I agree to the <a href="#" className="text-decoration-underline">Terms</a> &amp; <a href="#" className="text-decoration-underline">Privacy Policy</a>
                    </label>
                  </div>

                  {/* Login link */}
                  <p className="text-center mt-3">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-decoration-none fw-bold text-warning">Login</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
