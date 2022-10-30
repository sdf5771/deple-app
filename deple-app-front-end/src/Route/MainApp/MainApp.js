import React from 'react';
import Feed from './Feed'
import TopBar from "../../Components/TopBar";
import styles from "../../Stylesheets/MainApp.module.css";
import MenuBar from "../../Components/MenuBar";
import LoginCheck from "../../Components/LoginCheck";
import { useSelector, useDispatch } from 'react-redux';
import {CreateFeedModal} from '../../Components/CreateFeed';

function MainApp() {
    const createFeedModalClick = useSelector(state => state.createFeedModalClickReducer);
    let loginToken = LoginCheck();
    if(loginToken){
        if(loginToken.auth === 'yes'){

            return (
                <div className={styles.app_root}>
                    <TopBar />
                    <div className={styles.app_body}>
                        <MenuBar />
                        <Feed />
                    </div>
                    {createFeedModalClick.isClick ? <CreateFeedModal /> : null}
                </div>
            );
        } else {
            window.location.href = '/login';
        }
    }

    // return (
    //     <div className={styles.app_root}>
    //         <TopBar />
    //         <div className={styles.app_body}>
    //             <MenuBar />
    //             <Feed />
    //         </div>
    //     </div>
    // );
}

export default MainApp;