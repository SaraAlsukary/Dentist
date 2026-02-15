import type { IPatient } from "../types/patient";

export const initialPatients: IPatient[] = [
    {
        id: 1,
        name: "Ahmad Ali",
        phone: "0999999999",
        bookingDate: "2026-02-14",
        bookingType: "scheduled",
        blood: "A+",
        status: "appointment",
    },
    {
        id: 2,
        name: "Sara Khaled",
        phone: "0988888888",
        blood: "O+",
        bookingDate: "2026-02-14",
        bookingType: "direct",
        status: "waiting",
    },
    {
        id: 3,
        name: "Omar Hassan",
        phone: "0977777777",
        blood: "AB+",
        bookingDate: "2026-02-14",
        bookingType: "emergency",
        status: "treatment",
    },
];