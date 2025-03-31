import { TimePicker } from 'rsuite';

function ParkingTimeSlot({ onChange }) {
    return (
        <div className='parking-timeslot-cont'>
            <TimePicker format="hh:mm aa" onChange={onChange} showMeridiem />
        </div>
    )
}

export default ParkingTimeSlot