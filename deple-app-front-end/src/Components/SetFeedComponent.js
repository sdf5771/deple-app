import React, {useState} from 'react';
import propTypes from 'prop-types';
import styles from '../Stylesheets/SetFeedComponent.module.css';
import publicStyles from '../Stylesheets/PublicStyle.module.css';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import PublicMessageBox from "./PublicMessageBox";
import {SetFeedCommentComponent} from "./SetFeedCommentComponent";

function SetFeedComponent({data}){
    const [commentCreateClick, setCommentCreateClick] = useState(false);
    const [feedCommentVal, setFeedCommentVal] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['userId']);
    console.log('prop ', data)

    const feedCommentCreateOnClickHandler = (event) => {
        setCommentCreateClick(!commentCreateClick);
    }

    const feedCommentCreateOnKeyDownHandler = async (event) => {
        console.log('event ', event)
        if(event.key !== 'Enter') return

        if(feedCommentVal.length === 0) {
            PublicMessageBox('게시할 댓글 내용을 입력해주세요.');
            return
        }

        let createFeedCommentData = {
            userId: cookies.userId,
            feedComment: feedCommentVal,
            feedUUID: data.uuid,
        }

        // fetch()

        //initialize feed comment input
        setFeedCommentVal('');

        console.log('create feed comment data ', createFeedCommentData)
    }

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
                <textarea
                    className={styles.feed_component_content_text}
                    onMouseOver={event => {
                        event.target.style.height = `${event.target.scrollHeight}px`
                        event.target.style.maxHeight = `${event.target.scrollHeight}px`
                    }}
                    onMouseLeave={
                    event => {
                        event.target.style.height = '40px'
                        event.target.style.maxHeight = '40px'
                    }}
                    value={data.feed_content}
                    readOnly={true}></textarea>
            </div>
            <div className={styles.feed_component_response_body}>
                <div className={styles.feed_component_response_content}><div className={styles.feed_like}></div><span>좋아요</span></div>
                <div onClick={feedCommentCreateOnClickHandler} className={styles.feed_component_response_content}><div className={styles.feed_comments}></div><span>댓글달기</span></div>
            </div>
            <div className={styles.feed_component_comments_body}>
                {data.feedCommentData ? data.feedCommentData.map( (commentData, idx) => {
                    <SetFeedCommentComponent feeduuid={data.uuid} userName={commentData.userName} commentContents={commentData.comment}/>
                }) : null}

            </div>
            {commentCreateClick ?
                <div className={publicStyles.fade_in_area}>
                    <div className={styles.feed_component_new_line}></div>
                    <div className={styles.feed_component_create_comments_container}>
                        <div className={styles.feed_component_user_icon_small}></div>
                        <div className={styles.feed_component_create_comments_input_container}>
                            <input
                                onKeyDown={feedCommentCreateOnKeyDownHandler}
                                className={styles.feed_component_create_comments_input}
                                placeholder="댓글을 입력해보세요."
                                onChange={(event) => setFeedCommentVal(event.target.value)}
                                value={feedCommentVal}
                            />
                        </div>
                    </div>
                </div>
                : null}
        </div>
    )
}

export {SetFeedComponent};
