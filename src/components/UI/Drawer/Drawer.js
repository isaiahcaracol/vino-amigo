import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Drawer as RSuiteDrawer, Sidenav, Nav, Dropdown } from 'rsuite';
import DashboardIcon from '@rsuite/icons/Dashboard';
import TagIcon from '@rsuite/icons/Tag';
import DragableIcon from '@rsuite/icons/Dragable';
import UserBadgeIcon from '@rsuite/icons/UserBadge';
import ExitIcon from '@rsuite/icons/Exit';

import AuthContext from "../../../store/AuthContext";

const Drawer = (props) => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const logoutHandler = () => {
        authCtx.logout();
        navigate('/', {replace: true});
    }

    return (
        <RSuiteDrawer full open={props.drawerIsOpen} onClose={() => props.setDrawerIsOpen(false)} placement={'left'}>
            <RSuiteDrawer.Header>
                <RSuiteDrawer.Title>Vino Amigo</RSuiteDrawer.Title>
            </RSuiteDrawer.Header>
            <Sidenav activeKey="1">
                <Sidenav.Body>
                    <Nav>
                        <Nav.Item eventKey="1" icon={<DashboardIcon/>} as={Link} to="/dashboard">
                            Dashboard
                        </Nav.Item>
                        <Dropdown eventKey="3" title="Products" icon={<TagIcon/>}>
                            <Dropdown.Item eventKey="3-1" as={Link} to="/products/all">All Products</Dropdown.Item>
                            <Dropdown.Item eventKey="3-2" as={Link} to="/products/add">Add New</Dropdown.Item>
                        </Dropdown>
                        <Nav.Item eventKey="2" icon={<DragableIcon/>} as={Link} to="/pos">
                            POS
                        </Nav.Item>
                        <Nav.Item eventKey="2" icon={<UserBadgeIcon/>} as={Link} to="/users">
                            Users
                        </Nav.Item>
                        <Nav.Item eventKey="2" icon={<ExitIcon/>} onSelect={logoutHandler}>
                            Logout
                        </Nav.Item>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
            <div style={{
                position: 'absolute',
                padding: 20,
                bottom: 0,
            }}>
                <p>Logged in as <b>@{authCtx.details.username}</b></p>
            </div>
        </RSuiteDrawer>
    )
}

export default Drawer;