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
            <div>
                <h1>hello i'm topbar title</h1>
            </div>
            <div>

            </div>
        </div>
    );
}

export default TopBar;