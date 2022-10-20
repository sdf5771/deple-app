import React from 'react';
import propTypes from 'prop-types';
import styles from '../Stylesheets/MenuBar.module.css'

function MenuElement({}){
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

function MenuBar() {
    return (
        <div id="MenuBarRoot" className={styles.menu_bar_root}>
            <div>
                <h1>hello i'm Menubar title</h1>
            </div>
            <div>
                <MenuElement />
            </div>
        </div>
    );
}

export default MenuBar;