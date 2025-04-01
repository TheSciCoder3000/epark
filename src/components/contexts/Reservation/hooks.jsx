import { createContext, useContext } from "react";

export const ReservationContext = createContext();

export const useReservation = () => useContext(ReservationContext);