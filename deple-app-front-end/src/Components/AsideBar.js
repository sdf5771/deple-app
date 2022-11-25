import React, {useEffect} from 'react';
import propTypes from 'prop-types';
import styles from '../Stylesheets/AsideBar.module.css'
import { useCookies } from 'react-cookie';
import {useHref} from "react-router-dom";
import SetUserInformation from './SetUserInformation'
import PublicMessageBox from "./PublicMessageBox";

function AsideBar() {
    // useEffect(()=>{
    //
    // },[])

    return (
        <div id="AsideBarRoot" className={styles.asideBarRoot}>
            {/*<SetUserInformation />*/}
        </div>
    );
}

export default AsideBar;