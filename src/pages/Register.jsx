import { useState } from "react";
import { useAuth } from "../components/contexts/useAuth";
import { Link, useNavigate } from "react-router";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [parkingName, setParkingName] = useState("");
    const [location, setLocation] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("User");
    const { registerUser } = useAuth();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        if (confirmPassword == password) {
            registerUser(email, password, {
                email: email,
                role: role,
                parkingName: parkingName,
                location: location
            }).then(() => navigate("/login"));
        }
    }

    return (
        <div className="register-cont login-cont">
            <div className="header-cont">
                <h1>Register</h1>
            </div>

            <div className={`role-selector-cont ${role}-selected`}>
                <button className="user-btn" onClick={() => setRole("User")}>User</button>
                <button className="lot-owner-btn" onClick={() => setRole("Admin")}>Lot Owner</button>
            </div>

            <div className="form-cont">
                <form onSubmit={submitHandler} className="form-main">
                    <div className="form-field email-field">
                        <label htmlFor="email">Email</label>
                        <input type="text" onChange={e => setEmail(e.target.value)} id="email" className="email" />
                    </div>
                    {role == "User" ?
                        <>
                        </>
                        :
                        <>
                            <div className="form-field parking-name-field">
                                <label htmlFor="parking-name">Name of Parking Lot</label>
                                <input type="text" onChange={e => setParkingName(e.target.value)} id="parking-name" className="parking-name" />
                            </div>
                            <div className="form-field location-field">
                                <label htmlFor="location">Location</label>
                                <input type="text" onChange={e => setLocation(e.target.value)} id="location" className="location" />
                            </div>
                        </>
                    }
                    <div className="form-field password-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" onChange={e => setPassword(e.target.value)} id="password" className="password" />
                    </div>
                    <div className="form-field confirm-password-field">
                        <label htmlFor="confirm-password">Password</label>
                        <input type="password" onChange={e => setConfirmPassword(e.target.value)} id="confirm-password" className="confirm-password" />
                    </div>

                    <div className="form-actions">
                        <Link to="/login">Already have an account?</Link>
                        <button className="register-btn" type="submit">LOGIN</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register