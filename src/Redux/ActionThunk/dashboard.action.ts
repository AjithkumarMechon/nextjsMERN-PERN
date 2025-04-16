import { createAsyncThunk } from "@reduxjs/toolkit";
import HTTP from "axios-crud-ajee";
import Cookies from "js-cookie";
let token:any ;

export const fetchDashboard=createAsyncThunk("dashboard/Get", async(_, thunkApi)=>{
try {
    token= await Cookies.get("token");
    const response = await HTTP.doGet("/api/dashboard", token);

    // const response=await HTTP.doGet('/api/dashboard');
    return response.data;
} catch (error) {
    return thunkApi.rejectWithValue((error as Error)?.message)
}
})


export const createDashboard=createAsyncThunk<any,any,{ rejectValue: string }>("dashboard/Post", async(payload, thunkApi)=>{
try {
    token= await Cookies.get("token");
    const response=await HTTP.doPost("/api/dashboard", token , payload);
    return response.data;
} catch (error) {
    return thunkApi.rejectWithValue((error as Error)?.message)
}
})

