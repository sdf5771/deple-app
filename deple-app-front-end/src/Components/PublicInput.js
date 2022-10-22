import React from 'react';
import propTypes from 'prop-types';
import styles from '../Stylesheets/PublicInput.module.css'
/*
* Type = "id", "password", "default"
* */
function PublicInput({ InputId, Type, PlaceHolder}) {
    const [inputVal, setInputVal] = React.useState('');
    const onChange = (event) => {setInputVal(event.target.value);}
    let iconImageSelector = styles.input_image_default;
    let inputType = 'text';
    function inputBlurHandler(event){
        if(Type === 'id'){
            event.target.previousElementSibling.classList.remove(styles.input_image_id_active);
            event.target.previousElementSibling.classList.add(styles.input_image_id);
        } else if(Type === 'password'){
            event.target.previousElementSibling.classList.remove(styles.input_image_password_active);
            event.target.previousElementSibling.classList.add(styles.input_image_password);
        } else if(Type === 'mail'){
            event.target.previousElementSibling.classList.remove(styles.input_image_mail_active);
            event.target.previousElementSibling.classList.add(styles.input_image_mail);
        } else if(Type === 'phone'){
            event.target.previousElementSibling.classList.remove(styles.input_image_phone_active);
            event.target.previousElementSibling.classList.add(styles.input_image_phone);
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
        } else if(Type === 'mail'){
            event.target.previousElementSibling.classList.remove(styles.input_image_mail);
            event.target.previousElementSibling.classList.add(styles.input_image_mail_active);
        } else if(Type === 'phone'){
            event.target.previousElementSibling.classList.remove(styles.input_image_phone);
            event.target.previousElementSibling.classList.add(styles.input_image_phone_active);
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
            inputType = 'password';
        } else if(Type === 'mail'){
            iconImageSelector = styles.input_image_mail;
            inputType = 'email';
        } else if(Type === 'phone'){
            iconImageSelector = styles.input_image_phone;
            inputType = 'tel';
        } else if(Type === 'default'){
            iconImageSelector = styles.input_image_default;
        }
    }

    return (

        <div id={InputId ? InputId : ''} className={styles.public_input_root}>
            <div className={iconImageSelector}></div>
            <input onChange={onChange} onFocus={inputFocusHandler} onBlur={inputBlurHandler}
                   placeholder={PlaceHolder ? PlaceHolder : ""} value={inputVal} maxLength='50'
                   type={Type === 'phone' || Type === 'password' || Type === 'mail'? inputType : 'text'}/>
        </div>
    );
}
PublicInput.propTypes = {
    InputId: propTypes.string,
    Type: propTypes.string,
    PlaceHolder: propTypes.string,
};

export default PublicInput;