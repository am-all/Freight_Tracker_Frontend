import React, { FC, ReactElement } from 'react';
import PlaceInteractionForm from '../../components/placeInteractionForm/placeInteractionForm';
import PlaceInteractionContentTable from '../../components/placeInteractionContentTable/placeInteractionContentTable';

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

     const open = useAppSelector((state) => state.vehicleList.modal_display);

     return (
          <>
               <Container maxWidth={'lg'}>
                    <Grid container className={classes.mainContainer} >
                         <Typography variant="h5" component="h3">
                              Place interactions
                         </Typography>
                    </Grid>
                    <Grid container direction="row" justify="center" alignContent="center" className={classes.mainContainer} xs={12}>
                         <PlaceInteractionForm />
                    </Grid>
                    <Grid container direction="column" justify="center" alignContent="center" className={classes.mainContainer} xs={12}>
                         <PlaceInteractionContentTable />
                    </Grid>
               </Container>
               <Backdrop className={classes.backdrop} open={open}>
                    <CircularProgress color="inherit" />
               </Backdrop>
          </>
     );
}

export default PlaceInteraction;
