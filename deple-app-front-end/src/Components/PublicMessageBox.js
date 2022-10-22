import React from 'react';
import styles from '../Stylesheets/PublicMessageBox.module.css'
/*
* MsgText = String "Msg"
* */
function PublicMessageBox(MsgText) {
    let publicMsgBox = document.createElement('div');

    publicMsgBox.className = styles.public_msg_root;

    let addHtml = `
        <span>${MsgText}</span>
    `;

    publicMsgBox.insertAdjacentHTML('beforeend', addHtml);

    document.getElementById('root').append(publicMsgBox);

    setTimeout(function(){
        publicMsgBox.remove();
    },1500)
}

export default PublicMessageBox;