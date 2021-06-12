import React, { FC, ReactElement } from 'react';
import VehicleActivityForm from '../../components/vehicleActivityForm/vehicleActivityForm';
import VehicleActivityMap from '../../components/vehicleActivityMap/vehicleActivityMap';

import { Container, Grid, Typography, Backdrop, CircularProgress } from '@material-ui/core';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { useAppSelector } from '../../app/hooks'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      padding: theme.spacing(1)
    },
    backdrop: {
     zIndex: theme.zIndex.drawer + 1,
     color: '#fff',
   }
  }),
);


const PlaceInteraction: FC = (): ReactElement => {
     const classes = useStyles();

     const open = useAppSelector((state) => state.locationList.modal_display);

     return (
          <>
               <Container maxWidth={'lg'}>
                    <Grid container className={classes.mainContainer} >
                         <Typography variant="h5" component="h3">
                              Vehicle Activity
                         </Typography>
                    </Grid>
                    <Grid container direction="row" justify="center" alignContent="center" className={classes.mainContainer} >
                         <VehicleActivityForm />
                    </Grid>
                    <Grid container direction="column" justify="center" alignContent="center" className={classes.mainContainer} >
                         <VehicleActivityMap />
                    </Grid>
               </Container>
               <Backdrop className={classes.backdrop} open={open}>
                    <CircularProgress color="inherit" />
               </Backdrop>
          </>
     );
}

export default PlaceInteraction;
