import {observer} from 'mobx-react-lite';
import React, {FunctionComponent} from 'react';
import styled from 'styled-components';

interface PageNotFoundProps {
  className: string;
}

const Player: FunctionComponent<PageNotFoundProps> = observer(({className}) => {
  return (
    <div className={className}>
      Page Not Found
    </div>
  );
});

const styledPlayer = styled(Player)`
  color: #3096e6;
`;

export default styledPlayer;
