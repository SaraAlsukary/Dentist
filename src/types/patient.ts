import { z } from "zod";

export const schema = z.object({
    name: z.string().min(1, "Patient name is required"),
    phone: z.string().min(1).regex(/^[0-9]+$/, "Phone must contain only numbers"),
    blood: z.string().min(1, "Blood group is required"),
    bookingType: z.enum(["direct", "scheduled", "emergency"]),
    status: z.enum(["appointment", "waiting", "treatment"]),
    bookingDate: z.string().min(1, "Appointment date is required"),
});

export type Inputs = z.infer<typeof schema>;

export type IPatient extends Inputs {
    id: number;
}
