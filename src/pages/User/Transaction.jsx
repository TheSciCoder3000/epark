import { useNavigate } from "react-router-dom";
import Bkg from "../../assets/img/dash-bkg.png";
import "../../assets/styles/css/Transaction.css";
import { formatDistance } from "date-fns";
import { completeReservation } from "../../api/Firestore";
import { useReservation } from "../../components/contexts/Reservation/hooks";
import { getDecimalHours } from "../../utils/Math";

const Transaction = () => {
    const { reservation } = useReservation();
    const navigate = useNavigate();

    if (!reservation)
        return (
            <div className="user-loading-cont">
                <h4>Retrieving Reservation Data...</h4>
            </div>
        );

    const handlePayment = async () => {
        if (reservation)
            completeReservation(reservation.id)
                .then((transactId) => {
                    alert("Payment successful!");
                    navigate(`/Transaction-Success/${transactId}`);
                })
                .catch(() => {
                    alert("Something went wrong");
                });
    };

    return (
        <div className="dashboard-cont">
            <div className="home-background">
                <div className="overlay"></div>
                <img src={Bkg} alt="Dashboard Background" />
            </div>
            <div className="transactionData">
                <h3>Confirm your Reservation</h3>
                <div className="transactionDetails">
                    <div className="detail-field">
                        <p>Transaction ID:</p>
                        <p className="detail-data">{reservation.id}</p>
                    </div>
                    <div className="detail-field">
                        <p>Reserved hours:</p>
                        <p className="detail-data">
                            {reservation
                                ? formatDistance(
                                      reservation.EndTime.toDate(),
                                      reservation.StartTime.toDate()
                                  )
                                : null}
                        </p>
                    </div>
                    <div className="detail-field">
                        <p>Slot Number:</p>
                        <p className="detail-data">
                            {reservation.parkingSpotId}
                        </p>
                    </div>
                    <div className="detail-field">
                        <p>Payment Amount:</p>
                        <p className="detail-data">
                            Php
                            {(
                                getDecimalHours(
                                    reservation.StartTime.toDate(),
                                    reservation.EndTime.toDate()
                                ) * reservation.price
                            ).toFixed(2)}
                        </p>
                    </div>
                </div>
                <button onClick={handlePayment} className="payment-btn">
                    Pay Now
                </button>
                <button onClick={() => navigate("/")} className="cancel-bn">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default Transaction;
