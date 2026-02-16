import { useState } from "react";
import type { IPatient } from "../types/patient";

interface EditStatusModalProps {
    patient: IPatient;
    handleEditSubmit: (id: number,status:IPatient['status']) => void;
    close: () => void;
}

const EditStatusModal = ({ patient, handleEditSubmit, close }: EditStatusModalProps) => {


    const [status, setStatus] = useState<IPatient['status']>(patient.status);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleEditSubmit(patient.id, status);
    };
    return (
        <div className="modal-backdrop d-flex justify-content-center align-items-center animate__animated animate__fadeInDown ">
            <div className="card shadow-lg p-3 rounded-4" style={{ width: "400px" }}>
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="m-0">Edit {patient.name}</h5>
                    <button className="btn-close" onClick={close}></button>
                </div>
                <form className="card-body" onSubmit={onSubmit}>

                    <div className="mb-3">
                        <select
                            className="form-select"
                            defaultValue="Status"
                            onChange={(e) => setStatus(e.target.value as IPatient['status'])}
                        >
                            <option value={'Status'} disabled>Status</option>
                            <option value="appointment">Appointment</option>
                            <option value="waiting">Waiting</option>
                            <option value="treatment">Treatment</option>
                        </select>

                    </div>



                    <div className="d-flex justify-content-end gap-2">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={close}
                        >
                            Close
                        </button>

                        <button
                            type="submit"
                            className="btn btn-success"
                        >
                            Save
                        </button>
                    </div>
                </form>



            </div>
        </div>
    );
};

export default EditStatusModal;
