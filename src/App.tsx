import React, {useCallback} from 'react';
import {FunctionComponent} from 'react';
import styled from 'styled-components';
import http from './service/http';
import './reset.less';

interface AppProps {
  className: string;
}

const StyledButton = styled.button`
  color: #8ad98a;
`;

const App: FunctionComponent<AppProps> = (props) => {
  const {className} = props;
  const request = useCallback(() => {
    http.post('/dj/program?rid=336355127').then((res) => {
      console.log('res', res);
    });
  }, []);
  return (
    <div className={className}>
      Hello React
      <StyledButton onClick={request}>Styled Button</StyledButton>
    </div>
  );
};

const styledApp = styled(App)`
  background-color: aquamarine;
  color: blue;
`;

export default styledApp;
