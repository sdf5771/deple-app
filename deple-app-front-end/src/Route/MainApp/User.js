import React, {useState, useEffect} from 'react';
import propTypes from 'prop-types';
import publicStyles from '../../Stylesheets/PublicStyle.module.css';
import styles from '../../Stylesheets/User.module.css';
import PublicMessageBox from "../../Components/PublicMessageBox";

function userProfileEmptyComponent(){
    return (
        <div className={styles.user_profile_empty_root}>
            <div className={styles.user_profile_empty_body}>
                <span>표시할 정보가 없어요 😂</span>
            </div>
        </div>
    );
}

function User() {
    const [userProfileData, setUserProfileData] = useState([]);

    useEffect(() => {
        fetch(`/userprofile`, { //${"http://localhost:13000"}
            method: 'GET', // 또는 'PUT'
        }) // throw new Error('Network response was not ok.');
            .then((response) => {
                console.log('response ', response);
                if(response.ok){
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then((data) => {
                console.log('성공: AsideBar ', data);
                if(data.message === '출력완료'){
                    console.log('setState logic')
                    // setUserProfileData(data.userProfile);
                }
            })
            .catch((error) => {
                console.error('실패:', error);
                setUserProfileData(null);
                PublicMessageBox('유저 데이터를 불러오는데 실패했어요. 관리자에게 문의해주세요.');
                setTimeout(function(){
                }, 1500)
            });
    }, [])

    return (
        <div className={publicStyles.page_root_container}>
            {userProfileData ?
                <div className={styles.user_profile_root}>
                    <div className={styles.user_profile_header_container}>
                        <div>
                            <div></div>
                            <div>
                                <span></span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.user_profile_body_container}>

                    </div>
                </div>
             :
                <userProfileEmptyComponent />}
        </div>
    );
}

export default User;
