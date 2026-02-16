

interface ModelProps {
    closeDeleteHandler: () => void;
    deleteHandler: () => void;
    name: string;
}
const DeletePatientModal = ({
    closeDeleteHandler,
    name,
    deleteHandler,
}: ModelProps) => {
    return (
        <div className="modal-backdrop d-flex justify-content-center align-items-center animate__animated animate__fadeIn ">
            <div className="card shadow-lg p-3 rounded-4" style={{ width: "400px" }}>
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="m-0">Delete Patient</h5>
                    <button className="btn-close" onClick={closeDeleteHandler}></button>
                </div>
                <div className="card-body">

                    <p>Are you sure you want to delete {name} ?</p>
                    <div className="d-flex justify-content-end gap-2">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={closeDeleteHandler}
                        >
                            Close
                        </button>

                        <button
                            onClick={deleteHandler}
                            type="submit"
                            className="btn btn-danger"
                        >
                            Delete
                        </button>
                    </div>
                </div>



            </div>
        </div>
    );
};

export default DeletePatientModal;
