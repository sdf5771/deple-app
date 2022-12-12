import React, {useState} from 'react';
import styles from '../Stylesheets/FeedCommentContextMenu.module.css';
import {useDispatch} from "react-redux";


function FeedCommentContextMenu({feed_id, user_id, feed_comment_id}){
    const commentModifyBtnClickDispatch = useDispatch();

    const commentModifyBtnClickHandler = (event) => {
        let data = {
            feed_id: feed_id,
            user_id: user_id,
            feed_comment_id: feed_comment_id,
        }
        commentModifyBtnClickDispatch({ type : 'feedCommentModifyBtn click', data});
    }

    const commentDeleteBtnClickHandler = (event) => {

    }
    return(
        <div className={styles.context_menu_root}>
            <div onClick={commentModifyBtnClickHandler}><span> 수정 </span></div>
            <div onClick={commentDeleteBtnClickHandler}><span> 삭제 </span></div>
        </div>
    );
}

export default FeedCommentContextMenu;
