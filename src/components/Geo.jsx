import React from 'react';
import {
  Map,
  TileLayer,
  GeoJSON,
  LayersControl,
  FeatureGroup,
} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import Choropleth from 'react-leaflet-choropleth';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import hash from 'object-hash';

// import assets
import countries from '../assets/maps/countries.geo.json';
import densities from '../assets/maps/densities.geo.json';
import tokens from '../assets/access/tokens.json';

// custom css
const useStyles = makeStyles(() => ({
  map: {
    height: 500,
    width: '100%',
  },
}));

const Geo = ({
  coords,
  zoom,
  onCreated,
  featureOpened,
}) => {
  // hooks
  const styles = useStyles();

  // layer control checkboxes
  const { BaseLayer, Overlay } = LayersControl;

  // key used to reload map once new feature opened
  return (
    <Map
      center={coords}
      zoom={zoom}
      className={styles.map}
      key={hash(featureOpened)}
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

        <Overlay name="Countries (green)">
          <GeoJSON
            data={countries}
            onEachFeature={(feature, layer) => {
              layer.bindPopup(feature.properties.name);
            }}
            color="green"
          />
        </Overlay>

        <Overlay checked name="Densities (Choropleth)">
          <Choropleth
            data={densities}
            valueProperty={(feature) => feature.properties.density}
            onEachFeature={(feature, layer) => {
              layer.bindPopup(`${feature.properties.name}: ${feature.properties.density}`);
            }}
            steps={5}
            scale={['white', 'red']}
            mode="q"
            style={{
              color: '#fff',
              weight: 2,
              fillOpacity: 0.8,
            }}
          />
        </Overlay>

        <Overlay checked name="Features drawn (blue)">
          <FeatureGroup>
            <EditControl
              onCreated={onCreated}
            />
          </FeatureGroup>
        </Overlay>

        {
          featureOpened !== ''
          && (
            <Overlay checked name="Features opened (red)">
              <GeoJSON
                data={JSON.parse(featureOpened)}
                color="red"
              />
            </Overlay>
          )
        }
      </LayersControl>
    </Map>
  );
};

// props validation
Geo.propTypes = {
  coords: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoom: PropTypes.number.isRequired,
  onCreated: PropTypes.func.isRequired,
  featureOpened: PropTypes.string.isRequired,
};

export default Geo;
