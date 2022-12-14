import React, {useState, useEffect} from 'react';
import styles from '../Stylesheets/PublicOkCancelModal.module.css';
import publicStyles from '../Stylesheets/PublicStyle.module.css'

function PublicOkCancelModal({textContent}){
    const [isOpen, setIsOpen] = useState(false);

    // useEffect(() => {
    //     if()
    // }, [])

    return (
        <div style={[styles.ok_cancel_modal_root, styles.open]}>
            <div style={publicStyles.display_none}>
                <div><span>{textContent}</span></div>
                <div>
                    <div style={styles.ok_cancel_modal_ok_btn_container}><div style={styles.ok_cancel_modal_ok_btn_img}></div></div>
                    <div style={styles.ok_cancel_modal_cancel_btn_container}><div style={styles.ok_cancel_modal_cancel_btn_img}></div></div>
                </div>
            </div>
        </div>
    );
}

export default PublicOkCancelModal;
