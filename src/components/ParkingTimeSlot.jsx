import { TimePicker } from 'rsuite';

function ParkingTimeSlot({ onStartChange, onEndChange }) {
    return (
        <div className='parking-timeslot-cont'>
            <TimePicker format="hh:mm aa" onChange={onStartChange} showMeridiem />
            <TimePicker format="hh:mm aa" onChange={onEndChange} showMeridiem />
        </div>
    )
}

export default ParkingTimeSlot