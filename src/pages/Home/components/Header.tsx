import {observer} from 'mobx-react-lite';
import React, {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useState
} from 'react';
import styled from 'styled-components';
import BaseInput from '@/components/BaseInput';
import * as interfaces from '@/service/interfaces';
import user from '@/store/user';
import {cache} from '@/utils';

interface HeaderProps {
  className: string;
}

const recoverUser = () => {
  const cachedUser = cache.get('user');
  if (!cachedUser.account || !cachedUser.profile) return;
  user.account = cachedUser.account;
  user.profile = cachedUser.profile;
  console.log('cachedUser', cachedUser);
  console.log('user111', user);
};

const Header: FunctionComponent<HeaderProps> = observer(({className}) => {
  const [phone, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value), []);
  const onPasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value), []);

  const login = useCallback(() => {
    interfaces.loginViaPhone({phone, password}).then(({data}) => {
      console.log('data', data);
      user.account = data.account;
      user.profile = data.profile;
      cache.set('user', data);
    });
  }, [phone, password]);

  const logUser = useCallback(() => {
    console.log('user.account', user.account);
    console.log('user.profile', user.profile);
  }, []);

  useEffect(() => {
    recoverUser();
  }, []);

  return (
    <div className={className}>
      <BaseInput type="text" label={'手机号'} onChange={onEmailChange} value={phone}
                 className={'email'}/>
      <BaseInput type="text" label={'密码'} onChange={onPasswordChange} value={password}
                 className={'password'}/>
      <button className="login" onClick={login}>登录</button>
      <button className="login" onClick={logUser}>显示用户信息</button>
    </div>
  );
});

const styledHeader = styled(Header)`
  background-color: cornflowerblue;
  padding: 20px;
`;


export default (styledHeader);
