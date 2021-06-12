import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Vehicle {
    license: String;
    date_time: String;
    lat: Number;
    lng: Number;
}

export interface VehicleListState {
    value: Array<Vehicle>;
    start_tis: String;
    end_tis: String;
    modal_display:boolean;
    rows_per_page:number;
    page:number;
}

const initialState: VehicleListState = {
    value: [],
    start_tis:'',
    end_tis:'',
    modal_display:false,
    rows_per_page:10,
    page:0
};


export const vehicleListSlice = createSlice({
    name: 'vehicleList',
    initialState,
    reducers: {
        addData: (state, action: PayloadAction<Array<Vehicle>>) => {
            state.value = action.payload;
        },

        setStartTis: (state, action: PayloadAction<String>) => {
            state.start_tis = action.payload;
        },

        setEndTis: (state, action: PayloadAction<String>) => {
            state.end_tis = action.payload;
        },
        setModalDisplay: (state, action: PayloadAction<boolean>) => {
            state.modal_display = action.payload;
        },
        setRowsPerPage: (state, action: PayloadAction<number>) => {
            state.rows_per_page = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        }

    },
});

export const { 
    addData, 
    setStartTis, 
    setEndTis,
    setModalDisplay,
    setRowsPerPage, 
    setPage 
} = vehicleListSlice.actions;

export default vehicleListSlice.reducer;
