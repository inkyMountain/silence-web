import {observer} from 'mobx-react-lite';
import React, {FunctionComponent} from 'react';
import styled from 'styled-components';

interface HomeProps {
  className: string;
}

const Home: FunctionComponent<HomeProps> = observer(({className}) => {
  return (
    <div className={className}>
      Home
    </div>
  );
});

const styledHome = styled(Home)`
  color: cornflowerblue;
`;

export default styledHome;
