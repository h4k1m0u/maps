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
      featureOpened: '',
      featureDrawn: '',
    };

    // binding to use this keyword in callbacks
    this.onCreated = this.onCreated.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onOpen() {
    const input = document.createElement('input');
    input.type = 'file';
    input.click();
    input.onchange = (e) => {
      // read content of selected file
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = () => {
        this.setState({
          featureOpened: fileReader.result,
        });
      };
    };
  }

  onCreated(e) {
    // save drawn feature in state
    this.setState({
      featureDrawn: JSON.stringify(e.layer.toGeoJSON()),
    });
  }

  onSave() {
    const { featureDrawn } = this.state;
    if (featureDrawn === '') {
      return;
    }

    // download geojson feature drawn
    const data = `data:text/json;charset=utf-8,${encodeURIComponent(featureDrawn)}`;
    const link = document.createElement('a');
    link.href = data;
    link.download = 'feature.geo.json';
    link.click();
  }

  render() {
    const { featureOpened } = this.state;

    return (
      <>
        <CssBaseline />
        <Header appName="Maps" />

        <Grid container>
          <Grid item xs={10}>
            <Geo
              coords={[36, -95]}
              zoom={4}
              onCreated={this.onCreated}
              featureOpened={featureOpened}
            />
          </Grid>
          <Grid item xs={2}>
            <Nav
              onOpen={this.onOpen}
              onSave={this.onSave}
            />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default App;
