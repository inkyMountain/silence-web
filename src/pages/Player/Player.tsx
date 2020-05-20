import {observer} from 'mobx-react-lite';
import React, {FunctionComponent} from 'react';
import styled from 'styled-components';

interface PlayerProps {
  className: string;
}

const Player: FunctionComponent<PlayerProps> = observer(({className}) => {
  return (
    <div className={className}>
      Player
    </div>
  );
});

const styledPlayer = styled(Player)`
`;


export default (styledPlayer);
