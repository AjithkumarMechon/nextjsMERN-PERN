import { HTTP } from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchShowSelect=createAsyncThunk<any, any, { rejectValue: string}>("selectedShow/get", async(payload, thunkApi)=>{
    try {
        const responseData = await HTTP.doGet(`/api/showselect/${payload}`);
        return responseData.data;
    } catch (error:any) {
        return thunkApi.rejectWithValue(error);
    }
})