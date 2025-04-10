import { createSlice } from "@reduxjs/toolkit";
import { fetchShowSelect } from "../ActionThunk/selectionshow.action";

interface initialStateProps{
    loading:false;
    data:any;
    error:null;
}

const initialState={
    loading:false,
    data:[],
    error:null
}

export const ShowSelectSlice=createSlice({
    name:"showselect/get",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchShowSelect.pending, (state)=>{
            state.loading=true;
            state.data=[];
            state.error=null;
        }).addCase(fetchShowSelect.fulfilled, (state, action)=>{
            state.data=action.payload;
            state.loading=false;
        }).addCase(fetchShowSelect.rejected, (state, action)=>{
            state.error=(action as any)?.error?.message?? "Something went wrong!";
            state.loading=false
        })
    }
}).reducer;