import {observer} from 'mobx-react-lite';
import React, {FunctionComponent, useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import * as interfaces from '@/service/interfaces';
import user from '@/store/user';

interface MainProps {
  className: string;
}

const Main: FunctionComponent<MainProps> = observer(({className}) => {
  useEffect(() => {
    console.log('isLogin', user.isLogin);
  }, []);

  const fetchPlaylist = useCallback(() => {
    console.log('获取用户歌单');
    const userId = user.account.id as number;
    console.log('userId', userId);
    // if (!userId) return;
    interfaces.fetchPlaylist(userId).then(({data}) => {
      console.log(data);
    });
  }, []);
  return (
    <div className={className}>
      <button onClick={fetchPlaylist}>获取歌单</button>
    </div>
  );
});

const styledMain = styled(Main)`
  
`;


export default (styledMain);
