import { useState, useEffect } from "react";

import { initialPatients } from "../data/mockdata";
import Column from "../components/Column";
import PatientCard from "../components/PatientCard";
import { schema, type Inputs, type IPatient } from "../types/patient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import AddPatientModel from "../components/AddPatientModal";
import DeletePatientModal from "../components/DeletePatientModal";
import EditStatusModal from "../components/EditStatusModal";

export default function Pateints() {
  const [patients, setPatients] = useState<IPatient[]>(() => {
    const stored = localStorage.getItem("patients");
    return stored ? JSON.parse(stored) : initialPatients;
  });


  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [selectedPatient, setSelectedPatient] = useState<IPatient | null>(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<Inputs>({
      resolver: zodResolver(schema),
      mode: "onChange",
    });





  const submitHandler = (data: Inputs) => {
    const newPatient: IPatient = { id: Date.now(), ...data };
    setPatients(prev => [...prev, newPatient]);
    toast.success("Patient added successfully ✅");
    reset();
    setShow(false);
  };
  const handleEditSubmit = (id: number, newStatus: IPatient['status']) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: newStatus } : p
      )
    );

    toast.success("Patient status updated ✅");
    closeEditHandler();
  };

  const deleteConfirmHandler = (id: number) => {
    setSelectedPatient(patients.find(p => p.id === id)!);
    setShowDelete(true);
  };
  const editHandler = (id: number) => {
    setSelectedPatient(patients.find(p => p.id === id)!);
    setShowEdit(true);
  };

  const deleteHandler = (id: number) => {
    setPatients(prev => prev.filter(p => p.id !== id));
    toast.success("Patient deleted successfully ✅");
    setShowDelete(false);
  };

  const closeHandler = () => setShow(false);
  const closeDeleteHandler = () => setShowDelete(false);
  const closeEditHandler = () => setShowEdit(false);


  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Dentist Clinic Dashboard (Drag & Drop)</h2>

      <div className="d-flex justify-content-center align-items-center w-full">
        <button
          className="btn btn-success my-5 animate__animated animate__fadeIn"
          onClick={() => setShow(true)}
        >
          <i className="bi bi-plus-circle text-white me-2"></i>Add Patient
        </button>
      </div>

      <div className="row">
        <Column id="waiting" title="Waiting" color="text-warning">
          {patients
            .filter(p => p.status === "waiting")
            .map(patient => (
              <PatientCard
                editHandler={editHandler}
                key={patient.id}
                patient={patient}
                deleteConfirmHandler={deleteConfirmHandler}
              />
            ))}
        </Column>

        <Column id="appointment" title="Appointments" color="text-primary">
          {patients
            .filter(p => p.status === "appointment")
            .map(patient => (
              <PatientCard
                editHandler={editHandler}
                key={patient.id}
                patient={patient}
                deleteConfirmHandler={deleteConfirmHandler}
              />
            ))}
        </Column>

        <Column id="treatment" title="In Treatment" color="text-success">
          {patients
            .filter(p => p.status === "treatment")
            .map(patient => (
              <PatientCard
                key={patient.id}
                patient={patient}
                editHandler={editHandler}
                deleteConfirmHandler={deleteConfirmHandler}
              />
            ))}
        </Column>
      </div>


      {show && (
        <AddPatientModel
          showHandler={closeHandler}
          submitHandler={handleSubmit(submitHandler)}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
        />
      )}
      {showEdit && selectedPatient && (
        <EditStatusModal
          handleEditSubmit={handleEditSubmit}
          patient={selectedPatient}
          close={closeEditHandler}
        />
      )}
      {showDelete && selectedPatient && (
        <DeletePatientModal
          closeDeleteHandler={closeDeleteHandler}
          deleteHandler={() => deleteHandler(selectedPatient.id)}
          name={selectedPatient.name}
        />
      )}
    </div>
  );
}
