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
        // return () => {
        //     modalRootNode.classList.remove(styles.open);
        //     modalRootNode.classList.add(styles.close);
        // }
    }, [])

    return (
        <div ref={modalRootRef} className={styles.ok_cancel_modal_root}>
            <div className={isOpen ? null : publicStyles.display_none}>
                <div><span>{textContent}</span></div>
                <div>
                    <div className={styles.ok_cancel_modal_ok_btn_container}><div className={styles.ok_cancel_modal_ok_btn_img}></div></div>
                    <div className={styles.ok_cancel_modal_cancel_btn_container}><div className={styles.ok_cancel_modal_cancel_btn_img}></div></div>
                </div>
            </div>
        </div>
    );
}

export default PublicOkCancelModal;
