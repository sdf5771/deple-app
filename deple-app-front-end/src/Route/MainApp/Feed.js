import React, {useEffect} from 'react';
import propTypes from 'prop-types';
import styles from '../../Stylesheets/Feed.module.css'
import {CreateFeed, CreateFeedModal} from "../../Components/CreateFeed";
import {SetFeedComponent} from '../../Components/SetFeedComponent';
import PublicMessageBox from "../../Components/PublicMessageBox";
import {useSelector} from "react-redux";
import createFeedModalResponseReducer from "../../reducers/createFeedModalResponseReducer";

function Feed() {
    const [feedData, setFeedData] = React.useState([]);
    const createFeedModalResponseReducer = useSelector(state => state.createFeedModalResponseReducer);
    useEffect(() => {
        getFeedAjax();
    },[])

    useEffect(()=>{
        createResponseHandler();
    },[createFeedModalResponseReducer.feed])

    let themeDataArr = [];

    let themeData = {
        _create: new Date(),
        creat_user: 'user',
        feed_content: '할라할라',
    };

    themeDataArr.push(themeData);

    function getFeedAjax(){
        fetch(`/feed_select`, { //${"http://localhost:13000"}
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
                console.log('성공:', data);
                if(data.message === '출력완료'){
                    setFeedData(data.feed);
                }
            })
            .catch((error) => {
                console.error('실패:', error);

                PublicMessageBox('피드 데이터를 불러오는데 실패했어요. 관리자에게 문의해주세요.');
                setTimeout(function(){
                }, 1500)
            });
    }

    function createResponseHandler(){
        console.log('createFeedModalResponseReducer ', createFeedModalResponseReducer);
        if(createFeedModalResponseReducer.response){
            setFeedData(createFeedModalResponseReducer.feed);
        }
    }

    return (
        <div className={styles.feed_main_root}>
            <div className={styles.feed_main_create_feed_container}>
                <CreateFeed />
            </div>
            <div className={styles.feed_main_body}>
                {feedData ? feedData.map( feedData => {
                    return <SetFeedComponent data={feedData}/>
                }) : null}
            </div>
        </div>
    );
}

export default Feed;
