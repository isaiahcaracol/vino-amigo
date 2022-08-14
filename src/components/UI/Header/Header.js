import styles from './Header.module.css';

const Header = (props) => {
    return (
        <header>
            <div className={styles['btn-action']} onClick={() => {props.onButtonTap()}}>
                <span className={'material-icons-round'}>{props.isViewOnly ? 'arrow_back' : 'menu'}</span>
            </div>
            <div className="title"><h1>{props.title}</h1></div>
        </header>
    )
}

export default Header;