import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { Inputs } from "../types/patient";


interface ModelProps {
    showHandler: () => void;
    submitHandler: () => void;
    register: UseFormRegister<Inputs>;
    errors: FieldErrors<Inputs>;
    isSubmitting: boolean;
}
const AddPatientModel = ({
    showHandler,
    submitHandler,
    register,
    errors,
    isSubmitting }: ModelProps) => {
    return (
        <div className="modal-backdrop d-flex justify-content-center align-items-center animate__animated animate__fadeInDown ">
            <div className="card shadow-lg p-3 rounded-4" style={{ width: "400px" }}>
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="m-0">Add Patient</h5>
                    <button className="btn-close" onClick={showHandler}></button>
                </div>
                <form onSubmit={submitHandler} className="card-body">

                    <div className="mb-3">
                        <input
                            {...register("name")}
                            className="form-control"
                            placeholder="Patient Name"
                        />
                        {errors.name && (
                            <small className="text-danger">
                                {errors.name.message}
                            </small>
                        )}
                    </div>

                    <div className="mb-3">
                        <input
                            {...register("phone")}
                            className="form-control"
                            placeholder="Phone Number"
                        />
                        {errors.phone && (
                            <small className="text-danger">
                                {errors.phone.message}
                            </small>
                        )}
                    </div>

                    <div className="mb-3">
                        <select
                            {...register("blood")}
                            className="form-select"
                            defaultValue={"Blood Group"}
                        >
                            <option value="Blood Group" disabled>Blood Group</option>
                            <option value="AB+">AB+</option>
                            <option value="A+">A+</option>
                            <option value="B+">B+</option>
                            <option value="O+">O+</option>
                            <option value="AB-">AB-</option>
                            <option value="A-">A-</option>
                            <option value="B-">B-</option>
                            <option value="O-">O-</option>
                        </select>
                        {errors.blood && (
                            <small className="text-danger">
                                {errors.blood.message}
                            </small>
                        )}
                    </div>
                    <div className="mb-3">
                        <select
                            {...register("bookingType")}
                            className="form-select"
                            defaultValue="Booking Type"

                        >
                            <option value="Booking Type" disabled>Booking Type</option>
                            <option value="direct">Direct</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="emergency">Emergency</option>
                        </select>
                        {errors.bookingType && (
                            <small className="text-danger">
                                {errors.bookingType.message}
                            </small>
                        )}
                    </div>
                    <div className="mb-3">
                        <select
                            {...register("status")}
                            className="form-select"
                            defaultValue="Status"
                        >
                            <option value={'Status'} disabled>Status</option>
                            <option value="appointment">Appointment</option>
                            <option value="waiting">Waiting</option>
                            <option value="treatment">Treatment</option>
                        </select>
                        {errors.status && (
                            <small className="text-danger">
                                {errors.status.message}
                            </small>
                        )}
                    </div>


                    <div className="mb-3">
                        <input
                            type="date"
                            {...register("bookingDate")}
                            className="form-control"
                        />
                        {errors.bookingDate && (
                            <small className="text-danger">
                                {errors.bookingDate.message}
                            </small>
                        )}
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={showHandler}
                        >
                            Close
                        </button>

                        <button
                            type="submit"
                            className="btn btn-success"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>



            </div>
        </div>
    );
};

export default AddPatientModel;
