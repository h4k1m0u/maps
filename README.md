# Description
- Show a leaflet map.
- Draw vector on map.
- Save drawn vector in GeoJSON format on disk.
- Load GeoJSON vector from disk.
- Show choropleth map (US states densities).

# How to use
To show the Mapbox map, a token needs to be saved inside a file located in `/src/assets/access/tokens.json`, under the form:

```json
{
  "mapbox": "<token>"
}
```

# Assets
- Geographic map of all countries: [GeoJSON file](https://github.com/johan/world.geo.json).
- Density by US state: [GeoJSON file](https://leafletjs.com/examples/choropleth/us-states.js).
