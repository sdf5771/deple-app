import React from 'react';
import styles from '../../Stylesheets/Login.module.css';
import LoginForm from './LoginForm';

function Login() {
    let textContentArr = ['Hi Guys', 'Join Deple App', 'and Enjoy Deple with All Friends']

    return (
        <div className={styles.login_root}>
            <div className={styles.login_container}>
                <div className={styles.login_information}>
                    <div className={styles.login_information_header}>
                        <span>Welcome to Deple</span>
                    </div>
                    <div className={styles.login_information_content}>
                        {textContentArr ? textContentArr.map(text => {
                            return <span>{text}</span>
                        }) : null}
                    </div>
                </div>
                <div className={styles.login_form_container}>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}

export default Login;