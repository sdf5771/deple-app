import React from 'react';
import styles from '../../Stylesheets/Login.module.css';
import LoginForm from './LoginForm';

function SlideTextBox({textContentArr}){
    return (
        <div className={styles.slide_box_root}>
            {textContentArr ? textContentArr.map( (text) => {
                return <div className={styles.slide_box_content_div}><span className={styles.slide_box_content_text}>{text}</span></div>;
            }) : null}
        </div>
    );
}

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
                        <SlideTextBox textContentArr={textContentArr} />
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