import React from "react";
import "../assets/styles/css/RevenueCard.css";

const RevenueCard = ({ title, revenue }) => {
    return (
        <div className="revenue-card">
            <h4>{title}</h4>
            <p className="revenue-amount">${revenue.toLocaleString()}</p>
        </div>
    );
};

export default RevenueCard;