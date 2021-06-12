import React, { FC, ReactElement } from 'react';
import { GoogleMap, LoadScript, Polyline,Polygon, Marker } from '@react-google-maps/api';

import { useAppSelector } from '../../app/hooks';

const containerStyle = {
  width: '100%',
  height: '600px'
};

const p_path = [{ 
  lng:73.5598715332623 ,
  lat:18.7128121962049
},
{ 
  lng:73.7795980957623 ,
  lat:18.858427375322 
},
{ 
  lng:74.0817221191998 ,
  lat:18.8298343351168
},
{ 
  lng:74.1805990723248 ,
  lat:18.6633784989781 
},
{ 
  lng:74.2575033691998 ,
  lat:18.4420517762916
},
{ 
  lng:74.2025717285748 ,
  lat:18.2569599275397 
},
{ 
  lng:74.0460165527935 ,
  lat:18.1030009147098
},
{ 
  lng:73.743892529356 ,
  lat:18.0272764656119 
},
{ 
  lng:73.568111279356 ,
  lat:18.074281691122
},
{ 
  lng:73.4774740723248 ,
  lat:18.2100037896017 
},
{ 
  lng:73.3538778809185 ,
  lat:18.4733152757346
},
{ 
  lng:73.4088095215435 ,
  lat:18.6659806320587
},
{ 
  lng:73.5598715332623 ,
  lat:18.7128121962049
}];

const PlaceInteractionForm: FC = (): ReactElement => {

  const onLoad = (polyline:any) => {
    console.log('polyline: ', polyline)
  };

  const center = useAppSelector((state)=> state.locationList.start_point)

  const start_point = center;
  const end_point = useAppSelector((state)=> state.locationList.end_point)
  const path = useAppSelector((state)=> state.locationList.value);
  console.log(path,end_point,start_point);
console.log(process.env.REACT_APP_GOOGLE_MAP_KEY)
  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {/* {path && path.length > 0 && <> */}
        {/* {p_path && p_path.length > 0 && <>
        <Marker position={start_point} icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"} />
        <Polyline onLoad={onLoad} path={path} options={{strokeColor: '#686868', geodesic: true}}/> */}
        <Polygon
            // Make the Polygon editable / draggable
            
            draggable
            path={p_path}
            // Event used when manipulating and adding points
            onLoad={onLoad}
          />
        {/* <Marker position={end_point} icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"}/> */}
        {/* </> */}
        {/* } */}
      </GoogleMap>
    </LoadScript>
  )
}
export default PlaceInteractionForm;
