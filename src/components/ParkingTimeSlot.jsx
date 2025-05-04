import { TimePicker } from "rsuite";

function ParkingTimeSlot({ onStartChange, onEndChange, disabledDates }) {
    return (
        <div className="parking-timeslot-cont">
            <div className="field">
                <label>Time Start: </label>
                <TimePicker
                    preventOverflow={true}
                    defaultValue={new Date()}
                    format="MM/dd/yyyy hh:mm aa"
                    onChange={onStartChange}
                    showMeridiem
                />
            </div>

            <div className="field">
                <label>Time End: </label>
                <TimePicker
                    preventOverflow={true}
                    defaultValue={new Date()}
                    format="MM/dd/yyyy hh:mm aa"
                    onChange={onEndChange}
                    showMeridiem
                />
            </div>
        </div>
    );
}

export default ParkingTimeSlot;
