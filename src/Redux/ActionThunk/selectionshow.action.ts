import { createAsyncThunk } from "@reduxjs/toolkit";
import HTTP from "axios-crud-ajee";
import Cookies from "js-cookie";
let token:any ;

export const fetchShowSelect=createAsyncThunk<any, any, { rejectValue: string}>("selectedShow/get", async(payload, thunkApi)=>{
    try {
        token= await Cookies.get("token");
        const responseData = await HTTP.doGet(`/api/showselect/${payload}`, token);
        return responseData.data;
    } catch (error:any) {
        return thunkApi.rejectWithValue(error);
    }
})