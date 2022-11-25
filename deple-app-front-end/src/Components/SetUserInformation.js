import React, {useState, useEffect} from 'react';
import propTypes from 'prop-types';
import styles from '../Stylesheets/AsideBar.module.css'
import { useCookies } from 'react-cookie';
import {useHref} from "react-router-dom";
import PublicMessageBox from "./PublicMessageBox";

function SetUserInformation(props) {
    const [uuid, setUuid] = useState('');

    setUuid(props.UUID);

    return (
        <div>
            <div>
                <img src={props.ImgSrc} />
            </div>

            <div>
                <div><span>{props.UserName}</span></div>
            </div>
        </div>
    );
}

SetUserInformation.propTypes = {
    UUID: propTypes.string,
    UserName: propTypes.string,
    TextContent: propTypes.string,
    MenuElId: propTypes.string,
    Activated: propTypes.bool,
    ImgSrc: propTypes.string,
}

export default SetUserInformation;