import classes from "./Modal.module.css";

const Modal: React.FC<{
  onCancel: () => void;
  onConfirm: () => void;
}> = (props) => {
  function cancelHandler() {
    props.onCancel();
  }

  function confirmHandler() {
    props.onConfirm();
  }

  return (
    <div className={classes.modal}>
      <p>Are you sure?</p>
      <button className={classes.btnalt} onClick={cancelHandler}>
        Cancel
      </button>
      <button className={classes.btn} onClick={confirmHandler}>
        Confirm
      </button>
    </div>
  );
};

export default Modal;
