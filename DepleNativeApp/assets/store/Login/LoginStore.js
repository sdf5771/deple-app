import {action, makeObservable, observable} from 'mobx';

class Login{
  isLoggedIn;

  constructor(isLoggedIn) {
    this.isLoggedIn = isLoggedIn;
  }
}

export class LoginStore {
  rootStore;

  isLoggedIn = false;

  constructor(root) {
    makeObservable(this, {
      isLoggedIn: observable,

      isLoggedInStateTrue: action,
    });

    this.rootStore = root;
  }

  isLoggedInStateTrue() {
    this.isLoggedIn = true;
    console.log(this.isLoggedIn);
  }
}

