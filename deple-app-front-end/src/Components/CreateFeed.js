import React from 'react';
import propTypes from 'prop-types';
import styles from '../Stylesheets/CreateFeed.module.css'

function CreateFeed() {
    return (
        <div id="CreateFeedRoot" className={styles.create_feed_root}>
            <div className={styles.create_feed_header}>
                <input id="CreateFeedInput" className={styles.create_feed_input} placeholder="What's your mind" readOnly={true}/>
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

export default CreateFeed;