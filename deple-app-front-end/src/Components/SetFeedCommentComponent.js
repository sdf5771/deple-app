import React, {useState} from 'react';
import propTypes from 'prop-types';
import styles from '../Stylesheets/SetFeedCommentComponent.module.css'
import feedStyles from '../Stylesheets/SetFeedComponent.module.css'
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import PublicMessageBox from "./PublicMessageBox";

function SetFeedCommentComponent({feeduuid, userName , commentContents}){
    const [userCookies, setUserCookie] = useCookies(['userId']);
    const [authCookies, setAuthCookie] = useCookies(['auth']);
    const [isAdmin, setIsAdmin] = useState(false);
    [] = React.useState('');

    const commentRootOnClickHandler = (event) => {
        if(authCookies){
            //자신이 작성한 - 혹은 해당 댓글을 제어할 권한이 있는 경우
            setIsAdmin(true);
        }

        if(isAdmin){

        } else {

        }
    }

    console.log('userName ', userName)

    return(
        <div id="comment_root" className={styles.feed_comment_root} onClick={commentRootOnClickHandler}>
            <div className={styles.feed_comment_user_icon_container}>
                <div className={feedStyles.feed_component_user_icon}></div>
            </div>
            <div>
                <div>
                    <span>{userName}</span>
                </div>
                <div>
                    <input readOnly="true" value={commentContents}/>
                </div>
            </div>
        </div>
    )
}

export {SetFeedCommentComponent};
