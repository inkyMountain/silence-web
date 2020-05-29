import {observer} from 'mobx-react-lite';
import React, {FunctionComponent, useCallback, useEffect} from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import {when} from 'mobx';

import playlistsStore from '@/store/playlists.store';
import userStore from '@/store/user.store';
import * as interfaces from '@/service/interfaces';
import {cache} from '@/utils';
import flagStore from '@/store/flags.store';

interface SideBarProps {
  className: string;
}

// 若用户已登陆，获取用户歌单。
when(
  () => userStore.isLogin,
  () => {
    const userId = userStore.account.id as number;
    interfaces.fetchPlaylists(userId).then(({playlist: playlists}) => {
      playlistsStore.setPlaylists(playlists);
    });
  }
);

const SideBar: FunctionComponent<SideBarProps> = observer(({className}) => {
  useEffect(() => {
    const cachedUser = cache.get('user') || {};
    userStore.updateAccount(cachedUser.account || {});
    userStore.updateProfile(cachedUser.profile || {});
  }, []);

  const changePlaylist = useCallback((list) => {
    flagStore.setCurrentTab('playlist');
    playlistsStore.setSelectedPlaylist(list);
  }, []);

  const showRecommendLPlaylist = useCallback(() => {
    flagStore.setCurrentTab('recommend');
    console.log('showRecommendLPlaylist');
  }, []);

  const isRecommendSelected = flagStore.currentTab.get() === 'recommend';

  return (
    <div className={classNames(className)}>
      <div
        className={classNames('find-more', 'tile', isRecommendSelected ? 'selected' : '')}
        onClick={showRecommendLPlaylist}>推荐
      </div>
      {playlistsStore.playlists.map(list => {
          const isSelected = playlistsStore.playlistDetail.playlist?.id === list.id
                             && flagStore.currentTab.get() === 'playlist';
          return (
            <div className={classNames('tile', isSelected ? 'selected' : '')}
                 key={list.id}
                 onClick={(() => changePlaylist(list))}>
              {list.name}
            </div>
          );
        }
      )}</div>
  );
});

const styledSideBar = styled(SideBar)`
  min-width: 150px;
  max-width: 500px;
  @media (max-width: 500px) {
    min-width: 100px;
    max-width: 100px;
  }
  border-right: ${props => props.theme.lightest} 1px solid;
  .tile {
    padding: 10px;
    cursor: pointer;
    border-left: transparent 5px solid;
    color: ${props => props.theme.deepest}
  }
  .tile:hover {
    transition: background-color ease .2s;
    background-color: ${props => props.theme.lightest};
  }
  .tile.selected {
    border-left: ${props => props.theme.deepestGray} 5px solid;
    background-color: ${props => props.theme.lightest};
  }
`;

export default (styledSideBar);
