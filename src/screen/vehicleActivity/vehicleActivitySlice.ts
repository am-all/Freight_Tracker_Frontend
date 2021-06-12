import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface VehicleLocation {
    lat: Number;
    lng: Number;
}

export interface VehicleLocationState {
    value: Array<VehicleLocation>;
    licence_list:Array<any>,
    start_tis: String;
    end_tis: String;
    licence_no: String;
    start_point: Object;
    end_point: Object;
    modal_display:boolean;
}

const initialState: VehicleLocationState = {
    value:  [],
    start_tis:'',
    end_tis:'',
    licence_list:[],
    licence_no:'',
    start_point: {
        lat: 15.495075,
        lng: 73.8257916
    },
    end_point: {},
    modal_display:false
};


export const vehicleActivitySlice = createSlice({
    name: 'locationList',
    initialState,
    reducers: {
        addData: (state, action: PayloadAction<Array<VehicleLocation>>) => {
            state.value = action.payload;
            if(action.payload.length > 0){
                state.start_point = action.payload[0]; 
                state.end_point = action.payload[action.payload.length-1]; 
            }
        },

        setStartTis: (state, action: PayloadAction<String>) => {
            state.start_tis = action.payload;
        },

        setEndTis: (state, action: PayloadAction<String>) => {
            state.end_tis = action.payload;
        },
        setLicenceNo: (state, action: PayloadAction<any>) => {
            state.licence_no = action.payload;
        },
        setStartPoint: (state, action: PayloadAction<String>) => {
            state.start_point = action.payload;
        },
        setEndPoint: (state, action: PayloadAction<String>) => {
            state.end_point = action.payload;
        },
        setShowModal:(state, action: PayloadAction<boolean>) => {
            state.modal_display = action.payload;
        },
        setVehicleList:(state, action: PayloadAction<Array<any>>) => {
            state.licence_list = action.payload;
        }

    },
});

export const { 
    addData, 
    setStartTis, 
    setEndTis, 
    setLicenceNo, 
    setStartPoint, 
    setEndPoint, 
    setVehicleList,
    setShowModal 
} = vehicleActivitySlice.actions;

export default vehicleActivitySlice.reducer;
