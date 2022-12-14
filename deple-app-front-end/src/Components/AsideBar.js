import React, {useEffect, useState} from 'react';
import propTypes from 'prop-types';
import styles from '../Stylesheets/AsideBar.module.css'
import { useCookies } from 'react-cookie';
import {useHref} from "react-router-dom";
import SetUserInformation from './SetUserInformation'
import PublicMessageBox from "./PublicMessageBox";
import UserShortCutComponent from './UserShortCutComponent';

function AsideBar() {
    const [userList, setUserList] = useState([]);
    useEffect(()=>{
        fetch(`/user_list`, { //${"http://localhost:13000"}
            method: 'GET', // 또는 'PUT'
        }) // throw new Error('Network response was not ok.');
            .then((response) => {
                if(response.ok){
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then((data) => {
                console.log('성공: AsideBar ', data);
                if(data.message === '출력완료'){
                    setUserList(data.user_list);
                }
            })
            .catch((error) => {
                console.error('실패:', error);

                PublicMessageBox('유저 데이터를 불러오는데 실패했어요. 관리자에게 문의해주세요.');
                setTimeout(function(){
                }, 1500)
            });
    },[])

    let tempUserList = [
        {
            user_id: 'seobisback'
        },
        {
            user_id: 'byoungik'
        },
    ]

    return (
        <div id="AsideBarRoot" className={styles.asideBarRoot}>
            {/*<SetUserInformation />*/}
            <div className={styles.asideBarContainer}>
                <div className={styles.asideBarHeader}>
                    <span> 🤩 멋쟁이 리스트 </span>
                </div>
                <div className={styles.asideBarBody}>
                    {userList ? userList.map((userData, idx) => {
                        return <UserShortCutComponent key={idx} userName={userData.id} />
                    }) : null}
                </div>
            </div>
        </div>
    );
}

export default AsideBar;
