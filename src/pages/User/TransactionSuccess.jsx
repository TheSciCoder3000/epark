import "../../assets/styles/css/TransactionSuccess.css"
import { useNavigate, useParams } from "react-router-dom";
import Bkg from "../../assets/img/dash-bkg.png";
import { differenceInMilliseconds, formatDistance } from "date-fns";
import { useReservation } from "../../components/contexts/Reservation/hooks";

const TransactionSuccess = () => {
    const { history } = useReservation();
    const { id } = useParams()
    const getHistoryItem = (id) => history.find(item => item.id == id);
    const navigate = useNavigate();

    if (history.length == 0) return <div className="loading-cont">
        <h2>Retrieving Transaction information...</h2>
    </div>

    console.log({ history: getHistoryItem(id) })

    const getDecimalHours = () => {
        const diffMs = differenceInMilliseconds(getHistoryItem(id).EndTime.toDate(), getHistoryItem(id).StartTime.toDate()); // Get difference in milliseconds
        return diffMs / (1000.0 * 60.0 * 60.0);
    }


    const backHandler = () => navigate("/");

    return (
        <div className="dashboard-cont">
            <div className="Success-transaction">
                <div className="home-background">
                    <div className="overlay"></div>
                    <img src={Bkg} alt="Dashboard Background" />
                </div>
                <h2>Payment Successful!</h2>
                <div className="Sucess-transaction-details">
                    <p><strong>Transaction ID:</strong><br /> TXN-123456</p>
                    <p><strong>Reservation Slot:</strong><br /> {getHistoryItem(id).parkingSpotId}</p>
                    <p><strong>Reserved Hours:</strong><br /> {formatDistance(getHistoryItem(id).EndTime?.toDate(), getHistoryItem(id).StartTime?.toDate())}</p>
                    <p>
                        <strong>
                            Payment Amount:
                        </strong><br />
                        Php{(getDecimalHours() * getHistoryItem(id).price).toFixed(2)}
                    </p>
                </div>


                <button
                    onClick={backHandler}
                    className="back-button"
                >
                    Go Back to Home
                </button>
            </div>
        </div>
    );
};

export default TransactionSuccess;