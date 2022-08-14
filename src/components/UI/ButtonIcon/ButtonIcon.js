const ButtonIcon = (props) => {
  return (
    <span className={`${props.className ? props.className : ''} material-icons-round`} onClick={props.onClick}>{props.icon}</span>
  );
}

export default ButtonIcon;