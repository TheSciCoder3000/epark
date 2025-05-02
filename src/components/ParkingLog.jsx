import "../assets/styles/css/ParkingLog.css";
import { getDecimalHours } from "../utils/Math";

const ParkingLog = ({ logs }) => {
    return (
        <div className="admin-parking-log-cont">
            <ul className="admin-parking-log-list">
                {logs.length > 0 ? (
                    logs.map((log, index) => (
                        <div key={index} className="admin-parking-log-item">
                            <h2>{log.user.fullName}</h2>
                            <p>{log.user.plateNumber}</p>
                            <p>
                                {Math.round(
                                    getDecimalHours(
                                        log.StartTime.toDate(),
                                        log.EndTime.toDate()
                                    )
                                )}{" "}
                                Hrs
                            </p>
                        </div>
                    ))
                ) : (
                    <li className="admin-no-records">
                        No parking records available
                    </li>
                )}
            </ul>
        </div>
    );
};

export default ParkingLog;
