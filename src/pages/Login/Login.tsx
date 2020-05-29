import {observer} from 'mobx-react-lite';
import React, {ChangeEvent, FunctionComponent, useCallback, useState} from 'react';
import styled from 'styled-components';
import * as interfaces from '@/service/interfaces';
import userStore from '@/store/user.store';
import BaseInput from '@/components/BaseInput';
import BaseButton from '@/components/BaseButton';
import {cache} from '@/utils';
import * as styleMixins from '@/utils/styleMixins';
import classNames from 'classnames';
import {useHistory} from 'react-router-dom';

interface LoginProps {
  className: string;
}

const persistUser = (user: { account: Object, profile: Object }) => {
  cache.set('user', user);
};

const Login: FunctionComponent<LoginProps> = observer(({className}) => {
  const history = useHistory();
  const [phone, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const onEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value), []);
  const onPasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value), []);


  const login = useCallback(async () => {
    const user = await interfaces.loginViaPhone({phone, password}).catch(error => {
      setLoginError(error);
      return {account: {}, profile: {}};
    });
    if (Object.keys(user.account).length === 0) return;
    userStore.updateAccount(user.account);
    userStore.updateProfile(user.profile);
    persistUser(user);
    history.push('/');
  }, [phone, password, history]);

  const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key.toLowerCase() === 'enter') void login();
  }, [login]);

  return (
    <div className={classNames('login-wrapper', className)}>
      <table>
        <tbody>
        <tr>
          <td className={'label'}>手机号</td>
          <td><BaseInput type="text" onChange={onEmailChange} value={phone}
                         className={'email'} onKeyDown={onKeyDown}/></td>
        </tr>
        <tr>
          <td className={'label'}>密码</td>
          <td><BaseInput type="password" onChange={onPasswordChange} value={password}
                         className={'password'} onKeyDown={onKeyDown}/></td>
        </tr>
        </tbody>
      </table>
      <BaseButton className="login-button" onClick={login}>登录</BaseButton>
      <div className="login-error">{loginError}</div>
    </div>
  );
});

const styledLogin = styled(Login)`
  width: 100%;
  height: 100%;
  flex-direction: column;
  ${styleMixins.flexCenter()}
  .email, .password {
    padding: 10px;
  }
  .label {
    line-height: 30px;
  }
  .login-button {
    margin-top: 20px;
  }
`;


export default (styledLogin);
