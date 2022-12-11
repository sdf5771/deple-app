import React, {useState} from 'react';
import styles from '../Stylesheets/UserShortCutComponent.module.css'
import feedStyles from '../Stylesheets/SetFeedComponent.module.css'

function UserShortCutComponent({userName}){
    return (
        <div className={styles.user_shortcut_component_root}>
            <div className={styles.user_shortcut_component_user_icon_container}>
                <div className={feedStyles.feed_component_user_icon}>

                </div>
            </div>
            <div>
                <div className={styles.user_shortcut_component_user_name_container}>
                    <span>{userName}</span>
                </div>
            </div>
        </div>
    );
}

export default UserShortCutComponent;
