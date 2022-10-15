import './globals.css';
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from '@react-google-maps/api';

function Maps() {
  console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading....</div>;
  return <Mymap />;
}

function Mymap() {
  return (
    <GoogleMap
      zoom={18}
      center={{ lat: 6.907381599618145, lng: 79.87091253068799 }}
      mapContainerClassName='map-container'
    >
      <MarkerF
        position={{ lat: 6.90651, lng: 79.870993 }}
        icon={{
          url: require('./burger.png'),
          scaledSize: new window.google.maps.Size(50, 50),
        }}
      />
      {MarkerF && (
        <InfoWindowF position={{ lat: 6.90671, lng: 79.870993 }}>
          <div> tasty bud - Janaka Foodshop </div>
        </InfoWindowF>
      )}

      <MarkerF
        position={{ lat: 6.907346, lng: 79.870553 }}
        icon={{
          url: require('./burger.png'),
          scaledSize: new window.google.maps.Size(50, 50),
        }}
      />

      {MarkerF && (
        <InfoWindowF position={{ lat: 6.907346, lng: 79.870553 }}>
          <div> Ruchira Foodshop </div>
        </InfoWindowF>
      )}
      <MarkerF
        position={{ lat: 6.90708, lng: 79.870698 }}
        icon={{
          url: require('./burger.png'),
          scaledSize: new window.google.maps.Size(50, 50),
        }}
      />

      {MarkerF && (
        <InfoWindowF position={{ lat: 6.90708, lng: 79.870698 }}>
          <div> Lahiru Foodoutlet </div>
        </InfoWindowF>
      )}

      <MarkerF
        position={{ lat: 6.90782, lng: 79.871546 }}
        icon={{
          url: require('./burger.png'),
          scaledSize: new window.google.maps.Size(50, 50),
        }}
      />
      {MarkerF && (
        <InfoWindowF position={{ lat: 6.9077, lng: 79.871546 }}>
          <div> Nikki Foodoutlet </div>
        </InfoWindowF>
      )}
      <MarkerF
        position={{ lat: 6.905786, lng: 79.870575 }}
        icon={{
          url: require('./burger.png'),
          scaledSize: new window.google.maps.Size(50, 50),
        }}
      />
      {MarkerF && (
        <InfoWindowF position={{ lat: 6.905786, lng: 79.870575 }}>
          <div> Sandun Foodoutlet </div>
        </InfoWindowF>
      )}
      <MarkerF
        position={{ lat: 6.907346, lng: 79.869754 }}
        icon={{
          url: require('./burger.png'),
          scaledSize: new window.google.maps.Size(50, 50),
        }}
      />
      {MarkerF && (
        <InfoWindowF position={{ lat: 6.907346, lng: 79.869754 }}>
          <div> Shamen Foodshop </div>
        </InfoWindowF>
      )}
    </GoogleMap>
  );
}

export default Maps;
