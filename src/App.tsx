import React, {forwardRef, Fragment, useCallback, useEffect} from 'react';
import {FunctionComponent, useRef} from 'react';
import {observer} from 'mobx-react-lite';
import styled from 'styled-components';
import http from './service/http';
import {array} from './store/test';

interface AppProps {
  className: string;
}

interface ButtonProps {
  className: string;
  color: string;
  onRequest: () => void
}

const Button: FunctionComponent<ButtonProps> = ({color}) => <button>{color}</button>;
const StyledButton = styled(Button)`
  background-color: blue;
`;
const App: FunctionComponent<AppProps> = (props) => {
  const request = useCallback(() => {
    http.post('/dj/program?rid=336355127').then((res) => {
      console.log('res', res);
    });
  }, []);
  const buttonRef = useRef(null);
  useEffect(() => {
    console.log(buttonRef);
  }, []);
  return <Fragment>
    {array.map((number, index) => <span key={index}>{number}</span>)}
    <StyledButton className={'button'} color={'red'}
                  onRequest={request}>发送请求</StyledButton>
  </Fragment>;
};

const styledApp = styled(observer(App))`
color: antiquewhite;
`;

export default styledApp;
