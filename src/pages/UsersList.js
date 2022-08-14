import { useEffect, useState } from "react";
import axios from "axios";
import { Panel, Button } from "rsuite";

import Layout from "../components/UI/Layout/Layout";
import styles from "./UsersList.module.css";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('vinoAmigoAuthToken');

  useEffect(() => {
    axios.get('http://localhost:8000/api/users/', {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        console.log(res);
        setUsers(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [token]);

  return (
    <Layout title="All Users">
      {users.map(user => (
        <Panel header={user.email} shaded>
          <p className={styles.content}>@{user.username}</p>
          <Button className={styles.button}>EDIT</Button>
        </Panel>
      ))}
    </Layout>
  )
}

export default UsersList;