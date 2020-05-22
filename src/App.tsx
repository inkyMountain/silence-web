import React, {Suspense, lazy} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {FunctionComponent} from 'react';
import {observer} from 'mobx-react-lite';
import {configure, reaction} from 'mobx';
import AudioPlayer from '@/utils/AudioPlayer';

import styled, {ThemeProvider} from 'styled-components';
import playlistStore from '@/store/playlists.store';
import globalThemeStore from '@/store/theme.store';

interface AppProps {
  className: string;
}

configure({enforceActions: 'always'});

const Home = lazy(() => import('./pages/Home/Home'));
const Player = lazy(() => import('./pages/Player/Player'));
const PageNotFound = lazy(() => import('./pages/404/404'));

const playMusic = (songId: number) => {
  const player = new AudioPlayer(`https://music.163.com/song/media/outer/url?id=${songId}.mp3`);
  const oldPlayer = playlistStore.player as AudioPlayer;
  oldPlayer && oldPlayer.stop();
  playlistStore.setPlayer(player);
  player.onError((error) => playNext());
  player.onEnd((event) => playNext());
  const playNext = () => {
    const tracks = playlistStore.playlistDetailInUse.playlist?.tracks as Array<Track>;
    const currentTrackIndex = tracks.findIndex(
      (track) => track.id === songId);
    const nextTrackIndex = currentTrackIndex === (tracks.length - 1) ? 0 : currentTrackIndex + 1;
    const nextTrack = tracks[nextTrackIndex];
    // 改变track对象，触发reaction，从而播放下一首歌。
    playlistStore.setTrack(nextTrack);
  };
  // 歌单中有可能存在部分因为没有版权引起的song.url为空的歌。
};

// 改变track变量时，播放trackId对应的音乐。
reaction(
  () => playlistStore.track.id,
  async (trackId) => {
    const finder = (song: Song) => song.id === trackId;
    const localTargetSong = playlistStore.songsInUse.find(finder) as Song;
    playMusic(localTargetSong.id);
  },
  {name: '音频播放'}
);

const App: FunctionComponent<AppProps> = () => {
  return (
    <ThemeProvider theme={globalThemeStore.globalTheme}>
      <Suspense fallback={<div>loading</div>}>
        <BrowserRouter>
          <Switch>
            <Route component={Home} path={['/home', '/']} exact={true}/>
            <Route component={Player} path={'/player'} exact={true}/>
            <Route component={PageNotFound} path={'*'}/>
          </Switch>
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  );
};

const styledApp = styled(observer(App))`
`;

export default styledApp;
