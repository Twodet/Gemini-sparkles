import axios from "axios";
import { useState } from "react";
import Navbar from "./Navbar";

const SignUp  = () => {

    let [username, setUsername] = useState("");
    let [email, setEmail] = useState("");
    let [phone, setPhone] = useState("");
    let [password, setPassword] = useState("");
    let [loading,setLoading] = useState("");
    let [error,setError] = useState("");
    let [success,setSuccess] = useState("");

    const SubmitForm = async (e) => {
        e.preventDefault();

        try {
            setLoading("Please wait as we upload your data.")
            setError("");

            const data = new FormData();
            data.append("username",username);
            data.append("email",email);
            data.append("phone",phone);
            data.append("password",password);

            const response = await axios.post("https://twodet.pythonanywhere.com/api/signup", data)

            setLoading("");
            setError("");
            setSuccess(response.data.success);
            setUsername("");
            setEmail("");
            setPhone("");
            setPassword("");
        } catch (error) {
            setLoading("");
            setError("Something went wrong");
        }
    };
 


    return ( 
        <div className="row justify-content-center mt-4">
            <Navbar/>
            <div className="col-md-6 card shadow p-4">
                <h2>Sign Up</h2>

                <b className="text-warning">{loading}</b>
                <b className="text-danger">{error}</b>
                <b className="text-success">{success}</b>

                <form onSubmit={SubmitForm}>
                    <input 
                    type="text" 
                    placeholder="Enter Username" 
                    required 
                    onChange={(e)=> setUsername(e.target.value)} 
                    className="form-control" 
                    value={username}
                    />
                    <br />
                    <input type="email"
                    placeholder="Enter Email" 
                    required
                    onChange={(e)=> setEmail(e.target.value)}
                    value={email}
                    className="form-control" 
                    />
                    <br />
                    <input type="tel"
                    placeholder="Enter no"
                    required
                    className="form-control"
                    onChange={(e)=>setPhone(e.target.value)}
                    value={phone}
                    />
                    <br />
                    <input type="password" 
                    placeholder="Enter Password"
                    required
                    className="form-control"
                    onChange={(e)=> setPassword(e.target.value)}
                    value={password}
                    />
                    <br />
                    <button type="submit" className="btn btn-primary" >Sign Up</button>
                </form>
            </div>
        </div>
     );
}
 
export default SignUp ;