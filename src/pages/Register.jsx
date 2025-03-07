import { useState } from "react";
import { useAuth } from "../components/contexts/useAuth";
import { useNavigate } from "react-router";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [fullName, setFUllName] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (confirmPassword == password) {
      registerUser(email, fullName, vehicleModel, plateNumber, password).then(() => navigate("/login"));
    }
  };

  return (
    <div className="register-cont login-cont">
      <div className="header-cont">
        <h1>Register</h1>
      </div>

      <div className="form-cont">
        <form onSubmit={submitHandler} className="form-main">
          <div className="form-field email-field">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="email"
            />
          </div>
          <div className="form-field name-field">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              onChange={(e) => setname(e.target.value)}
              id="name"
              className="name"
            />
          </div>
          <div className="form-field password-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="password"
            />
          </div>
          <div className="form-field confirm-password-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="password"
              className="password"
            />
          </div>
          <div className="vehicle-container">
            <h2>Vehicle Info</h2>
            <div className="form-field vehicle-field">
              <label htmlFor="vehicle">Vehicle Model</label>
              <input
                type="text"
                onChange={(e) => setVehicleModel(e.target.value)}
                id="vehicle"
                className="vehicle"
              />
            </div>
            <div className="form-field Plate-field">
              <label htmlFor="Plate">Plate Number</label>
              <input
                type="text"
                onChange={(e) => setPlateNumber(e.target.value)}
                id="plate"
                className="plate"
              />
            </div>
          </div>

          <div className="form-actions">
            <button className="register-btn" type="submit">
              REGISTER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
