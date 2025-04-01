import "../assets/styles/css/ReservationStatus.css"

function ReservationStatus({ reservation, updateReservation }) {
    const onUpdateReservation = async () => {
        updateReservation(reservation.id, reservation.status == "reserved" ? "occupied" : "finished")
    }


    return (
        <div className='reservation-status-cont'>
            <div className="reservation-indicator">
                <h2 className='parking-name'>{reservation.parkingLot.parkingName}</h2>
                <div className="detail-row">
                    <h4 className="detail-header">Location:</h4>
                    <h4 className="parking-location">{reservation.parkingLot.location}</h4>
                </div>
                <div className="detail-row">
                    <h4 className="detail-header">Parking Slot:</h4>
                    <p className="parking-slot">{reservation.parkingSpotId}</p>
                </div>
                <div className="detail-row">
                    <h4 className="detail-header">Price:</h4>
                    <p className="parking-slot">{reservation.parkingLot.price}</p>
                </div>

                <button className="reservation-control" onClick={onUpdateReservation}>
                    {reservation.status == "reserved" ? "Occupy" : "Finish"}
                </button>
            </div>
        </div>
    )
}

export default ReservationStatus