import React, {useState, useEffect, useRef} from 'react';
import styles from '../Stylesheets/PublicOkCancelModal.module.css';
import publicStyles from '../Stylesheets/PublicStyle.module.css'
import {useDispatch, useSelector} from "react-redux";
import PublicMessageBox from './PublicMessageBox';

function PublicOkCancelModal({textContent}){
    const [isOpen, setIsOpen] = useState(false);
    const modalRootRef = useRef();
    const commentDeleteBtnClickDispatch = useDispatch();
    const feedCommentDeleteState = useSelector(state => state.feedCommentDeleteBtnClickReducer)
    useEffect(() => {
        const modalRootNode = modalRootRef.current;
        modalRootNode.classList.add(styles.open);
        console.log('modalRootNode ', modalRootNode);
        setTimeout(()=>{
            setIsOpen(true);
        },350)
        // return () => {
        //     modalRootNode.classList.remove(styles.open);
        //     modalRootNode.classList.add(styles.close);
        // }
    }, [])

    const deleteCommentDataFetch = () => {
        let deleteCommentData = {
            feed_id: feedCommentDeleteState.commentData.feed_id,
            user_id: feedCommentDeleteState.commentData.user_id,
            feed_comment_id: feedCommentDeleteState.commentData.feed_comment_id,
        }

        fetch('/deleteComment',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(deleteCommentData),
        })
            .then((response) => {
                if(response.ok){
                    return response.json();
                }
                throw new Error('Network reponse was not ok.');
            })
            .then((data) => {
                console.log('[Delete Feed Comment] - 성공: ',data);
                if(data.message === '200 ok'){
                    PublicMessageBox('피드 댓글을 삭제하는데 성공했어요.');

                    //삭제 후 컴포넌트 삭제 로직

                }
            })
            .catch((error) => {
                console.error('실패:', error);
                PublicMessageBox('피드 댓글을 삭제하는데 실패했어요.');
            })
    }

    const okBtnOnClickHandler = async (event) => {
        await deleteCommentDataFetch();

        // 모달을 닫는 로직
        const modalRootNode = modalRootRef.current;

        setIsOpen(false);

        modalRootNode.classList.remove(styles.open);
        modalRootNode.classList.add(styles.close);

        setTimeout(() => {
            commentDeleteBtnClickDispatch({ type : 'feedCommentDeleteBtn click false'});
        },350)
    }

    const cancelBtnOnClickHandler = (event) => {
        const modalRootNode = modalRootRef.current;

        setIsOpen(false);

        modalRootNode.classList.remove(styles.open);
        modalRootNode.classList.add(styles.close);

        setTimeout(() => {
            commentDeleteBtnClickDispatch({ type : 'feedCommentDeleteBtn click false'});
        },350)
    }

    return (
        <div id="okCancelModal">
            <div className={styles.modal_background}></div>
            <div ref={modalRootRef} className={styles.ok_cancel_modal_root}>
                <div className={isOpen ? styles.ok_cancel_modal_body : publicStyles.display_none}>
                    <div className={styles.text_content_container}><span>{textContent}</span></div>
                    <div className={styles.btn_container}>
                        <div onClick={okBtnOnClickHandler} className={styles.ok_cancel_modal_ok_btn_container}><div className={styles.ok_cancel_modal_ok_btn_img}></div></div>
                        <div onClick={cancelBtnOnClickHandler} className={styles.ok_cancel_modal_cancel_btn_container}><div className={styles.ok_cancel_modal_cancel_btn_img}></div></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PublicOkCancelModal;
