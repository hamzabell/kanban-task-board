import Button from "../button";

function DeleteConfirmation({ deleteFor, onClose, handler }) {
    console.log(deleteFor)
    return ( 
        <div className="delete-confirmation">
            <h1 className="delete-confirmation__title">
                Delete this {deleteFor}?
            </h1>

            <p className="delete-confirmation__message">
                Are you sure you want to delete  ‘{deleteFor}’ ? This action cannot be reversed.
            </p>

            <div className="delete-confirmation__actions">
                <Button destructive otherClasses="delete-confirmation__actions-button" onClick={handler}>
                    Delete
                </Button>

                <Button onClick={() => onClose()} secondary otherClasses="delete-confirmation__actions-button">
                    Cancel
                </Button>
            </div>
        </div>
    );
}

export default DeleteConfirmation;