import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Layout.module.css';
import Header from '../Header/Header';
import Drawer from '../Drawer/Drawer';

const Layout = (props) => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const navigate = useNavigate();

    const openDrawer = () => {
        if (!props.isViewOnly) {
            setDrawerIsOpen(true);
        } else {
            navigate(-1);
        }
    }

    return (
        <>
            <Drawer setDrawerIsOpen={setDrawerIsOpen} drawerIsOpen={drawerIsOpen}/>

            {!props.disableHeader && <Header title={props.title} onButtonTap={openDrawer} isViewOnly={props.isViewOnly} />}
            
            <div className={styles['container']}>
                {props.children}
            </div>
        </>
    )
}

export default Layout;