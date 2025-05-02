import "../assets/styles/css/RevenueCard.css";

const RevenueCard = ({ title, revenue }) => {
    return (
        <div className="card revenue-card">
            <div className="revenue-info">
                <h2 className="amount">${revenue.toLocaleString()}</h2>
            </div>
            <h4 className="label">{title}</h4>
        </div>
    );
};

export default RevenueCard;
