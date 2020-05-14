import {observer} from 'mobx-react-lite';
import React, {FunctionComponent} from 'react';
import styled from 'styled-components';

interface SideBarProps {
  className: string;
}

const SideBar: FunctionComponent<SideBarProps> = observer(({className}) => {
  return (
    <div className={className}>
      Side Bar
      Side Bar
      Side Bar
    </div>
  );
});

const styledSideBar = styled(SideBar)`
  background-color: white;
  min-width: 300px;
  max-width: 500px;
  border-right: #f2f2f2 1px solid;
`;


export default (styledSideBar);
