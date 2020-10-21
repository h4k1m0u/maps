import React from 'react';
import {
  Map,
  TileLayer,
  GeoJSON,
  LayersControl,
  FeatureGroup,
} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import map from '../assets/maps/countries.geo.json';
import tokens from '../assets/access/tokens.json';

// custom css
const useStyles = makeStyles(() => ({
  map: {
    height: 500,
    width: '100%',
  },
}));

const onEachFeature = (feature, layer) => {
  // show popup on click
  const { name } = feature.properties;
  layer.bindPopup(`${name}`);
};

const Geo = ({ coords, zoom, onCreated }) => {
  // hooks
  const styles = useStyles();

  // layer control checkboxes
  const { BaseLayer, Overlay } = LayersControl;

  return (
    <Map
      center={coords}
      zoom={zoom}
      className={styles.map}
    >
      <LayersControl>
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </BaseLayer>
        <BaseLayer name="Hillshading">
          <TileLayer
            url="http://tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png"
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </BaseLayer>
        {
          tokens.mapbox !== '' && (
            <BaseLayer name="Mapbox satellite">
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=${tokens.mapbox}`}
                attribution='Imagery &amp;copy <a href="https://www.mapbox.com/">Mapbox</a>'
              />
            </BaseLayer>
          )
        }

        <Overlay name="Countries">
          <GeoJSON
            data={map}
            onEachFeature={onEachFeature}
          />
        </Overlay>

        <Overlay checked name="Features">
          <FeatureGroup>
            <EditControl
              onCreated={onCreated}
            />
          </FeatureGroup>
        </Overlay>
      </LayersControl>
    </Map>
  );
};

// props validation
Geo.propTypes = {
  coords: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoom: PropTypes.number.isRequired,
  onCreated: PropTypes.func.isRequired,
};

export default Geo;
