import {observer} from 'mobx-react-lite';
import React, {FunctionComponent} from 'react';
import styled from 'styled-components';

interface MainProps {
  className: string;
}

const Main: FunctionComponent<MainProps> = observer(({className}) => {
  return (
    <div className={className}>
      Main
    </div>
  );
});

const styledMain = styled(Main)`
`;


export default (styledMain);
