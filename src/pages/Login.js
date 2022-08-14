import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import styles from "./Login.module.css";
import Layout from "../components/UI/Layout/Layout";

import AuthContext from '../store/AuthContext';

const Login = () => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (authCtx.isLoggedIn) {
            navigate('../dashboard', {replace: false});
        }
    }, [authCtx, navigate]);

    return (
        <Layout title={'Login'} disableHeader>
            <div className={styles['logo-badge']}>
                <img src="/images/vino-amigo-logo.png" alt="Vino Amigo"/>
            </div>
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    authCtx.login(values.email, values.password);
                    setSubmitting(false);
                }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <label htmlFor="email">Username</label>
                            <Field id="email" type="text" name="email" className="rounded" />
                            <ErrorMessage name="email" component="span" className='form-error' />

                            <label htmlFor="password">Password</label>
                            <Field id="password" type="password" name="password" className="rounded" />
                            <ErrorMessage name="password" component="span" className='form-error' />

                            <button type="submit" className={`primary ${styles['btn-primary']}`} disabled={isSubmitting}>
                                Submit
                            </button>
                        </Form>
                    )}
            </Formik>
        </Layout>
    )
}

export default Login;