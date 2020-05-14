import {observer} from 'mobx-react-lite';
import React, {ChangeEvent, FunctionComponent, useCallback, useState} from 'react';
import styled from 'styled-components';
import BaseInput from '@/components/BaseInput';

interface HeaderProps {
  className: string;
}

const Header: FunctionComponent<HeaderProps> = observer(({className}) => {
  const [email, setEmail] = useState('');
  const onEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value), []);
  const [password, setPassword] = useState('');
  const onPasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value), []);
  return (
    <div className={className}>
      <BaseInput type="text" onChange={onEmailChange} value={email} className={'email'}/>
      <BaseInput type="password" onChange={onPasswordChange} value={password}
                 className={'password'}/></div>
  );
});

const styledHeader = styled(Header)`
  padding: 20px;
`;


export default (styledHeader);
