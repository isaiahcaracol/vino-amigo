import React, { useState } from 'react';
import { Notification, toaster } from 'rsuite';

const AuthContext = React.createContext({
  isLoggedIn: false,
  token: '',
  logout: () => {},
  login: () => {},
  details: {
    username: '',
    email: ''
  },
  verifyAuth: () => {}
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const message = (content, header, type) => {
    return (
      <Notification style={{'width': 320, height: 'auto'}} header={header} type={type} closable>
        {content}
      </Notification>
    )
  };

  const loginHandler = async (username, password) => {
    console.log(username, password);
    try {
        const response = await fetch('http://127.0.0.1:8000/api-token-auth/', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password 
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if(!response.ok) {
            if (data.non_field_errors[0]) {
              toaster.push(message(data.non_field_errors[0], 'Error', 'error'), {placement: 'bottomCenter'});
            } else {
              throw new Error('Something went wrong.')
            }
        } else {
          setToken(data.token);
          setEmail(data.email);
          setUsername(data.username);
          setIsLoggedIn(true);
          localStorage.setItem('vinoAmigoAuthToken', data.token)
          localStorage.setItem('vinoAmigoAuthUsername', data.username)
          localStorage.setItem('vinoAmigoAuthEmail', data.email)
          toaster.push(message(`Welcome @${data.username}`, 'Successful login', 'success'), {placement: 'bottomCenter'});
        }
      } catch (error) {
        toaster.push(message(error.message, 'error'), {placement: 'bottomCenter'});
    }
  }

  const logoutHandler = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  }

  const verifyAuth = () => {
    return true;
    // if(!localStorage.getItem('vinoAmigoAuthToken') ||
    //   !localStorage.getItem('vinoAmigoAuthUsername') ||
    //   !localStorage.getItem('vinoAmigoAuthEmail')) {
    //     toaster.push(message('Please log in.', 'Account not found', 'warning'), {placement: 'bottomCenter'});
    //     return false;
    // } else {
    //     setToken(localStorage.getItem('vinoAmigoAuthToken'));
    //     setUsername(localStorage.getItem('vinoAmigoAuthUsername'));
    //     setEmail(localStorage.getItem('vinoAmigoAuthEmail'))
    //     setIsLoggedIn(true);
    //     return true;
    // }
  }

  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      logout: logoutHandler,
      login: loginHandler,
      token: token,
      details: {
        username,
        email
      },
      verifyAuth: verifyAuth,
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;