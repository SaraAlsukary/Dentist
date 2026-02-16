import type { IPatient } from "../types/patient";

interface PatientCardProps {
    patient: IPatient;
    deleteConfirmHandler?: (id: number) => void;
    editHandler: (id:number) => void;
}

const PatientCard = ({ patient, deleteConfirmHandler, editHandler }: PatientCardProps) => {

    const badgeStyle = (bookingType: string) => {
        if (bookingType === "emergency") return <span className="badge text-bg-danger">{bookingType}</span>;
        if (bookingType === "scheduled") return <span className="badge text-bg-primary">{bookingType}</span>;
        return <span className="badge text-bg-success">{bookingType}</span>;
    };

    const personStyle = (status: string) => {
        if (status === "appointment") return "text-primary";
        if (status === "waiting") return "text-warning";
        return "text-success";
    };

    return (
        <div className="card mb-3 shadow-sm patient-card animate__animated animate__fadeIn">
            {patient.status === "appointment" && patient.bookingType === "scheduled" && deleteConfirmHandler && (
                <i
                    className="bi bi-x-circle text-danger close"
                    style={{ fontSize: "2rem", cursor: "pointer" }}
                    onClick={() => deleteConfirmHandler(patient.id)}
                ></i>
            )}

            <div className="card-body">
                <h5 className="card-title">{patient.name}</h5>
                <div className="d-flex justify-content-between align-items-start">
                    <div className="card-text">
                        <i className="bi bi-droplet-fill text-danger"></i> <span className="mx-2">{patient.blood}</span> <br />
                        <i className="bi bi-telephone-fill text-secondary"></i> <span className="mx-2">{patient.phone}</span> <br />
                        <i className="bi bi-calendar-heart-fill text-success"></i> <span className="mx-2">{patient.bookingDate}</span> <br />
                        <i className="bi bi-tag me-2 text-warning"></i> {badgeStyle(patient.bookingType)}
                    </div>

                    <div className="text-center">
                        <i className={`bi bi-person-circle ${personStyle(patient.status)}`} style={{ fontSize: "3.5rem" }}></i>
                        <br />
                        <i
                            className="bi bi-pencil-square text-primary mt-2"
                            style={{ fontSize: "1.5rem", cursor: "pointer" }}
                            onClick={() => editHandler(patient.id)}
                        ></i>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default PatientCard;
