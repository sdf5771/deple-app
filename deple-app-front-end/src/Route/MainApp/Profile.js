import React from 'react'
import TopBar from "../../Components/TopBar";
import User from './User'
import styles from "../../Stylesheets/MainApp.module.css";
import MenuBar from "../../Components/MenuBar";
import LoginCheck from '../../Components/LoginCheck';

function Profile() {
    let loginToken = LoginCheck();

    if(loginToken){
        if(loginToken.auth === 'yes'){
            return (
                <div className={styles.app_root}>
                    <TopBar />
                    <div className={styles.app_body}>
                        <MenuBar />
                        <User />
                    </div>
                </div>
            );
        } else {
            window.location.href = '/login';
        }
    }
}

export default Profile;