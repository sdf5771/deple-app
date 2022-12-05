import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TextInput,
  Pressable,
} from 'react-native';

import {useStores} from '../../store/Context';
import {observer} from 'mobx-react';
const Login = () => {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');

  const {loginStore} = useStores();

  const idInputOnChangeTextHandler = event => {setUserId(event)}
  const pwInputOnChangeTextHandler = event => {setUserPw(event)}

  const loginBtnOnPressHandler = event => {
    loginStore.isLoggedInStateTrue();
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.loginLogo}
          source={require('../../images/DepleLogo.png')}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.idTextInput}
          onChangeText={idInputOnChangeTextHandler}
          placeholder="아이디"
          placeholderTextColor="#5881C1"
          value={userId}
        />
        <TextInput
          style={styles.pwTextInput}
          onChangeText={pwInputOnChangeTextHandler}
          placeholder="비밀번호"
          placeholderTextColor="#5881C1"
          value={userPw}
        />
      </View>
      <View style={styles.btnContainer}>
        <Pressable
          onPress={loginBtnOnPressHandler}
        >
          <View style={styles.loginBtnView}>
            <Text style={styles.loginBtnText}>로그인</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 0.4,
  },
  loginLogo: {
    marginTop: 40,
    width: 200,
    height: 200,
  },
  inputContainer: {
    marginTop: 40,
    flexDirection: 'column',
  },
  idTextInput: {
    paddingLeft: 10,
    width: 300,
    height: 50,
    borderWidth: 2,
    borderColor: '#5881C1',
    borderRadius: 8,
  },
  pwTextInput: {
    paddingLeft: 10,
    marginTop: 10,
    width: 300,
    height: 50,
    borderWidth: 2,
    borderColor: '#5881C1',
    borderRadius: 8,
  },
  btnContainer: {
    marginTop: 20,
  },
  loginBtnView: {
    width: 150,
    height: 50,
    backgroundColor: '#5881C1',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
});
export default observer(Login);
