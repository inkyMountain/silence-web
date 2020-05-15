import {observable, computed} from 'mobx';

interface Account {
  id?: number;
  userName?: string;
  type?: number;
  status?: number;
  whitelistAuthority?: number;
  createTime?: number;
  salt?: string;
  tokenVersion?: number;
  ban?: number;
  baoyueVersion?: number;
  vipType?: number;
  vipTypeVersion?: number;
  anonimousUser?: boolean;
}

interface Profile {

}

interface User {
  account: Account;
  profile: Profile;
  isLogin: boolean;
}

const account = observable<Account>({});
const profile = observable<Profile>({});

const user = observable<User>({
  account,
  profile,
  get isLogin() {
    return !this.account || !this.profile;
  }
});

export default user;
