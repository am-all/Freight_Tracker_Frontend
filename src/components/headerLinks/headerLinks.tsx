import { FC, ReactElement } from 'react';

import { Grid, Button } from '@material-ui/core';

import {NavLink} from "react-router-dom";


const HeaderLinks: FC = (): ReactElement => {

    return (
        <Grid container spacing={3}>
            <Grid item xs={6} sm={6}>
                <NavLink to='/place-interaction'>
                  <Button variant="outlined">
                    Place interaction
                  </Button>
                </NavLink>
            </Grid>
            <Grid item xs={6} sm={6}>
                <NavLink to='/vehicle-activity'>
                  <Button variant="outlined">
                    Vehicle Activity
                  </Button>
                </NavLink>
            </Grid>
        </Grid>
    )

}

export default HeaderLinks;
