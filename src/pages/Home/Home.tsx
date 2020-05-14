import {observer} from 'mobx-react-lite';
import React, {FunctionComponent} from 'react';
import styled from 'styled-components';
import SideBar from './components/SideBar';
import Explorer from './components/Explorer';

interface HomeProps {
  className: string;
}

const Home: FunctionComponent<HomeProps> = observer(({className}) => {
  return (
    <div className={className}>
      <SideBar className={'global-sidebar'}/>
      <Explorer className={'global-explorer'}/>
    </div>
  );
});

const styledHome = styled(Home)`
  height: 100%;
  display: flex;
  .global-explorer {
    flex: 1;
  }
`;

export default styledHome;
