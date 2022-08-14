import styles from './SmallButton.module.css';

const SmallButton = (props) => {
  return (
    <div onClick={props.onClick}>
      <span className={`${styles['button']} ${props.className}`}>
        {props.label ? props.label : 'Button'}
      </span>
    </div>
  );
}

export default SmallButton;