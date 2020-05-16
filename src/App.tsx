import React, {Suspense, lazy, useEffect} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {FunctionComponent} from 'react';
import {observer} from 'mobx-react-lite';
import {configure, reaction} from 'mobx';
import {Howl} from 'howler';

import styled, {ThemeProvider} from 'styled-components';
import playlistStore from '@/store/playlists.store';
import globalTheme from '@/store/theme.store';
import * as interfaces from '@/service/interfaces';

const playMusic = (src: string) => {
  new Howl({
    src,
    autoplay: true
  });
};

interface AppProps {
  className: string;
}

configure({enforceActions: 'always'});

const Home = lazy(() => import('./pages/Home/Home'));
const Player = lazy(() => import('./pages/Player/Player'));
const PageNotFound = lazy(() => import('./pages/404/404'));

const App: FunctionComponent<AppProps> = () => {
  useEffect(() => {
    reaction(
      () => playlistStore.track.id,
      async (trackId) => {
        const res = await interfaces.fetchSongUrl(trackId as number);
        const targetSong = res.data.find((song) => song.id === trackId) as SongUrl;
        playMusic(targetSong.url);
      },
    );
  }, []);

  return (
    <ThemeProvider theme={globalTheme}>
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
