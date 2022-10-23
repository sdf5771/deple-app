import React, {useEffect} from 'react';
import styles from '../../Stylesheets/LoginForm.module.css';
import PublicInput from '../../Components/PublicInput';
import PublicMessageBox from '../../Components/PublicMessageBox';
import { useCookies } from 'react-cookie'; // useCookies import

function LoginForm() {
    const [formState, setFormState] = React.useState(0);
    const [isClickState, setIsClickState] = React.useState(true);
    const [userCookies, setUserCookie] = useCookies(['userId']);
    const [authCookies, setAuthCookie] = useCookies(['auth']);

    const formList = {
        0: <LoginFormRoot />,
        1: <JoinUsFormRoot />,
    }

    function joinUsClickHandler(event){
        document.getElementById('loginFormRoot').animate({
            right:['0', '500px']
        },{
            duration: 400,
            easing: "ease",
            iterations: 1,
            fill: "both"
        })
        setTimeout(function(){
            setFormState(1);

            setTimeout(function(){
                document.getElementById('joinUsFormRoot').animate({
                    opacity:[0, 1]
                },{
                    duration: 400,
                    easing: "ease",
                    iterations: 1,
                    fill: "both"
                })
            },1)
        },400)

    }

    async function loginBtnOnClickHandler(event){
        event.preventDefault();
        if(isClickState){
            const LoginIdInputVal = document.querySelector('#LoginIdInput > input').value;
            const LoginPwInputVal = document.querySelector('#LoginPwInput > input').value;

            if(LoginIdInputVal.length === 0 && LoginPwInputVal.length === 0){
                setIsClickState(false);
                PublicMessageBox('ID와 비밀번호를 입력해주세요.');
                setTimeout(function(){
                    setIsClickState(true);
                }, 1500)
                return
            } else if(LoginIdInputVal.length === 0){
                setIsClickState(false);
                PublicMessageBox('ID를 입력해주세요.');
                setTimeout(function(){
                    setIsClickState(true);
                }, 1500)
                return
            } else if(LoginPwInputVal.length === 0){
                setIsClickState(false);
                PublicMessageBox('비밀번호를 입력해주세요.');
                setTimeout(function(){
                    setIsClickState(true);
                }, 1500)
                return
            }

            console.log(`${"http://localhost:13000"}/login/${LoginIdInputVal}/${LoginPwInputVal}`);
            fetch(`/login/${LoginIdInputVal}/${LoginPwInputVal}`, { //${"http://localhost:13000"}
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
                    if(data.auth === 'yes'){
                        setUserCookie('userId', data.id);
                        setAuthCookie('auth', data.auth);

                        window.location.href = '/';
                    } else if(data.auth === 'no'){
                        PublicMessageBox('로그인에 실패했어요. 아이디와 비밀번호를 확인해주세요.');
                    }
                })
                .catch((error) => {
                    console.error('실패:', error);

                    setIsClickState(false);
                    PublicMessageBox('로그인에 실패했어요. 아이디와 비밀번호를 확인해주세요.');
                    setTimeout(function(){
                        setIsClickState(true);
                    }, 1500)
                });
        }
    }

    function LoginFormRoot(){
        return (
            <div id="loginFormRoot" className={styles.login_form_root}>
                <div className={styles.login_form_header}>
                    <span style={{marginLeft: '20px'}}>LOGIN</span>
                </div>
                <div className={styles.login_form_body}>
                    <div className={styles.login_form_input_container}>
                        <PublicInput InputId='LoginIdInput' Type="id" PlaceHolder='Account' />
                        <PublicInput InputId='LoginPwInput' Type="password" PlaceHolder='Password' callback={()=>{
                            document.querySelector('#btnLogin').click();
                        }}/>
                        <div className={styles.login_form_btn_container} style={{gap: '20px', marginTop: '20px'}}>
                            <span id='JoinUsBtn' onClick={joinUsClickHandler}>Join Us</span>
                            <span>Forgot your password</span>
                        </div>
                        <div className={styles.login_form_btn_container}>
                            <button id="btnLogin" onClick={loginBtnOnClickHandler} className={styles.login_button}>LOGIN</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    async function createAccountClickHandler(event){
        event.preventDefault();

        const JoinUsIdInputVal = document.querySelector('#JoinUsIdInput > input').value;
        const JoinUsPwInputVal = document.querySelector('#JoinUsPwInput > input').value;
        const JoinUsNameInputVal = document.querySelector('#JoinUsNameInput > input').value;
        const JoinUsMailInputVal = document.querySelector('#JoinUsMailInput > input').value;
        const JoinUsContactInputVal = document.querySelector('#JoinUsContactInput > input').value;

        if(isClickState){
            if(JoinUsIdInputVal.length === 0){
                setIsClickState(false);
                PublicMessageBox('항목을 모두 입력해주세요.');
                setTimeout(function(){
                    setIsClickState(true);
                }, 1500)
                return;
            } else if(JoinUsPwInputVal.length === 0){
                setIsClickState(false);
                PublicMessageBox('항목을 모두 입력해주세요.');
                setTimeout(function(){
                    setIsClickState(true);
                }, 1500)
                return;
            } else if(JoinUsNameInputVal.length === 0){
                setIsClickState(false);
                PublicMessageBox('항목을 모두 입력해주세요.');
                setTimeout(function(){
                    setIsClickState(true);
                }, 1500)
                return;
            } else if(JoinUsMailInputVal.length === 0){
                setIsClickState(false);
                PublicMessageBox('항목을 모두 입력해주세요.');
                setTimeout(function(){
                    setIsClickState(true);
                }, 1500)
                return;
            } else if(JoinUsContactInputVal.length === 0){
                setIsClickState(false);
                PublicMessageBox('항목을 모두 입력해주세요.');
                setTimeout(function(){
                    setIsClickState(true);
                }, 1500)
                return;
            }

            await createUserData();

            // document.querySelector('#goLoginBtn').click();

            // document.getElementById('joinUsFormRoot').animate({
            //     right:['0', '500px']
            // },{
            //     duration: 400,
            //     easing: "ease",
            //     iterations: 1,
            //     fill: "both"
            // })
            // setTimeout(function(){
            //     setFormState(0);
            //
            //     setTimeout(function(){
            //         document.getElementById('loginFormRoot').animate({
            //             opacity:[0, 1]
            //         },{
            //             duration: 400,
            //             easing: "ease",
            //             iterations: 1,
            //             fill: "both"
            //         })
            //     },1)
            // },400)
        }
    }

    async function createUserData(){
        const JoinUsIdInputVal = document.querySelector('#JoinUsIdInput > input').value;
        const JoinUsPwInputVal = document.querySelector('#JoinUsPwInput > input').value;
        const JoinUsNameInputVal = document.querySelector('#JoinUsNameInput > input').value;
        const JoinUsMailInputVal = document.querySelector('#JoinUsMailInput > input').value;
        const JoinUsContactInputVal = document.querySelector('#JoinUsContactInput > input').value;

        let createUserObj = {
            userId : JoinUsIdInputVal,
            userPw: JoinUsPwInputVal,
            name: JoinUsNameInputVal,
            mail: JoinUsMailInputVal,
            contact: JoinUsContactInputVal
        }
        console.log('JSON.stringify(createUserObj) ', createUserObj);
        fetch(`/create`, {
            method: 'POST', // 또는 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(createUserObj),
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
                if(data.message === '생성완료'){
                    PublicMessageBox('회원가입에 성공했어요. 로그인 해주세요.');

                    document.querySelector('#goLoginBtn').click();
                } else {
                    PublicMessageBox('회원가입에 실패했어요. 회원가입 정보를 확인해주세요.');
                }
            })
            .catch((error) => {
                console.error('실패:', error);
                PublicMessageBox('회원가입에 실패했어요.');
            });
    }

    function goLoginClickHandler(event){
        document.getElementById('joinUsFormRoot').animate({
            right:['0', '500px']
        },{
            duration: 400,
            easing: "ease",
            iterations: 1,
            fill: "both"
        })
        setTimeout(function(){
            setFormState(0);

            setTimeout(function(){
                document.getElementById('loginFormRoot').animate({
                    opacity:[0, 1]
                },{
                    duration: 400,
                    easing: "ease",
                    iterations: 1,
                    fill: "both"
                })
            },1)
        },400)
    }

    function JoinUsFormRoot(){
        return(
            <div id="joinUsFormRoot" className={styles.join_us_form_root}>
                <div className={styles.join_us_form_header}>
                    <span style={{marginLeft: '20px'}}>Join Us</span>
                </div>
                <div className={styles.join_us_form_body}>
                    <div className={styles.join_us_form_input_container}>
                        <PublicInput InputId='JoinUsIdInput' Type="id" PlaceHolder='Account' />
                        <PublicInput InputId='JoinUsPwInput' Type="password" PlaceHolder='Password'/>
                        <PublicInput InputId='JoinUsNameInput' Type="default" PlaceHolder='Name' />
                        <PublicInput InputId='JoinUsMailInput' Type="mail" PlaceHolder='E-Mail'/>
                        <PublicInput InputId='JoinUsContactInput' Type="phone" PlaceHolder='Contact' />
                    </div>
                    <div className={styles.join_us_form_btn_container} style={{ marginTop: '20px'}}>
                        <button onClick={createAccountClickHandler} className={styles.join_us_button}>CREATE ACCOUNT</button>
                    </div>
                    <div className={styles.join_us_form_btn_container} style={{ marginTop: '20px'}}>
                        <button id="goLoginBtn" onClick={goLoginClickHandler} className={styles.join_us_button}>LOGIN PAGE</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        formList[formState]
    );
}

export default LoginForm;