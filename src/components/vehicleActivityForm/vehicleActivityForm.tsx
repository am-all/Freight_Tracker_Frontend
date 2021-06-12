import React, { FC, ReactElement, useEffect } from 'react';
import axios from 'axios';

import { TextField, Button, Grid, Select, MenuItem, FormControl, InputLabel, Box } from '@material-ui/core';

import { useAppSelector, useAppDispatch } from '../../app/hooks'

import { addData, setStartTis, setEndTis, setVehicleList, setLicenceNo, setShowModal } from '../../screen/vehicleActivity/vehicleActivitySlice';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
      textAlign:'center'
    },
    selectEmpty: {
      margin: theme.spacing(2)
    },
  }),
);


const VehicleActivityForm: FC = (): ReactElement => {

    const dispatch = useAppDispatch();

    const classes = useStyles();

    const GetVehicleLicencenData = () => {
        dispatch(setShowModal(true));
        console.log(`${process.env.REACT_APP_NODE_BACKEND}/api/vehicle_licence_list`);
        axios.get(`${process.env.REACT_APP_NODE_BACKEND}/api/vehicle_licence_list`).then(response => {
            dispatch(setVehicleList(response.data.data));
            dispatch(setShowModal(false));
        })
            .catch(error => {
                throw error
            });
    }

    useEffect(() => {
        GetVehicleLicencenData();
    }, [])

    const GetPlaceInteractionData = (licence: String, start_tis: String, end_tis: String) => {

        dispatch(setShowModal(true));
        axios.get(`${process.env.REACT_APP_NODE_BACKEND}/api/vehicle_activity?licence=${licence}&start_tis=${start_tis}&end_tis=${end_tis}`).then(response => {
            let data = response.data.data.map((pos: any) => {
                return {
                    lat: Number(pos.lat),
                    lng: Number(pos.lng)
                }
            })
            dispatch(addData(data));
            dispatch(setShowModal(false));

        })
            .catch(error => {
                throw error
            });
    }



    const start_tis = useAppSelector((state) => state.locationList.start_tis);
    const end_tis = useAppSelector((state) => state.locationList.end_tis);
    const licence = useAppSelector((state) => state.locationList.licence_no);
    const licence_list = useAppSelector((state) => state.locationList.licence_list);

    return (
        <Grid container justify="center" spacing={3}>
            <Grid item xs={12} sm={6} md={3} spacing={3}>
                <FormControl className={classes.formControl} >
                    <InputLabel id="vehicle-licence-label">Licence no.</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={(event) => { dispatch(setLicenceNo(event.target.value)) }}>
                        {licence_list && licence_list.map((vehicle) => {
                            return <MenuItem value={vehicle.license}>{vehicle.license}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3} spacing={3}>
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
            <Grid item xs={12} sm={6} md={3} spacing={3}>
                <TextField error={start_tis > end_tis}
                    id="datetime-local"
                    label="End date"
                    type="datetime-local"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    helperText={start_tis > end_tis?"Incorrect date":""}
                    onChange={(event) => { dispatch(setEndTis(event.target.value)) }}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3} spacing={3}>
                <Button variant="contained" 
                disabled={!(start_tis !== '' && end_tis !== '' && start_tis < end_tis && licence !== "")} 
                color="primary" 
                style={{fontSize:'15px'}} 
                onClick={() => { GetPlaceInteractionData(licence, start_tis, end_tis) }}>
                Search
                </Button>
            </Grid>
        </Grid>
    );
}

export default VehicleActivityForm;
