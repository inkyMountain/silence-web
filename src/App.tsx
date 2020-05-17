import React, {Suspense, lazy} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {FunctionComponent} from 'react';
import {observer} from 'mobx-react-lite';
import {configure, reaction} from 'mobx';

import styled, {ThemeProvider} from 'styled-components';
import playlistStore from '@/store/playlists.store';
import globalThemeStore from '@/store/theme.store';
import * as interfaces from '@/service/interfaces';
import {Howl} from 'howler';

interface AppProps {
  className: string;
}

configure({enforceActions: 'always'});

const Home = lazy(() => import('./pages/Home/Home'));
const Player = lazy(() => import('./pages/Player/Player'));
const PageNotFound = lazy(() => import('./pages/404/404'));

const playMusic = (song: Song) => {
  const oldHowler = playlistStore.howler;
  oldHowler && oldHowler.unload();
  const howler = new Howl({
    src: song.url,
    autoplay: true
  });
  playlistStore.setHowler(howler);
  howler.once('end', () => {
    howler.unload();
    const tracks = playlistStore.playlistDetailInUse.playlist?.tracks as Array<Track>;
    const currentTrackIndex = tracks.findIndex(
      (track) => track.id === song.id);
    const nextTrackIndex = currentTrackIndex === (tracks.length - 1) ? 0 : currentTrackIndex + 1;
    const nextTrack = tracks[nextTrackIndex];
    playlistStore.setTrack(nextTrack);
  });
};

// 改变track变量时，播放trackId对应的音乐。
reaction(
  () => playlistStore.track.id,
  async (trackId) => {
    const localTargetSong = playlistStore.songsInUse.find(
      (song) => song.id === trackId);
    if (localTargetSong && localTargetSong.url) {
      playMusic(localTargetSong);
      return;
    }
    const res = await interfaces.fetchSongs(trackId as number);
    const targetSong = res.data.find((song) => song.id === trackId);
    if (targetSong && targetSong.url) {
      playMusic(targetSong);
    }
  },
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
