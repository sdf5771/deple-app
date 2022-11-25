import React from 'react';
import propTypes from 'prop-types';
import styles from '../Stylesheets/CreateFeed.module.css'
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import PublicMessageBox from "./PublicMessageBox";

function CreateFeedModal(){
    const [cookies, setCookie, removeCookie] = useCookies(['userId']);
    const createFeedModalDispatch = useDispatch();
    const createFeedModalResponseDispatch = useDispatch();
    const [textareaVal, useTextAreaVal] = React.useState('');
    const [uploadContentsClick, setUploadContentsClick] = React.useState(false);
    function TextareaOnChangeHandler(event){
        useTextAreaVal(event.target.value);
    }
    function feedModalBackGroundClickHandler(event){
        createFeedModalDispatch({ type : 'CreateFeedModalBackground click'});
    }

    function createFeedAjax(){
        console.log('textareaVal ', textareaVal);
        let data = {
            create_user: cookies.userId,
            feed_content: textareaVal,
            file: [],
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
                    createFeedModalResponseDispatch({type: "server response", payload: data.feed});
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

    function createFeedBtnClickHandler(event){
        if(textareaVal.length === 0){
            PublicMessageBox('게시할 피드의 내용을 입력해주세요');
        } else {
            createFeedAjax();
        }
    }

    const uploadContentsClickHandler = (event) => {
        setUploadContentsClick(true);
    }

    return (
        <div id="CreateFeedModal" className={styles.create_feed_modal_root}>
            <div className={styles.modal_background} onClick={feedModalBackGroundClickHandler}></div>
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
                        <div>
                            <input id='imageInput' className={styles.imgInput} accept="image/png, image/jpeg" type='file'/>
                        </div>
                        <textarea onChange={TextareaOnChangeHandler} placeholder="어떤 게시글을 작성할까요?" value={textareaVal}></textarea>
                        <div className={styles.create_feed_modal_another_container}>
                            <div className={styles.another_container_item}><span>🌞 나는 지금 </span></div>
                            <div onClick={uploadContentsClickHandler} className={styles.another_container_item}><span>🏞 사진 / 영상</span></div>
                            <div className={styles.another_container_item}><span>😃 오늘의 기분</span></div>
                        </div>
                    </div>
                    <div className={styles.create_feed_modal_btn_container}>
                        <button id="createFeedBtn" onClick={createFeedBtnClickHandler}>게시하기</button>
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
                <input id="CreateFeedInput" onClick={CreateFeedInputOnClickHandler} className={styles.create_feed_input} placeholder="당신의 생각을 공유해 보세요." readOnly={true}/>
            </div>

            <div className={styles.create_feed_new_line}></div>

            <div className={styles.create_feed_body}>
                <div><span>🌞 나는 지금 </span></div>
                <div><span>🏞 사진 / 영상</span></div>
                <div><span>😃 오늘의 기분</span></div>
            </div>
        </div>
    );
}

export {CreateFeed, CreateFeedModal};