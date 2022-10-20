import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home'
import Login from '../Login/Login'
import TopBar from "../../Components/TopBar";
import styles from "../../Stylesheets/MainApp.module.css";
import MenuBar from "../../Components/MenuBar";

function MainApp() {
    return (
        <div className={styles.app_root}>
            <TopBar />
            <div className={styles.app_body}>
                <MenuBar />
                <Home />
            </div>
        </div>
    );
}

export default MainApp;