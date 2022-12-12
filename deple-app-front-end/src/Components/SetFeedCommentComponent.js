import React, {useState, useEffect, useRef} from 'react';
import propTypes from 'prop-types';
import styles from '../Stylesheets/SetFeedCommentComponent.module.css'
import feedStyles from '../Stylesheets/SetFeedComponent.module.css'
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import PublicMessageBox from "./PublicMessageBox";
import FeedCommentContextMenu from './FeedCommentContextMenu';
import feedCommentModifyBtnClickReducer from "../reducers/feedCommentModifyBtnClickReducer";

function SetFeedCommentComponent({feed_id, userName , feed_comment_id, commentContents}){
    const [userCookies, setUserCookie] = useCookies(['userId']);
    const [authCookies, setAuthCookie] = useCookies(['auth']);
    const [feedCommentVal, setFeedCommentVal] = useState('');
    const [feedMenuBtnOnClick, setFeedMenuBtnOnClick] = useState(false);
    const feedCommentModifyBtnClick = useSelector(state => state.feedCommentModifyBtnClickReducer);
    const feedCommentInputRef = useRef();

    useEffect(() => {
        setFeedCommentVal(commentContents);
    }, [])

    //Feed Comment Modify Click Effect
    useEffect(() => {
        if(feedCommentModifyBtnClick.isClick){
            if(feed_comment_id === feedCommentModifyBtnClick.commentData.feed_comment_id){
                feedCommentInputRef.current.readOnly = false;
                feedCommentInputRef.current.focus();
            }
        }
    }, [feedCommentModifyBtnClick.isClick])

    const feedCommentModifyFetch = (event) => {
        let updateData = {
            feed_id: feedCommentModifyBtnClick.commentData.feed_id,
            user_id: feedCommentModifyBtnClick.commentData.user_id,
            feed_comment: event.target.value,
            feed_comment_id: feedCommentModifyBtnClick.commentData.feed_comment_id,
        }

        console.log('updateData ', updateData);

        fetch(`/update_comment`, { //${"http://localhost:13000"}
            method: 'POST', // 또는 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        }) // throw new Error('Network response was not ok.');
            .then((response) => {
                console.log('response ', response);
                if(response.ok){
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then((data) => {
                console.log('성공: update comment ', data);
                if(data.message === '200 ok'){

                    return
                } else {
                    setFeedCommentVal(commentContents);
                    PublicMessageBox('댓글 수정에 실패했어요. 관리자에게 문의해주세요.');
                }
            })
            .catch((error) => {
                console.error('실패:', error);

                PublicMessageBox('댓글 수정에 실패했어요. 관리자에게 문의해주세요.');
                setTimeout(function(){
                }, 1500)
            });
    }

    const feedCommentInputKeyDownHandler = async (event) => {
        if(event.key === 'Enter'){
            await feedCommentModifyFetch(event);

            PublicMessageBox('댓글이 수정되었습니다.');

            event.target.blur();
        }
    }

    const feedCommentInputOnChangeHandler = (event) => {
        setFeedCommentVal(event.target.value);
    }

    const feedCommentInputFocusOutHandler = (event) => {
        event.target.readOnly = true;
    }

    const feedMenuBtnOnClickHandler = (event) => {
        setFeedMenuBtnOnClick(!feedMenuBtnOnClick);
    }

    return(
        <div id="comment_root" className={styles.feed_comment_root}>
            <div className={styles.feed_comment_user_icon_container}>
                <div className={feedStyles.feed_component_user_icon}></div>
            </div>
            <div className={styles.feed_comment_content_container}>
                <div className={styles.feed_comment_user_name_container}>
                    <span>{userName}</span>
                </div>
                <div className={styles.feed_comment_input_container}>
                    <input id="feedCommentInput" ref={feedCommentInputRef} readOnly="true" value={feedCommentVal}
                           onBlur={feedCommentInputFocusOutHandler}
                           onKeyDown={feedCommentInputKeyDownHandler}
                           onChange={feedCommentInputOnChangeHandler}
                    />
                </div>
            </div>
            {userCookies.userId === userName ?
                <div onClick={feedMenuBtnOnClickHandler} className={styles.feed_comment_menu_btn}>
                    <div className={styles.comment_img}></div>
                    {feedMenuBtnOnClick ? <FeedCommentContextMenu feed_id={feed_id} user_id={userName} feed_comment_id={feed_comment_id} /> : null}
                </div>
                : null}
        </div>
    )
}

export {SetFeedCommentComponent};
