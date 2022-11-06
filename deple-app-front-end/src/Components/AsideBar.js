import React, {useEffect} from 'react';
import propTypes from 'prop-types';
import styles from '../Stylesheets/AsideBar.module.css'
import { useCookies } from 'react-cookie';
import {useHref} from "react-router-dom";
import PublicMessageBox from "./PublicMessageBox";

function AsideBar() {
    return (
        <div id="AsideBarRoot" className={styles.asideBarRoot}>

        </div>
    );
}

export default AsideBar;