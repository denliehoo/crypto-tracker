import classes from "./Backdrop.module.css";

const Backdrop: React.FC<{
  onCancel: () => void;
}> = (props) => {
  return <div className={classes.backdrop} onClick={props.onCancel} />;
};

export default Backdrop;
