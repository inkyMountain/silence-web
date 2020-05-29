import {observer} from 'mobx-react-lite';
import React, {
  FunctionComponent,
} from 'react';
import styled from 'styled-components';

interface HeaderProps {
  className: string;
}


const Header: FunctionComponent<HeaderProps> = observer(({className}) => {
  return (
    <div className={className}>{''}</div>
  );
});

const styledHeader = styled(Header)`
`;


export default (styledHeader);
