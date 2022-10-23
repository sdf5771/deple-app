import React from 'react';
import propTypes from 'prop-types';
import styles from '../Stylesheets/TopBar.module.css'

function TopBarElement({}){
    const [elementVal, setElementVal] = React.useState();
    return (
        <div>
            <div></div>
            <div>
                <span></span>
            </div>
        </div>
    );
}

function TopBar() {
    return (
        <div id="TopBarRoot" className={styles.top_bar_root}>
            <div className={styles.top_bar_left_container}>
                <span className={styles.title_span}>DEPLE</span>
            </div>
            <div className={styles.top_bar_right_container}>

            </div>
        </div>
    );
}

export default TopBar;