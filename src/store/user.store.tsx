import {action, computed, observable} from 'mobx';


class UserStore {
  @observable
  account: Partial<UserAccount> = {};

  @observable
  profile: UserProfile = {};

  @computed
  get isLogin() {
    return Object.keys(this.account).length > 0 && Object.keys(this.profile).length > 0;
  }

  @action
  updateAccount = (account: UserAccount) => {
    this.account = account;
  };

  @action
  updateProfile = (profile: UserProfile) => {
    this.profile = profile;
  };
}

export default new UserStore();




