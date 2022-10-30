import React from 'react';
import propTypes from 'prop-types';
import styles from '../../Stylesheets/Feed.module.css'
import {CreateFeed, CreateFeedModal} from "../../Components/CreateFeed";


function Feed() {
    return (
        <div className={styles.feed_main_root}>
            <div className={styles.feed_main_create_feed_container}>
                <CreateFeed />
            </div>
            <div className={styles.feed_main_body}>

            </div>
        </div>
    );
}

export default Feed;