import styles from "./CardItem.module.css";

const CardItem = (props) => {
  return (
    <div className="card-container">
      {props.children}
    </div>
  )
}

export default CardItem;