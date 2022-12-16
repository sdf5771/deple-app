import React from 'react';
import Feed from './Feed'
import TopBar from "../../Components/TopBar";
import styles from "../../Stylesheets/MainApp.module.css";
import MenuBar from "../../Components/MenuBar";
import LoginCheck from "../../Components/LoginCheck";
import { useSelector, useDispatch } from 'react-redux';
import {CreateFeedModal} from '../../Components/CreateFeed';
import AsideBar from "../../Components/AsideBar";
import PublicOkCancelModal from "../../Components/PublicOkCancelModal";

function MainApp() {
    const createFeedModalClick = useSelector(state => state.createFeedModalClickReducer);
    const feedCommentDeleteBtnClick = useSelector(state => state.feedCommentDeleteBtnClickReducer);
    let loginToken = LoginCheck();
    if(loginToken){
        if(loginToken.auth === 'yes'){

            return (
                <div className={styles.app_root}>
                    <TopBar />
                    <div className={styles.app_body}>
                        <MenuBar />
                        <Feed />
                        <AsideBar />
                    </div>
                    {createFeedModalClick.isClick ? <CreateFeedModal /> : null}
                    {feedCommentDeleteBtnClick.isClick ? <PublicOkCancelModal textContent="해당 댓글을 삭제하시겠습니까?" /> : null}
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
