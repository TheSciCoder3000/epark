import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/css/TransactionSuccess.css"
import Bkg from "../../assets/img/dash-bkg.png";

const TransactionSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard-cont">
            <div className="Success-transaction">
                <div className="home-background">
                    <div className="overlay"></div>
                    <img src={Bkg} alt="Dashboard Background" />
                </div>
            <h2>Payment Successful!</h2>
            <div className="Sucess-transaction-details">
                <p><strong>Transaction ID:</strong> TXN-123456</p>
                <p><strong>Reservation Slot:</strong> 1</p>
                <p><strong>Reserved Hours:</strong> 3 hrs</p>
                <p><strong>
                Payment Amount: Php150.00
                </strong>
                </p>
            </div>


            <button
                onClick={() => navigate("/")}
                className="back-button"
            >
                Go Back to Home
            </button>
            </div>
        </div>
    );
};

export default TransactionSuccess;