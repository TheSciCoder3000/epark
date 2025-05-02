import "../assets/styles/css/ParkingLog.css";

const ParkingLog = ({ logs }) => {
    return (
        <div className="admin-parking-log-cont">
            <ul className="admin-parking-log-list">
                {logs.length > 0 ? (
                    logs.map((log, index) => (
                        <div key={index} className="admin-parking-log-item">
                            <h2>{log.client}</h2>
                            <p>{log.plate}</p>
                            <p>{log.reservedHours} Hrs</p>
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
