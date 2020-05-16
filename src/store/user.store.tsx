import {action, computed, observable} from 'mobx';


class UserStore {
  @observable
  account: Partial<UserAccount> = {};

  @observable
  profile: UserProfile = {};

  @computed
  get isLogin() {
    return !!(this.account && this.profile);
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




