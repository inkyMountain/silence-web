import React, {Suspense, lazy} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {FunctionComponent} from 'react';
import {configure, reaction} from 'mobx';
import AudioPlayer from '@/utils/AudioPlayer';
import vconsole from 'vconsole';

import {ThemeProvider} from 'styled-components';
import playlistStore from '@/store/playlists.store';
import globalThemeStore from '@/store/theme.store';

interface AppProps {
  className: string;
}

if (process.env.NODE_ENV === 'development' && window.innerWidth <= 600) {
  new vconsole();
}

configure({enforceActions: 'always'});

const Home = lazy(() => import('./pages/Home/Home'));
const Player = lazy(() => import('./pages/Player/Player'));
const Login = lazy(() => import('./pages/Login/Login'));
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
            <Route component={Login} path={'/login'} exact={true}/>
            <Route component={PageNotFound} path={'*'}/>
          </Switch>
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
