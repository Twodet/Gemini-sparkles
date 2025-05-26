import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AddProducts = () => {
    let [product_name, setProductName] = useState("");
    let [product_desc, setProductDesc] = useState("");
    let [product_cost, setProductCost] = useState("");
    let [product_photo, setProductPhoto] = useState("");

    let [loading, setLoading] = useState("");
    let [error, setError] = useState("");
    let [success, setSuccess] = useState("");

    const SubmitForm = async (e) => {
        e.preventDefault()

        try {
            setError("");
            setSuccess("");
            setLoading("Please Wait....");

            //creates a representation of a form the input fields and the data entered in the input fields
            const data = new FormData();
            data.append("product_name", product_name);
            data.append("product_desc", product_desc);
            data.append("product_cost", product_cost);
            data.append("product_photo", product_photo);

            const response = await axios.post("https://twodet.pythonanywhere.com/api/addproduct", data);
            setLoading("")
            setSuccess(response.data.Success);
            setProductName("");
            setProductDesc("");
            setProductCost("");
            setProductPhoto("");

        } catch (error) {
            setLoading("");
            setError(error.message);
        }
    }

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
                            <h4 className="text-center mb-0 py-2 fw-bold">Add New Product</h4>
                        </div>
                        <div className="card-body p-4">
                            {loading && <div className="alert alert-warning">{loading}</div>}
                            {error && <div className="alert alert-danger">{error}</div>}
                            {success && <div className="alert alert-success">{success}</div>}

                            <form onSubmit={SubmitForm}>
                                <div className="mb-3">
                                    <label className="form-label">Product Name</label>
                                    <input
                                        type="text"
                                        className="form-control rounded-pill"
                                        placeholder="Enter product name"
                                        onChange={(e) => setProductName(e.target.value)}
                                        value={product_name}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-control rounded-3"
                                        placeholder="Enter product description"
                                        rows="3"
                                        onChange={(e) => setProductDesc(e.target.value)}
                                        value={product_desc}
                                        required
                                    ></textarea>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Cost</label>
                                    <input
                                        type="text"
                                        className="form-control rounded-pill"
                                        placeholder="Enter product cost"
                                        onChange={(e) => setProductCost(e.target.value)}
                                        value={product_cost}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Upload Photo</label>
                                    <input
                                        type="file"
                                        className="form-control rounded-pill"
                                        onChange={(e) => setProductPhoto(e.target.files[0])}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 rounded-pill fw-bold"
                                    style={{
                                        background: "linear-gradient(135deg, rgb(86, 37, 233), rgb(245, 110, 13))",
                                        border: "none",
                                    }}
                                >
                                    Add Product
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AddProducts;
