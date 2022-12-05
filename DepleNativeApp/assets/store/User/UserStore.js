import {action, makeObservable, observable} from 'mobx';

class User {
  uuid;
  userId;
  userPw;
  name;
  mail;
  contact;

  constructor(uuid, userId, userPw, name, mail, contact) {
    this.uuid = uuid;
    this.userId = userId;
    this.userPw = userPw;
    this.name = name;
    this.mail = mail;
    this.contact = contact;
  }
}

export class UserStore {
  rootStore;

  userInfo = {};

  constructor(root) {
    makeObservable(this, {
      userInfo: observable,
    });

    this.rootStore = root;
  }
}
