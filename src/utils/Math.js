import { differenceInMilliseconds } from "date-fns";

/**
 *
 * @param {Date} StartTime
 * @param {Date} EndTime
 * @returns
 */
export const getDecimalHours = (StartTime, EndTime) => {
    const diffMs = differenceInMilliseconds(EndTime, StartTime); // Get difference in milliseconds
    return diffMs / (1000 * 60 * 60);
};
