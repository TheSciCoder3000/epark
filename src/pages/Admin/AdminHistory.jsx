import { format } from "date-fns";
import Bkg from "../../assets/img/dash-bkg.png";
import "../../assets/styles/css/AdminHistory.css";
import { useReservation } from "../../components/contexts/Reservation/hooks";
import { getDecimalHours } from "../../utils/Math";
import { useState } from "react";
import { isToday } from "../../../node_modules/date-fns/isToday";
import { isSameMonth } from "../../../node_modules/date-fns/isSameMonth";
import { useAuth } from "../../components/contexts/Auth/hooks";

const AdminHistory = () => {
    const { history } = useReservation();
    const [filter, setFilter] = useState("all");
    const { currentUser } = useAuth();

    const getTotalRevenue = (transactions) => {
        return transactions
            .reduce((total, trans) => {
                return total + trans.total;
            }, 0)
            .toFixed(2);
    };

    const DynamicFilters = (item, filterType) => {
        const vehicleTypes = currentUser.lots.map((item) => ({
            name: item.name,
            type: item.type,
        }));

        if (filterType === "all") return true;
        else if (filterType === "today" && isToday(item.StartTime.toDate()))
            return true;
        else if (
            filterType === "month" &&
            isSameMonth(item.StartTime.toDate(), new Date())
        )
            return true;
        else if (
            vehicleTypes.find(
                (vehicle) =>
                    vehicle.type == filterType &&
                    vehicle.name == item.parkingSpotId
            )
        )
            return true;
        return false;
    };

    return (
        <div className="admin-history-cont">
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

            <div className="transaction-list-cont">
                <h2 className="history-title">Transaction History</h2>

                <div className="filter-cont">
                    <button
                        onClick={() => setFilter("all")}
                        className={`filter-btn all-filter${
                            filter === "all" ? " active" : ""
                        }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter("today")}
                        className={`filter-btn today-filter${
                            filter === "today" ? " active" : ""
                        }`}
                    >
                        Today
                    </button>
                    <button
                        onClick={() => setFilter("month")}
                        className={`filter-btn month-filter${
                            filter === "month" ? " active" : ""
                        }`}
                    >
                        This Month
                    </button>
                    <button
                        onClick={() => setFilter("Motor")}
                        className={`filter-btn motor-filter${
                            filter === "Motor" ? " active" : ""
                        }`}
                    >
                        Motor
                    </button>
                    <button
                        onClick={() => setFilter("Car")}
                        className={`filter-btn car-filter${
                            filter === "Car" ? " active" : ""
                        }`}
                    >
                        Car
                    </button>
                </div>

                <hr />

                {/* Scrollable Table Container */}
                <div className="history-container">
                    {history
                        .filter((item) => DynamicFilters(item, filter))
                        .map((receipt) => (
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
                                        {format(
                                            receipt.EndTime.toDate(),
                                            "MM/dd"
                                        )}
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default AdminHistory;
