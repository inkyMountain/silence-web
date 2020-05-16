import {observer} from 'mobx-react-lite';
import React, {FunctionComponent, useCallback, useEffect} from 'react';
import styled from 'styled-components';
import {reaction} from 'mobx';

import * as interfaces from '@/service/interfaces';
import playlistStore from '@/store/playlists.store';

interface MainProps {
  className: string;
}

const Main: FunctionComponent<MainProps> = observer(({className}) => {
  useEffect(() => {
    reaction(
      () => playlistStore.selectedPlaylist.id,
      () => {
        const playlistId = playlistStore.selectedPlaylist.id as number;
        interfaces.fetchPlaylistDetail(playlistId).then((playlistDetail) => {
          playlistStore.setPlaylistDetail(playlistDetail);
          console.log('歌单详情加载成功', playlistDetail);
        });
      }
    );
  }, []);

  const changeTrack = useCallback((song: Track) => {
    playlistStore.setTrack(song);
  }, []);

  return (
    <div className={className}>
      {playlistStore.playlistDetail.playlist?.tracks.map(song => {
        return (
          <div className="song" key={song.id}
               onClick={() => changeTrack(song)}>{song.name}</div>
        );
      })}
    </div>
  );
});

const styledMain = styled(Main)`
`;


export default (styledMain);
