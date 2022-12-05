import {UserStore} from './User/UserStore';
import {LoginStore} from './Login/LoginStore';

export class RootStore {
  userStore;
  loginStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.loginStore = new LoginStore(this);
  }
}
