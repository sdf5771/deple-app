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
    const [feedCommentData, setFeedCommentData] = useState([]);

    console.log('prop ', data)

    const feedCommentCreateOnClickHandler = async (event) => {
        setCommentCreateClick(!commentCreateClick);

        if(!commentCreateClick){
            await getFeedCommentData();
        }
    }

    function getFeedCommentData(){
        let feedCommentReqData = {
            feed_id: data.feed_id,
        }

        fetch(`/comment_select`, { //${"http://localhost:13000"}
            method: 'POST', // 또는 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedCommentReqData),
        }) // throw new Error('Network response was not ok.');
            .then((response) => {
                console.log('response ', response);
                if(response.ok){
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then((data) => {
                console.log('성공:', data);
                if(data.message === "200 ok"){
                    setFeedCommentData(data.comment_req);

                    return;
                }
            })
            .catch((error) => {
                console.error('실패:', error);

                PublicMessageBox('피드 데이터를 불러오는데 실패했어요. 관리자에게 문의해주세요.');
                setTimeout(function(){
                }, 1500)
            });
    }

    const feedCommentCreateOnKeyDownHandler = async (event) => {
        console.log('event ', event)
        if(event.key !== 'Enter') return

        if(feedCommentVal.length === 0) {
            PublicMessageBox('게시할 댓글 내용을 입력해주세요.');
            return
        }

        let createFeedCommentData = {
            user_id: cookies.userId,
            feed_comment: feedCommentVal,
            feed_id: data.feed_id,
        }

        console.log('createFeedCommentData ', createFeedCommentData)

        fetch(`/create_comment`, { //${"http://localhost:13000"}
            method: 'POST', // 또는 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(createFeedCommentData),
        }) // throw new Error('Network response was not ok.');
            .then((response) => {
                console.log('response ', response);
                if(response.ok){
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then((data) => {
                console.log('성공: create comment ', data);
                if(data.message === '200 ok'){
                    setFeedCommentData(data.comment_req);
                }
            })
            .catch((error) => {
                console.error('실패:', error);

                PublicMessageBox('댓글 생성에 실패했어요. 관리자에게 문의해주세요.');
                setTimeout(function(){
                }, 1500)
            });

        //initialize feed comment input
        setFeedCommentVal('');
    }

    return(
        <div className={styles.feed_component_root}>
            <div className={styles.feed_component_header}>
                <div className={styles.feed_component_user_icon}></div>
                <div className={styles.feed_component_user_profile}>
                    <span className={styles.user_name}>{data.user_id}</span>
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
                    value={data.content}
                    readOnly={true}></textarea>
            </div>
            <div className={styles.feed_component_response_body}>
                <div className={styles.feed_component_response_content}><div className={styles.feed_like}></div><span>좋아요</span></div>
                <div onClick={feedCommentCreateOnClickHandler} className={styles.feed_component_response_content}><div className={styles.feed_comments}></div><span>댓글달기</span></div>
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

                    <div className={styles.feed_component_comments_body}>
                        {feedCommentData ? feedCommentData.map( (commentData, idx) => {
                            if(commentData.feed_id === data.feed_id){
                                return <SetFeedCommentComponent feeduuid={data.feed_id} userName={commentData.user_id} commentContents={commentData.feed_comment}/>
                            }
                        }) : null}

                        {/*{data.feedCommentData ? data.feedCommentData.map( (commentData, idx) => {*/}
                        {/*    <SetFeedCommentComponent feeduuid={data.feed_id} userName={commentData.user_id} commentContents={commentData.comment}/>*/}
                        {/*}) : null}*/}

                    </div>
                </div>
                : null}
        </div>
    )
}

export {SetFeedComponent};
