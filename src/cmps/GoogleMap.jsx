import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';

// const AnyReactComponent = ({ text }) => <div style={{fontSize:'40px'}}>{text}</div>;

export function GoogleMap() {

    const [map, setMap] = useState()
    const zoom = 11
    const coordinates = [ {lat:32.089870,
        lng:34.880451},{lat:32.085300,lng:34.781769},{lat:31.768318,lng:35.213711}
    ]

    function handleClick(e) {
        const { lat, lng } = e
        console.log(map);
        map.setCenter({ lat, lng })
    }

    const handleApiLoaded = (map, maps) => {
        setMap(map)
        coordinates.map(c=>new maps.Marker({
          position: c,
          map: map,
          title: "Marker"
        }));
      };

    useEffect(()=>{
        console.log(map);
    },[map])

    return (
        <div style={{ height: '50vh', width: '100%' }}>
            <GoogleMapReact 
                bootstrapURLKeys={{ key: "AIzaSyBr2M08iZivUJTxbCBbCdWJ5bO4gEs34MA" }}
                center={{lat:32.085300,
                lng:34.781769}}
                defaultZoom={zoom}
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                onClick={handleClick}
                yesIWantToUseGoogleMapApiInternals={true}
            >
                {/* <AnyReactComponent
                    lat={32.089870}
                    lng={34.880451}
                    text="🧸"
                />
                <AnyReactComponent
                    lat={32.085300}
                    lng={34.781769}
                    text="🧸"
                />
                <AnyReactComponent
                    lat={31.768318}
                    lng={35.213711}
                    text="🧸"
                /> */}
            </GoogleMapReact>
        </div>
    );
}