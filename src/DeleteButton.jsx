// DeleteButton.js
const DeleteButton = ({ onClick }) => {
    return (
        <button className="delete-button" onClick={onClick}>
            x
        </button>
    );
};

export default DeleteButton;
