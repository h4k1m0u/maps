import React from 'react';
import {
  CssBaseline,
  Grid,
} from '@material-ui/core';
import {
  Header,
  Geo,
  Nav,
} from './components';

class App extends React.Component {
  constructor(props) {
    super(props);

    // init state
    this.state = {
      feature: null,
    };

    // binding to use this keyword in callbacks
    this.onCreated = this.onCreated.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onCreated(e) {
    // save drawn feature in state
    this.setState({
      feature: e.layer.toGeoJSON(),
    });
  }

  onClick() {
    const { feature } = this.state;
    if (feature === null) {
      return;
    }

    // download geojson feature drawn
    const data = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(feature))}`;
    const link = document.createElement('a');
    link.href = data;
    link.download = 'feature.geo.json';
    link.click();
  }

  render() {
    return (
      <>
        <CssBaseline />
        <Header appName="Maps" />

        <Grid container>
          <Grid item xs={10}>
            <Geo
              coords={[36, 3]}
              zoom={5}
              onCreated={this.onCreated}
            />
          </Grid>
          <Grid item xs={2}>
            <Nav onClick={this.onClick} />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default App;
