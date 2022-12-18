import React, {useState, useEffect, useRef} from 'react';
import styles from '../Stylesheets/PublicOkCancelModal.module.css';
import publicStyles from '../Stylesheets/PublicStyle.module.css'

function PublicOkCancelModal({textContent}){
    const [isOpen, setIsOpen] = useState(false);
    const modalRootRef = useRef();

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

    return (
        <div id="okCancelModal">
            <div className={styles.modal_background}></div>
            <div ref={modalRootRef} className={styles.ok_cancel_modal_root}>
                <div className={isOpen ? styles.ok_cancel_modal_body : publicStyles.display_none}>
                    <div className={styles.text_content_container}><span>{textContent}</span></div>
                    <div className={styles.btn_container}>
                        <div className={styles.ok_cancel_modal_ok_btn_container}><div className={styles.ok_cancel_modal_ok_btn_img}></div></div>
                        <div className={styles.ok_cancel_modal_cancel_btn_container}><div className={styles.ok_cancel_modal_cancel_btn_img}></div></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PublicOkCancelModal;
