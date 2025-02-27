import { useState } from "react";
import { useAuth } from "../components/contexts/useAuth";
import { useNavigate } from "react-router";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { registerUser } = useAuth();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        if (confirmPassword == password) {
            registerUser(email, password).then(() => navigate("/login"));
        }
    }

    return (
        <div className="register-cont login-cont">
            <div className="header-cont">
                <h1>Register</h1>
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
                    <div className="form-field confirm-password-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" onChange={e => setConfirmPassword(e.target.value)} id="password" className="password" />
                    </div>

                    <div className="form-actions">
                        <button className="register-btn" type="submit">LOGIN</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register