import { GoogleMap as IGoogleMap, MarkerF } from '@react-google-maps/api';

const props: GoogleMapProps = {
  size: {
    height: 600,
    width: 600,
  },
  center: {
    lng: 108.2772,
    lat: 14.0583,
  },
  zoom: 11,
};

export interface GoogleMapProps {
  size: {
    height: number;
    width: number;
  };
  center: {
    lng: number; // longitude
    lat: number; // latitude
  };
  zoom?: number;
}

export default function GoogleMap() {
  return (
    <IGoogleMap
      mapContainerStyle={{
        height: props.size.height,
        width: props.size.width,
      }}
      center={props.center}
      zoom={props?.zoom}
    >
      <MarkerF position={props.center} />
    </IGoogleMap>
  );
}
