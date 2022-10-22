import React from 'react';
import styles from '../../Stylesheets/LoginForm.module.css';
import PublicInput from '../../Components/PublicInput';

function LoginForm() {
    function loginBtnOnClickHandler(event){

    }

    return (
        <div className={styles.login_form_root}>
            <div className={styles.login_form_header}>
                <span style={{marginLeft: '20px'}}>LOGIN</span>
            </div>
            <div className={styles.login_form_body}>
                <div className={styles.login_form_input_container}>
                    <PublicInput InputId='LoginIdInput' Type="id" PlaceHolder='ID' />
                    <PublicInput InputId='LoginPwInput' Type="password" PlaceHolder='Password'/>
                    <div className={styles.login_form_btn_container} style={{gap: '20px', marginTop: '20px'}}>
                        <span id='JoinUsBtn'>Join Us</span>
                        <span>Forgot your password</span>
                    </div>
                    <div className={styles.login_form_btn_container}>
                        <button id='' onClick={loginBtnOnClickHandler} className={styles.login_button}>LOGIN</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;