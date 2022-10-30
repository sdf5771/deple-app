import React from 'react';
import propTypes from 'prop-types';
import styles from '../Stylesheets/CreateFeed.module.css'
import { useSelector, useDispatch } from 'react-redux';
import PublicMessageBox from "./PublicMessageBox";

function CreateFeedModal(){
    const createFeedModalDispatch = useDispatch();
    const [textareaVal, useTextAreaVal] = React.useState('');
    function TextareaOnChangeHandler(event){
        useTextAreaVal(event.target.value);
    }
    function feedModalbackGroundClickHandler(event){
        createFeedModalDispatch({ type : 'CreateFeedModalBackground click'});
    }
    function createFeedbtnClickHandler(event){
        if(textareaVal.length === 0){
            PublicMessageBox('게시할 피드의 내용을 입력해주세요');
        } else {
            PublicMessageBox('피드가 게시되었습니다.');
        }
    }
    return (
        <div id="CreateFeedModal" className={styles.create_feed_modal_root}>
            <div className={styles.modal_background} onClick={feedModalbackGroundClickHandler}></div>
            <div className={styles.create_feed_modal}>
                <div className={styles.create_feed_modal_header}>
                    <div className={styles.create_feed_modal_title}>
                        <span>게시물 작성하기</span>
                    </div>
                </div>
                <div className={styles.create_feed_modal_body}>
                    <div className={styles.create_feed_modal_userinfo_container}>
                        <div className={styles.create_feed_modal_user_icon_container}>

                        </div>
                        <div className={styles.create_feed_modal_user_name}>
                            <span>USERNAME</span>
                        </div>
                    </div>
                    <div className={styles.create_feed_modal_content_container}>
                        <textarea onChange={TextareaOnChangeHandler} placeholder="어떤 게시글을 작성할까요?" value={textareaVal}></textarea>
                        <div className={styles.create_feed_modal_another_container}>

                        </div>
                    </div>
                    <div className={styles.create_feed_modal_btn_container}>
                        <button id="createFeedBtn" onClick={createFeedbtnClickHandler}>게시하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CreateFeed() {
    const createFeedModalDispatch = useDispatch();
    const CreateFeedInputOnClickHandler = (event) => {
        createFeedModalDispatch({ type : 'CreateFeedInput click'});
    }

    return (
        <div id="CreateFeedRoot" className={styles.create_feed_root}>
            <div className={styles.create_feed_header}>
                <input id="CreateFeedInput" onClick={CreateFeedInputOnClickHandler} className={styles.create_feed_input} placeholder="What's on your mind" readOnly={true}/>
            </div>

            <div className={styles.create_feed_new_line}></div>

            <div className={styles.create_feed_body}>
                <div><span>EMPTY</span></div>
                <div><span>EMPTY</span></div>
                <div><span>EMPTY</span></div>
            </div>
        </div>
    );
}

export {CreateFeed, CreateFeedModal};