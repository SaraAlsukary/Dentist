import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { IPatient } from '../types/patient';

export const PatientCard = ({ patient, deleteConfirmHandler }: { patient: IPatient, deleteConfirmHandler?: (id: number) => void }) => {
    const { attributes, listeners, setNodeRef, transform } =
        useDraggable({ id: patient.id });

    const style = {
        transform: transform ? CSS.Translate.toString(transform) : undefined,
    };
    const badgeStyle = (bookingType: string) => {
        if (bookingType === 'emergency') {
            return <span className="badge text-bg-danger">{patient.bookingType}</span>
        } else if (bookingType === 'scheduled') {
            return <span className="badge text-bg-primary">{patient.bookingType}</span>;
        } else {
            return <span className="badge text-bg-success">{patient.bookingType}</span>;
        }
    };
    const personStyle = (status: string) => {
        if (status === 'appointment') {
            return "text-primary"
        } else if (status === 'waiting') {
            return "text-warning";
        } else {
            return "text-success";
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={style}

            className="card mb-3 shadow-sm "
        >
            <div className="card-body patient-card">
                <h5 className="card-title">{patient.name}</h5>
                <div className="d-flex justify-content-between">
                    <p className="card-text "
                        {...listeners}
                        {...attributes}>
                        <i className="bi bi-droplet-fill text-danger"></i> <span className='mx-2'> {patient.blood}</span> <br />
                        <i className="bi bi-telephone-fill text-secondary"></i>  <span className='mx-2'>{patient.phone}</span> <br />
                        <i className="bi bi-calendar-heart-fill  text-success"></i>  <span className='mx-2'>{patient.bookingDate}</span> <br />
                        <i className="bi bi-tag me-2 text-warning"></i> {badgeStyle(patient.bookingType)}
                    </p>
                    <div className='pl-1'>
                        <i className={`bi bi-person-circle  ${personStyle(patient?.status)}`} style={{ fontSize: "3.5rem" }}></i>
                        {patient.status !== 'waiting' && patient.bookingType === "scheduled" ?
                            <div className='d-flex align-items-end '>
                                <button className="btn btn-danger mb-4" onClick={() => deleteConfirmHandler!(patient.id!)}>Delete</button>
                            </div> : ""}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PatientCard;
