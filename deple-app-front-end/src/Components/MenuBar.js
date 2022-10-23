import React from 'react';
import propTypes from 'prop-types';
import styles from '../Stylesheets/MenuBar.module.css'

function MenuElement({ Type, TextContent, MenuElId, Activated }){
    let elementImgSelector
    if(Type){
        if(Type === 'home'){
            elementImgSelector = styles.menu_home_img
        } else if(Type === 'profile'){
            elementImgSelector = styles.menu_profile_img
        }
    }

    const onClick = (event) => {
        event.preventDefault();
        if(Type === 'home'){
            window.location.replace('/');
        } else if(Type === 'profile'){
            window.location.replace('/profile');
        }

    }

    return (
        <div id={MenuElId ? MenuElId : ""} className={styles.menu_element_root} onClick={onClick}>
            <div className={ Activated ? styles.menu_element_active : styles.menu_element_not_active}></div>
            <div className={elementImgSelector}></div>
            <div className={styles.menu_element_name_container}>
                <span className={styles.menu_element_name}>{TextContent ? TextContent : ""}</span>
            </div>
        </div>
    );
}

MenuElement.propTypes = {
    Type: propTypes.string,
    TextContent: propTypes.string,
    MenuElId: propTypes.string,
    Activated: propTypes.bool,
}

function MenuBar() {
    const [active, setActive] = React.useState(false);
    let nowPath = window.location.pathname;

    return (
        <div id="MenuBarRoot" className={styles.menu_bar_root}>
            <div className={styles.menu_bar_header}>
                <span className={styles.menu_title}>MENU</span>
            </div>
            <div className={styles.menu_bar_body}>
                <MenuElement MenuElId="homeMenuEl" Type="home" TextContent="Home" Activated={nowPath === '/' ? true : false} />
                <MenuElement MenuElId="profileMenuEl" Type="profile" TextContent="Profile" Activated={nowPath === '/profile' ? true : false} />
            </div>
        </div>
    );
}

export default MenuBar;