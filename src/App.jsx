import React from 'react';
import {
  CssBaseline,
} from '@material-ui/core';
import {
  Header,
  Geo,
} from './components';

const App = () => (
  <>
    <CssBaseline />
    <Header appName="Maps" />

    <Geo
      coords={[36, 3]}
      zoom={5}
    />
  </>
);

export default App;
