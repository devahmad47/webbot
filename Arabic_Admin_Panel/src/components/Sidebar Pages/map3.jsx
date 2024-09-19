import React, { useState } from 'react'

import {
    GoogleMap, useJsApiLoader, Marker,
} from '@react-google-maps/api';
const mapAPiKey = process.env.REACT_APP_GOOGLE_MAP_KEY



function MyComponent(props) {

    const { latitude, longitude, setDoor } = props
    const [location, setLocation] = useState({ latitude, longitude });
    const [map, setMap] = useState(null)


    const containerStyle = {
        width: '95%',
        height: '400px'
    };

    const center = {
        lat: location.latitude,
        lng: location.longitude
    };
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: mapAPiKey
    })

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)

    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)

    }, [])

    const onMapClick = (e) => {
        console.log("Latitude:", [e.latLng.lat()]);
        console.log("Longitude:", [e.latLng.lng()]);

        setLocation((pre) => ({ ...pre, latitude: e.latLng.lat(), longitude: e.latLng.lng() }))
        setDoor((pre) => ({ ...pre, latitude: e.latLng.lat(), longitude: e.latLng.lng() }))

    };


    return isLoaded ? (<div>
       
        <GoogleMap

            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onClick={onMapClick}
            onUnmount={onUnmount}

            options={{
                mapTypeId: 'satellite',
            }}

        >

            < Marker position={center} />

        </GoogleMap >
    </div>
    ) : <div>loading...</div>
}



export default React.memo(MyComponent)