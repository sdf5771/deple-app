import React from 'react';
import propTypes from 'prop-types';
import styles from '../Stylesheets/CreateFeed.module.css'
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import PublicMessageBox from "./PublicMessageBox";

function CreateFeedModal(){
    const [cookies, setCookie, removeCookie] = useCookies(['userId']);
    const createFeedModalDispatch = useDispatch();
    const [textareaVal, useTextAreaVal] = React.useState('');
    function TextareaOnChangeHandler(event){
        useTextAreaVal(event.target.value);
    }
    function feedModalbackGroundClickHandler(event){
        createFeedModalDispatch({ type : 'CreateFeedModalBackground click'});
    }

    function createFeedAjax(){
        console.log('textareaVal ', textareaVal);
        let data = {
            create_user: cookies.userId,
            feed_content: textareaVal
        };

        console.log('data ', data);
        fetch(`/create_feed`, { //${"http://localhost:13000"}
            method: 'POST', // 또는 'PUT'
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data),
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
                if(data.message === '피드 생성완료'){
                    PublicMessageBox('피드가 게시되었습니다.');

                    createFeedModalDispatch({ type : 'CreateFeedModalBackground click'});
                }
            })
            .catch((error) => {
                console.error('실패:', error);

                PublicMessageBox('피드 생성에 실패했어요. 관리자에게 문의해주세요.');
                setTimeout(function(){
                }, 1500)
            });
    }

    function createFeedbtnClickHandler(event){
        if(textareaVal.length === 0){
            PublicMessageBox('게시할 피드의 내용을 입력해주세요');
        } else {
            createFeedAjax();
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
                            <span>{cookies.userId}</span>
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