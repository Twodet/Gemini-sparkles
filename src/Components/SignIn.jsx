import axios from "axios";
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import Navbar from "./Navbar";

const SignIn = () => {
    
    let [username,setUsername] = useState("")
    let [password,setPassword] = useState("")
    let [loading,setLoading] = useState("")
    let [error,setError] = useState("")
    let [success,setSuccess] = useState("")

    const navigate = useNavigate();

    const submitForm = async (e) =>{
        e.preventDefault();

        try {
            setError("");
            setSuccess("");
            setLoading("Please wait...");

            const data = new FormData();
            data.append("username",username);
            data.append("password",password);


            const response = await axios.post ("https://twodet.pythonanywhere.com/api/signin", data);
            if(response.data.user){
                localStorage.setItem("user",JSON.stringify(response.data.user))
                navigate("/")
            }else{
                setLoading("")
                setError(response.data.message);
            }
        } catch (error) {
            setLoading("");
            setError("Something went wrong")
        }
    };

    const togglePassword = () => {
        const passwordInput = document.getElementById("password");
        const icon = document.getElementById("icon")

        let current_type = passwordInput.getAttribute("type")
        let new_type = ""
        if(current_type === "password"){
            new_type = "text"
            icon.classList.remove("bi-eye-fill");
            icon.classList.add("bi-eye-slash-fill");

        }else{
            new_type = "password"
            icon.classList.add("bi-eye-fill");
            icon.classList.remove("bi-eye-slash-fill");
        };

        passwordInput.setAttribute("type", new_type);
    };

    return ( 


        <div className="row justify-content-center mt-4">
            <Navbar/>
            <div className="col-md-6 card shadow p-4">
                <h2>Sign In</h2>

                <b className="text-warning">{loading}</b>
                <b className="text-danger">{error}</b>
                <b className="text-success">{success}</b>


                <form onSubmit={submitForm}>
                    <input 
                    type="username" 
                    placeholder="Enter username" 
                    required 
                    className="form-control" 
                    onChange={(e)=> setUsername(e.target.value)}
                    />
                    <br />
                    <div className="input-group">
                    <input type="password"
                    placeholder="Enter Password"
                    required
                    id="password"
                    className="form-control" 
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="input-group-text" onClick={togglePassword}>
                        <i class="bi bi-eye-fill" id="icon"></i></span>
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Sign In</button>
                    <br />
                </form>
                <br />
                <p>Don't have an account? <Link to = "/signup">Sign Up</Link></p>
            </div>
        </div>
     );
}
 
export default SignIn;