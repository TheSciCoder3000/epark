import { useNavigate, useParams } from 'react-router-dom'
import Bkg from "../../assets/img/dash-bkg.png";
import "../../assets/styles/css/Transaction.css"
import { differenceInMilliseconds, formatDistance } from 'date-fns';
import { completeReservation } from '../../api/Firestore';
import { useReservation } from '../../components/contexts/Reservation/hooks';

const Transaction = () => {
    const { reservation } = useReservation();
    const navigate = useNavigate();

    if (!reservation) return (
        <div className="user-loading-cont">
            <h4>Retrieving Reservation Data...</h4>
        </div>
    )

    const handlePayment = async () => {
        if (reservation) completeReservation(reservation.id)
            .then(transactId => {
                alert("Payment successful!");
                navigate(`/Transaction-Success/${transactId}`);
            })
            .catch(err => {
                alert("Something went wrong")
            })
    }

    const getDecimalHours = () => {
        const diffMs = differenceInMilliseconds(reservation.EndTime.toDate(), reservation.StartTime.toDate()); // Get difference in milliseconds
        return diffMs / (1000 * 60 * 60);
    }

    return (
        <div className="dashboard-cont">
            <div className="home-background">
                <div className="overlay"></div>
                <img src={Bkg} alt="Dashboard Background" />
            </div>
            <div className="transactionData">
                <h3>Confirm your Reservation</h3>
                <div className="transactionDetails">
                    <p>Transaction ID: {reservation.id}</p>
                    <p>Reserved hours: {reservation ? formatDistance(reservation.EndTime.toDate(), reservation.StartTime.toDate()) : null}</p>
                    <p>Slot Number: {reservation.parkingSpotId}</p>
                    <p>Payment Amount: Php{(getDecimalHours() * reservation.price).toFixed(2)}</p>
                </div>
                <button onClick={handlePayment} className='payment-btn'>Pay Now</button>
                <button onClick={() => navigate("/")} className='cancel-bn'>Cancel</button>
            </div>
        </div>
    )
}

export default Transaction
