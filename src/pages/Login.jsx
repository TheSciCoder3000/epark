import { useState } from "react";
import { useAuth } from "../components/contexts/Auth/hooks";
import { Link, Navigate, useNavigate } from "react-router";
import "../assets/styles/css/Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { currentUser, loading, loginUser } = useAuth();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        loginUser(email, password)
            .then(() => navigate("/"))
            .catch(e => console.log(e.message))
    }

    if (loading) return;

    if (currentUser) return <Navigate to="/" />;

    return (
        <div className="login-cont">
            <div className="header-cont">
                <h1>LOGIN</h1>
            </div>

            <div className="form-cont">
                <form onSubmit={submitHandler} className="form-main">
                    <div className="form-field email-field">
                        <label htmlFor="email">Email</label>
                        <input type="text" onChange={e => setEmail(e.target.value)} id="email" className="email" />
                    </div>
                    <div className="form-field password-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" onChange={e => setPassword(e.target.value)} id="password" className="password" />
                    </div>

                    <div className="form-actions">
                        <Link to="/register">Don&apos;t have an account?</Link>
                        <button className="login-btn" type="submit">LOGIN</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login