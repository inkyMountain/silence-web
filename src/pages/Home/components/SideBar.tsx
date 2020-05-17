import {observer} from 'mobx-react-lite';
import React, {FunctionComponent, useCallback, useEffect} from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

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
    interfaces.fetchPlaylists(userId).then(({playlist: playlists}) => {
      playlistsStore.setPlaylists(playlists);
      playlistsStore.setSelectedPlaylist(playlists[0] || []);
    });
  }, []);

  const changePlaylist = useCallback((list) => {
    playlistsStore.setSelectedPlaylist(list);
  }, []);

  return (
    <div className={classNames(className)}>{
      playlistsStore.playlists.map(list => {
        const isSelected = playlistsStore.playlistDetail.playlist?.id === list.id;
        return (
          <div className={classNames('playlist', isSelected ? 'selected' : '')}
               key={list.id}
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
  border-right: ${props => props.theme.lightestGray} 1px solid;
  .playlist {
    padding: 10px;
    cursor: pointer;
    border-left: transparent 5px solid;
  }
  .playlist:hover {
    transition: background-color ease .2s;
    background-color: ${props => props.theme.lightestGray};
  }
  .playlist.selected {
    border-left: ${props => props.theme.deepestGray} 5px solid;
    background-color: ${props => props.theme.lightestGray};
  }
`;

export default (styledSideBar);
