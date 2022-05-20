<script type="ts">
    import {
        Map,
        Marker,
        NavigationControl,
        Popup
    } from "svelte-mapbox-gl";
    const coordinates = { lat: 48, lng: 3 };
</script>
  
  <Map
    accessToken="xxx"
    style="mapbox://styles/mapbox/streets-v11"
    center={coordinates}
    zoom={10}>
    <NavigationControl />
    <Marker {coordinates}>
      <Popup>I'm a popup attached to a marker!</Popup>
    </Marker>
  </Map>