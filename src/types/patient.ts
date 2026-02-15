import z from "zod";

export interface IPatient {
    id: number,
    name: string,
    phone: string,
    blood: string,
    bookingDate: string,
    bookingType: "direct" | "scheduled" | "emergency",
    status: "appointment" | "waiting" | "treatment",
}
export const schema = z.object({
    name: z.string().min(1, "Patient name is required"),
    phone: z.string().min(1).regex(/^[0-9]+$/, "Phone must contain only numbers"),
    blood: z.string().min(1, "Blood group is required"),
    bookingType: z.enum(["direct", "scheduled", "emergency"]),
    status: z.enum(["appointment", "waiting", "treatment"]),
    bookingDate: z.string().min(1, "Appointment date is required"),
});

export type Inputs = z.infer<typeof schema>;