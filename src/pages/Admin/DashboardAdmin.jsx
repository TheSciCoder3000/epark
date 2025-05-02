import "../../assets/styles/css/DashboardAdmin.css";
import { useState, useEffect } from "react";
import Bkg from "../../assets/img/dash-bkg.png";
import AvailableSlot from "../../components/AvailableSlots";
import ReservedSlot from "../../components/ReservedSlots";
import RevenueCard from "../../components/RevenueCard";
import ParkingLog from "../../components/ParkingLog";
import { useReservation } from "../../components/contexts/Reservation/hooks";
import "../../assets/styles/css/RevenueCard.css";
import { differenceInSeconds, isSameMonth, isToday } from "date-fns";
import { useAuth } from "../../components/contexts/Auth/hooks";

const getTotalPayment = (transaction) => {
    const seconds = differenceInSeconds(
        transaction.EndTime.toDate(),
        transaction.StartTime.toDate()
    );
    return (seconds / 60 / 60) * transaction.price;
};

const DashboardAdmin = () => {
    const { currentUser } = useAuth();
    const { reservation, history } = useReservation();

    const getTodaysRevenue = (transactionList) => {
        let revenueCounter = 0;
        transactionList.forEach((trans) => {
            if (isToday(trans.EndTime.toDate()))
                revenueCounter += getTotalPayment(trans);
        });
        return revenueCounter.toFixed(2);
    };

    const getMonthsRevenue = (transactionList) => {
        let revenueCounter = 0;
        transactionList.forEach((trans) => {
            if (isSameMonth(trans.EndTime.toDate(), new Date()))
                revenueCounter += getTotalPayment(trans);
        });
        return revenueCounter.toFixed(2);
    };

    return (
        <div className="admin-dashboard-cont">
            <div className="home-background">
                <div className="overlay"></div>
                <img src={Bkg} alt="Dashboard Background" />
            </div>

            {/* OPverview Section */}
            <div className="overview-cont">
                <h2 className="header">Overview</h2>
                <div className="card-cont">
                    {/* Added flex container */}
                    <AvailableSlot
                        totalSlots={currentUser.lots.length}
                        parkedCars={
                            reservation?.filter(
                                (item) => item.status == "occupied"
                            ).length || 0
                        }
                        reservedSlots={
                            reservation?.filter(
                                (item) => item.status == "reserved"
                            ).length || 0
                        }
                    />
                    <ReservedSlot
                        reservedSlots={
                            reservation?.filter(
                                (item) => item.status == "reserved"
                            ).length || 0
                        }
                        parkedCars={
                            reservation?.filter(
                                (item) => item.status == "occupied"
                            ).length || 0
                        }
                    />
                    {/* Added flex container */}
                    <RevenueCard
                        title="Today's Revenue"
                        revenue={
                            history.length != 0 ? getTodaysRevenue(history) : 0
                        }
                    />
                    <RevenueCard
                        title="Monthly Revenue"
                        revenue={
                            history.length != 0 ? getMonthsRevenue(history) : 0
                        }
                    />
                </div>
            </div>

            <div className="recents-cont">
                <h2 className="header">Pending</h2>
                <ParkingLog logs={reservation || []} />
            </div>
        </div>
    );
};

export default DashboardAdmin;
