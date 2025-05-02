import { format } from "date-fns";
import Bkg from "../../assets/img/dash-bkg.png";
import "../../assets/styles/css/AdminHistory.css";
import { useReservation } from "../../components/contexts/Reservation/hooks";
import { getDecimalHours } from "../../utils/Math";

const AdminHistory = () => {
    const { history } = useReservation();

    const getTotalRevenue = (transactions) => {
        return transactions
            .reduce((total, trans) => {
                return total + trans.total;
            }, 0)
            .toFixed(2);
    };

    return (
        <div className="dashboard-cont">
            <div className="home-background">
                <div className="overlay"></div>
                <img src={Bkg} alt="Dashboard Background" />
            </div>

            <div className="total-revenue-cont">
                <h1 className="revenue-counter">
                    Php {getTotalRevenue(history)}
                </h1>
                <p className="desc">Total Revenue</p>
            </div>

            <h2 className="history-title">Transaction History</h2>

            {/* Scrollable Table Container */}
            <div className="history-container">
                {history.map((receipt) => (
                    <div key={receipt.id} className="transaction-cont">
                        <div className="main-info">
                            <h2 className="user-name">
                                {receipt.user.fullName}
                            </h2>
                            <p className="duration">
                                {Math.round(
                                    getDecimalHours(
                                        receipt.StartTime.toDate(),
                                        receipt.EndTime.toDate()
                                    )
                                )}{" "}
                                hrs
                            </p>
                        </div>
                        <div className="sub-info">
                            <h3 className="total">
                                Php {receipt.total.toFixed(2)}
                            </h3>
                            <p className="date">
                                {format(receipt.EndTime.toDate(), "MM/dd")}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminHistory;
