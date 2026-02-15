import { useState } from "react";
import {
    DndContext,
    closestCenter,
    type DragEndEvent,

} from "@dnd-kit/core";
import { initialPatients } from "../data/mockdata";
import Column from "../components/Column";
import { PatientCard } from "../components/PatientCard";
import { schema, type Inputs, type IPatient } from "../types/patient";
import Model from "../components/Model";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from 'react-toastify'

import { useEffect } from "react";
import ConfirmModel from "../components/ConfirmModel";

export default function Pateints() {
    const [patients, setPatients] = useState<IPatient[]>(() => {
        const stored = localStorage.getItem("patients");
        return stored ? JSON.parse(stored) : initialPatients;
    });
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<null | IPatient>(null)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },

    } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange"
    });
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const patientId = active.id as number;
        const newStatus = over.id as IPatient["status"];

        setPatients((prev) =>
            prev.map((p) =>
                p.id === patientId ? { ...p, status: newStatus } : p
            )
        );
    };

    const closeHandler = () => {
        setShow(false);
    }

    const closeDeleteHandler = () => {
        setShowDelete(false);
    }

    const submitHandler = (data: Inputs) => {

        const newPatient: IPatient = {
            id: Date.now(),
            blood: data.blood,
            bookingType: data.bookingType,
            bookingDate: data.bookingDate,
            name: data.name,
            phone: data.phone,
            status: data.status,
        };

        setPatients((prev) => [...prev, newPatient]);

        toast.success("Patient added successfully ✅");

        reset();
        setShow(false);
    };
    const deleteConfirmHandler = (id: number) => {
        setSelectedPatient(patients.find(p => p.id === id)!);
        setShowDelete(true);
    }
    const deleteHandler = (id: number) => {
        setPatients((prev) => prev.filter(p => p.id !== id));
        toast.success("Patient deleted successfully ✅");
    }

    useEffect(() => {
        localStorage.setItem("patients", JSON.stringify(patients));
    }, [patients]);

    return (
        <div className="container mt-5 ">
            <h2 className="text-center mb-4">Dentist Clinic Dashboard (Drag & Drop)</h2>
            <div className="d-flex justify-content-center align-items-center w-full">
                <button className="btn btn-success my-5 " onClick={() => setShow(true)}><i className="bi bi-plus-circle text-white me-2"></i>Add Patient</button>
            </div>
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <div className="row">
                    <Column id="waiting" title="Waiting" color="text-warning">
                        {patients.filter((p) => p.status === "waiting")
                            .map((patient) => (
                                <PatientCard key={patient.id} patient={patient} />
                            ))}
                    </Column>

                    <Column id="appointment" title="Appointments" color="text-primary">
                        {patients.filter((p) => p.status === "appointment")
                            .map((patient) => (
                                <PatientCard key={patient.id} patient={patient} deleteConfirmHandler={deleteConfirmHandler} />
                            ))}
                    </Column>

                    <Column id="treatment" title="In Treatment" color="text-success">
                        {patients.filter((p) => p.status === "treatment")
                            .map((patient) => (
                                <PatientCard key={patient.id} patient={patient} />
                            ))}
                    </Column>
                </div>
            </DndContext>
            {show && <Model
                showHandler={closeHandler}
                submitHandler={handleSubmit(submitHandler)}
                register={register}
                errors={errors}
                isSubmitting={isSubmitting}
            />
            }
            {showDelete && <ConfirmModel
                closeDeleteHandler={closeDeleteHandler}
                deleteHandler={() => deleteHandler?.(selectedPatient?.id!)}
                name={selectedPatient?.name!}
            />
            }
        </div>
    );
}



