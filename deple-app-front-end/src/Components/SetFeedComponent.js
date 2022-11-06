import React from 'react';
import propTypes from 'prop-types';
import styles from '../Stylesheets/SetFeedComponent.module.css'
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import PublicMessageBox from "./PublicMessageBox";

function SetFeedComponent({data}){
    console.log('prop ', data)

    return(
        <div className={styles.feed_component_root}>
            <div className={styles.feed_component_header}>
                <div className={styles.feed_component_user_icon}></div>
                <div className={styles.feed_component_user_profile}>
                    <span className={styles.user_name}>{data.create_user}</span>
                    <span className={styles.create_date}>{data._create ? data._create : '생성일 : 0000-00-00'}</span>
                </div>
            </div>
            <div className={styles.feed_component_body}>
                <span className={styles.feed_component_content_text}>{data.feed_content}</span>
            </div>
            <div className={styles.feed_component_response_body}>
                <div className={styles.feed_component_response_content}><span>좋아요</span></div>
                <div className={styles.feed_component_response_content}><span>댓글달기</span></div>
            </div>
        </div>
    )
}

export {SetFeedComponent};