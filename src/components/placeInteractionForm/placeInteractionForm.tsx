import React, { FC, ReactElement } from 'react';
import axios from 'axios';

import { TextField, Button, Grid } from '@material-ui/core';

import { useAppSelector, useAppDispatch } from '../../app/hooks'

import { addData, setStartTis, setEndTis, setModalDisplay, setPage } from '../../screen/placeInteraction/placeInteractionSlice';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    "align-items-center": {
      textAlign:'center',
      alignSelf:'center'
    }
  })
);


const PlaceInteractionForm: FC = (): ReactElement => {

    const dispatch = useAppDispatch();

    const classes = useStyles();

    const GetPlaceInteractionData = (start_tis: String, end_tis: String) => {
        dispatch(setModalDisplay(true))
        dispatch(setPage(0));
        axios.get(`${process.env.REACT_APP_NODE_BACKEND}/api/place_interactions?start_tis=${start_tis}&end_tis=${end_tis}`).then(response => {
            dispatch(addData(response.data.data));
            dispatch(setModalDisplay(false));
        })
        .catch(error => {
            throw error
        });
    }

    const start_tis = useAppSelector((state) => state.vehicleList.start_tis);
    const end_tis = useAppSelector((state) => state.vehicleList.end_tis);

    return (
        <Grid container justify="flex-start" spacing={3} align-items-center>
            <Grid item xs={12} sm={4} alignContent={"center"} className={classes["align-items-center"]}>
                <TextField
                    id="datetime-local"
                    label="Start date"
                    type="datetime-local"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(event) => { dispatch(setStartTis(event.target.value)) }}
                />
            </Grid>

            <Grid item xs={12} sm={4} align-items-xs-center className={classes["align-items-center"]}>
                <TextField error={start_tis !== "" && start_tis >= end_tis}
                    id="datetime-local"
                    label="End date"
                    type="datetime-local"
                    helperText={start_tis > end_tis ? "Incorrect date" : ""}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(event) => { dispatch(setEndTis(event.target.value)) }}
                />
            </Grid>
            <Grid item xs={12} sm={4} alignContent={"center"} align-items-center className={classes["align-items-center"]}>
                <Button
                    variant="contained"
                    disabled={start_tis >= end_tis}
                    color="primary"
                    onClick={() => { GetPlaceInteractionData(start_tis, end_tis) }}
                >Search</Button>
            </Grid>
        </Grid>
    );
}

export default PlaceInteractionForm;

