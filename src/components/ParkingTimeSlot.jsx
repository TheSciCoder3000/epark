import { TimePicker } from 'rsuite';

function ParkingTimeSlot({ onStartChange, onEndChange }) {
    return (
        <div className='parking-timeslot-cont'>
            <div className="field">
                <label>Time Start: </label>
                <TimePicker defaultValue={new Date()} format="hh:mm aa" onChange={onStartChange} showMeridiem />
            </div>

            <div className="field">
                <label>Time End: </label>
                <TimePicker defaultValue={new Date()} format="hh:mm aa" onChange={onEndChange} showMeridiem />
            </div>
        </div>
    )
}

export default ParkingTimeSlot