import React, {Suspense, lazy} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {FunctionComponent} from 'react';
import {observer} from 'mobx-react-lite';
import {configure} from 'mobx';

import styled, {ThemeProvider} from 'styled-components';
import globalTheme from '@/store/theme.store';

interface AppProps {
  className: string;
}

configure({enforceActions: 'always'});

const Home = lazy(() => import('./pages/Home/Home'));
const Player = lazy(() => import('./pages/Player/Player'));
const PageNotFound = lazy(() => import('./pages/404/404'));

const App: FunctionComponent<AppProps> = () => {
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
