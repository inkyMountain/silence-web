import {observer} from 'mobx-react-lite';
import React, {FunctionComponent} from 'react';
import styled from 'styled-components';
import Header from './Header';
import Main from './Main';

interface ExplorerProps {
  className: string;
}

const Explorer: FunctionComponent<ExplorerProps> = observer(({className}) => {
  return (
    <div className={className}>
      <Header className={'explorer-header'}/>
      <Main className={'explorer-main'}/>
    </div>
  );
});

const styledExplorer = styled(Explorer)`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  .explore-main {
    flex: 1;
  }
`;


export default (styledExplorer);
