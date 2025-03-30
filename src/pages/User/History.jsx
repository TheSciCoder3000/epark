import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom'
import "../../assets/styles/css/UserHistory.css"

const previousTransactions = [
    {
        id: 1,
        date: new Date("03/31/2025"),
        duration: "3 hrs",
        location: "De La Salle University"
    },
    {
        id: 2,
        date: new Date("04/5/2025"),
        duration: "2 hrs",
        location: "SM Moa"
    },
    {
        id: 3,
        date: new Date("04/10/2025"),
        duration: "3.5 hrs",
        location: "Vikings Manila"
    },
]

function History() {
    const navigate = useNavigate();

    const onBackClickHandler = () => {
        console.log("test");
        navigate(-1);
    }

    return (
        <div className="history-cont">
            <div className="top-bar">
                <button className="back" onClick={onBackClickHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" /></svg>
                </button>
                <h1>History</h1>
                <button className="search"></button>
            </div>

            <div className="current-transaction-cont">

            </div>

            <div className="previous-transaction-history">
                <h5 className='header'>Previous</h5>
                <div className="transaction-items">
                    {previousTransactions.map((item, indx) => (
                        <div key={indx} className="prev-trans-item">
                            <div className="main-details">
                                <h4 className='name'>{item.location}</h4>
                                <p className="date">{format(item.date, "LLL d, yyyy")}</p>
                            </div>

                            <h4 className="duration">{item.duration}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default History