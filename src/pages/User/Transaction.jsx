import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Bkg from "../../assets/img/dash-bkg.png";
import "../../assets/styles/css/Transaction.css"

const Transaction = () => {
    const navigate = useNavigate();
    const [transactionData, setTransactionData] = useState([null]);

    useEffect(() => {
        setTransactionData ({
            transactionID : `TXN-${Math.floor(Math.random() * 1000000)}`,
            dateTime: new Date().toLocaleString(),
            slotNumber: "1",
            reservedHrs: "4hrs",
            paymentAmount: "150",
        });
    }, []);

    const handlePayment = () => {
        alert("Payment successful!");
        navigate("/Transaction-Success");
    }

    if (!transactionData) {
        return <div className="text-center">Loading transaction details...</div>;
    }
    return (
        
        <div className="dashboard-cont">
            <div className="home-background">
                <div className="overlay"></div>
                <img src={Bkg} alt="Dashboard Background" />
            </div>
            <div className="transactionData">
                <h3>Confirm your Reservation</h3>
                <div className ="transactionDetails">
                    <p>Transaction ID: {transactionData.transactionID}</p>
                    <p>Date and Time: {transactionData.dateTime}</p>
                    <p>Slot Number: {transactionData.slotNumber}</p>
                    <p>Reserved Hours: {transactionData.reservedHrs}</p>
                    <p>Payment Amount: Php{transactionData.paymentAmount}</p>
                </div>
                <button onClick={handlePayment} className='payment-btn'>Pay Now</button>
                <button onClick={() => navigate("/")} className='cancel-bn'>Cancel</button>
            </div>
        </div>
    )
}

export default Transaction
