import {observer} from 'mobx-react-lite';
import React, {FunctionComponent, useCallback, useEffect, useRef} from 'react';
import styled from 'styled-components';
import playlistsStore from '@/store/playlists.store';
import userSotre from '@/store/user.store';
import * as interfaces from '@/service/interfaces';
import {cache} from '@/utils';

interface SideBarProps {
  className: string;
}

const SideBar: FunctionComponent<SideBarProps> = observer(({className}) => {
  useEffect(() => {
    const cachedUser = cache.get('user') || {};
    userSotre.updateAccount(cachedUser.account || {});
    userSotre.updateProfile(cachedUser.profile || {});
  }, []);

  useEffect(() => {
    const userId = userSotre.account.id as number;
    interfaces.fetchPlaylists(userId).then((data) => {
      playlistsStore.setPlaylists(data.playlist);
    });
  }, []);

  const changePlaylist = useCallback((list) => {
    playlistsStore.setSelectedPlaylist(list);
  }, []);

  return (
    <div className={className}>{
      playlistsStore.playlists.map(list => {
        return (
          <div className="playlist" key={list.id}
               onClick={(() => changePlaylist(list))}>
            {list.name}
          </div>
        );
      })
    }</div>
  );
});

const styledSideBar = styled(SideBar)`
  background-color: white;
  min-width: 150px;
  max-width: 500px;
  border-right: #f2f2f2 1px solid;
  .playlist {
    padding: 10px;
    cursor: pointer;
  }
`;


export default (styledSideBar);
