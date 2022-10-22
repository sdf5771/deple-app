import React from 'react';
import propTypes from 'prop-types';
import styles from '../Stylesheets/PublicInput.module.css'
/*
* Type = "id", "password", "default"
* */
function PublicInput({ InputId, InputClass, Type, PlaceHolder, DefaultVal}) {
    let iconImageSelector = styles.input_image_default;

    function inputBlurHandler(event){
        if(Type === 'id'){
            event.target.previousElementSibling.classList.remove(styles.input_image_id_active);
            event.target.previousElementSibling.classList.add(styles.input_image_id);
        } else if(Type === 'password'){
            event.target.previousElementSibling.classList.remove(styles.input_image_password_active);
            event.target.previousElementSibling.classList.add(styles.input_image_password);
        } else if(Type === 'default'){
            event.target.previousElementSibling.classList.remove(styles.input_image_default_active);
            event.target.previousElementSibling.classList.add(styles.input_image_default);
        }
        event.target.parentElement.style.borderBottom = '1px solid #eaeaea';
    }

    function inputFocusHandler(event){
        if(Type === 'id'){
            event.target.previousElementSibling.classList.remove(styles.input_image_id);
            event.target.previousElementSibling.classList.add(styles.input_image_id_active);
        } else if(Type === 'password'){
            event.target.previousElementSibling.classList.remove(styles.input_image_password);
            event.target.previousElementSibling.classList.add(styles.input_image_password_active);
        } else if(Type === 'default'){
            event.target.previousElementSibling.classList.remove(styles.input_image_default);
            event.target.previousElementSibling.classList.add(styles.input_image_default_active);
        }
        event.target.parentElement.style.borderBottom = '1px solid #5881C0';
    }

    if(Type){
        if(Type === 'id'){
            iconImageSelector = styles.input_image_id;
        } else if(Type === 'password'){
            iconImageSelector = styles.input_image_password;
        } else if(Type === 'default'){
            iconImageSelector = styles.input_image_default;
        }
    }

    return (
        <div id={InputId ? InputId : ''} className={styles.public_input_root}>
            <div className={iconImageSelector}></div>
            <input onFocus={inputFocusHandler} onBlur={inputBlurHandler} placeholder={PlaceHolder ? PlaceHolder : ""}/>
        </div>
    );
}
PublicInput.propTypes = {
    InputId: propTypes.string,
    InputClass: propTypes.string,
    Type: propTypes.string,
    PlaceHolder: propTypes.string,
    DefaultVal: propTypes.string,
};

export default PublicInput;