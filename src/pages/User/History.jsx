import { differenceInHours, differenceInMinutes, format } from 'date-fns';
import { useNavigate } from 'react-router-dom'
import "../../assets/styles/css/UserHistory.css"
import { useReservation } from '../../components/contexts/Reservation/hooks';

function History() {
    const { history } = useReservation();
    const navigate = useNavigate();

    const onBackClickHandler = () => {
        console.log("test");
        navigate(-1);
    }

    console.log({ history })

    const timeAgo = (end, start) => {
        const minutes = differenceInMinutes(end, start);

        if (minutes < 60) {
            return `${minutes} min`;
        } else {
            const hours = differenceInHours(end, start);
            return `${hours} hr${hours > 1 ? 's' : ''}`;
        }
    }

    return (
        <div className="history-cont">
            <h1>History</h1>

            <div className="current-transaction-cont">

            </div>

            <div className="previous-transaction-history">
                <h5 className='header'>Previous</h5>
                <div className="transaction-items">
                    {history.map((item) => (
                        <div key={item.id} className="prev-trans-item">
                            <div className="main-details">
                                <h4 className='name'>{item.parkingName}</h4>
                                <p className="slot">{item.parkingSpotId}</p>
                                <p className="date">{format(item.StartTime.toDate(), "LLL d, yyyy")}</p>
                            </div>

                            <h4 className="duration">{timeAgo(item.EndTime.toDate(), item.StartTime.toDate())}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default History