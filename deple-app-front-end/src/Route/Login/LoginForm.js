import React from 'react';
import styles from '../../Stylesheets/LoginForm.module.css';
import PublicInput from '../../Components/PublicInput';

function LoginForm() {
    return (
        <div className={styles.login_form_root}>
            <div className={styles.login_form_header}>
                <span style={{marginLeft: '20px'}}>LOGIN</span>
            </div>
            <div className={styles.login_form_body}>
                <div className={styles.login_form_input_container}>
                    <PublicInput Type="id" />
                    <PublicInput Type="password" />
                    <div className={styles.login_form_btn_container}>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;