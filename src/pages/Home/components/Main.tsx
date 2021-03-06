import {observer} from 'mobx-react-lite';
import React, {FunctionComponent, useCallback} from 'react';
import styled from 'styled-components';
import {reaction} from 'mobx';

import * as interfaces from '@/service/interfaces';
import playlistStore from '@/store/playlists.store';
import flagStore from '@/store/flags.store';
import classNames from 'classnames';

interface MainProps {
  className: string;
}

// 用户选中不同的歌单时，请求对应的歌单内容和歌曲链接。
reaction(
  () => playlistStore.selectedPlaylist.id,
  async () => {
    const playlistId = playlistStore.selectedPlaylist.id as number;
    const playlistDetail = await interfaces.fetchPlaylistDetail(playlistId);
    playlistStore.setPlaylistDetail(playlistDetail);
    const ids = playlistDetail.playlist.tracks.reduce<Array<number>>(
      (acc, track) => [...acc, track.id], []
    );
    const {data: songs} = await interfaces.fetchSongs(ids);
    playlistStore.setSongs(songs);
  }
);

reaction(
  () => flagStore.currentTab.get() === 'recommend',
  () => {
    console.log('选中推荐tab');
  }
);

const Main: FunctionComponent<MainProps> = observer(({className}) => {
  const changeTrack = useCallback((track: Track) => {
    playlistStore.setSongsInUse(playlistStore.songs);
    playlistStore.setPlaylistDetailInUse(playlistStore.playlistDetail);
    playlistStore.setTrack(track);
  }, []);

  const playlistItems = (
    <table className={'songlist-table'}>
      <tbody>{
        playlistStore.playlistDetail.playlist?.tracks.map(track => {
          const isPlaying = track.id === playlistStore.track.id;
          return (
            <tr className={classNames('track', isPlaying ? 'playing' : '')}
                key={track.id}
                onClick={() => changeTrack(track)}>
              <td className="name">{track.name}</td>
              <td className="author">{track?.ar[0].name}</td>
            </tr>
          );
        })
      }</tbody>
    </table>
  );

  return (
    <div className={className}>
      {flagStore.currentTab.get() === 'playlist' ? playlistItems : '推荐歌单'}
    </div>
  );
});

const styledMain = styled(Main)`
  padding: 10px;
  .track {
    cursor: pointer;
    transition: background-color ease .5s;
  }
  .track:hover {
    transition: background-color ease .2s;
    background-color: ${props => props.theme.deepest};
  }
  .track.playing .name,
  .track.playing .author,
  .track:hover .name,
  .track:hover .author {
    background-color: ${props => props.theme.deepest};
    color: ${props => props.theme.lighter};
  }
  .songlist-table {
    border-collapse: collapse;
  }
  .name, 
  .author {
    padding:10px;
  }
`;


export default (styledMain);
