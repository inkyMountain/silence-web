import {observer} from 'mobx-react-lite';
import React, {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useState
} from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import {cache} from '@/utils';
import * as interfaces from '@/service/interfaces';
import userStore from '@/store/user.store';
import BaseInput from '@/components/BaseInput';
import BaseButton from '@/components/BaseButton';

interface HeaderProps {
  className: string;
}

const persistUser = (user: { account: Object, profile: Object }) => {
  cache.set('user', user);
};

const Header: FunctionComponent<HeaderProps> = observer(({className}) => {
  const [phone, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value), []);
  const onPasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value), []);

  const login = useCallback(() => {
    interfaces.loginViaPhone({phone, password}).then((data) => {
      console.log('data', data);
      userStore.updateAccount(data.account);
      userStore.updateProfile(data.profile);
      persistUser(data);
    });
  }, [phone, password]);

  const logUser = useCallback(() => {
    console.log('user.account', userStore.account);
    console.log('user.profile', userStore.profile);
  }, []);

  const LoginComponent = (
    <div className={'login'}>
      <BaseInput type="text" label={'手机号'} onChange={onEmailChange} value={phone}
                 className={'email'}/>
      <BaseInput type="text" label={'密码'} onChange={onPasswordChange} value={password}
                 className={'password'}/>
      <BaseButton className="login" onClick={login}>登录</BaseButton>
      <BaseButton className="login" onClick={logUser}>显示用户信息</BaseButton>
    </div>
  );
  const WelcomeComponent = <div
    className="welcome">你好，{userStore.profile.nickname}。</div>;
  return (
    <div className={classnames('explorer-header', className)}>
      {userStore.isLogin ? WelcomeComponent : LoginComponent}
    </div>
  );
});

const styledHeader = styled(Header)`
  display: flex;
  margin-left: auto;
  padding: 20px;
  .login, .welcome {
    margin-left: auto;
  }
`;


export default (styledHeader);
