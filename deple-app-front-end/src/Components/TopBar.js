import React, {useEffect} from 'react';
import propTypes from 'prop-types';
import styles from '../Stylesheets/TopBar.module.css'
import { useCookies } from 'react-cookie';
import {useHref} from "react-router-dom";
import PublicMessageBox from "./PublicMessageBox";

function TopBarElement({}){
    const [elementVal, setElementVal] = React.useState();
    return (
        <div>
            <div></div>
            <div>
                <span></span>
            </div>
        </div>
    );
}

function TopBarLogOutElement(){
    const [cookie, setCookie , removeCookie] = useCookies([]);
    const onClick = (event) => {
        removeCookie('userId')
        removeCookie('auth')

        PublicMessageBox('로그아웃 되었습니다.');

        setTimeout(()=>{
            window.location.href = '/login'
        },250)
    }

    return (
        <div onClick={onClick} className={styles.top_Bar_logout_element}>
            <div className={styles.top_Bar_logout_img}></div>
            <div className={styles.top_Bar_logout_title_div}>
                <span>로그아웃</span>
            </div>
        </div>
    );
}

function TopBar() {
    return (
        <div id="TopBarRoot" className={styles.top_bar_root}>
            <div className={styles.top_bar_left_container}>
                <span className={styles.title_span}>DEPLE</span>
            </div>
            <div className={styles.top_bar_right_container}>
                <TopBarLogOutElement />
            </div>
        </div>
    );
}

export default TopBar;