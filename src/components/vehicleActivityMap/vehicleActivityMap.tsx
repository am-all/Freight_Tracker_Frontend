import React, { FC, ReactElement } from 'react';
import { GoogleMap, LoadScript, Polyline, Marker } from '@react-google-maps/api';

import {Grid ,Typography } from '@material-ui/core';

import { useAppSelector } from '../../app/hooks';


import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      justifyContent:'center'
    }
  }),
);

const containerStyle = {
  width: '100%',
  height: '600px'
};

const PlaceInteractionForm: FC = (): ReactElement => {

  const classes = useStyles();

  const onLoad = (polyline:any) => {
    console.log('polyline: ', polyline)
  };

  const center = useAppSelector((state)=> state.locationList.start_point)

  const start_point = center;
  const end_point = useAppSelector((state)=> state.locationList.end_point)
  const path = useAppSelector((state)=> state.locationList.value);

  return (<>
    {path && path.length > 0 ? <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {path && path.length > 0 && <>
        <Marker position={start_point} icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"} />
        <Polyline onLoad={onLoad} path={path} options={{strokeColor: '#686868', geodesic: true}}/>
        <Marker position={end_point} icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"}/>
        </>
        }
      </GoogleMap>
    </LoadScript>:
    <Grid container className={classes.mainContainer}>
        <Typography variant="h5" component="h3">
            No Route Data
        </Typography>
    </Grid>
  }</>
  )
}
export default PlaceInteractionForm;
