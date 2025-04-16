import { createAsyncThunk } from "@reduxjs/toolkit";
import HTTP from "axios-crud-ajee";
import Cookies from "js-cookie";
let token:any ;

export const fetchDocumentList=createAsyncThunk<any,any,{ rejectValue: string }>("upload/Get", async(_, thunkApi)=>{
try {
    token= await Cookies.get("token");
    const response=await HTTP.doGet("/api/documentslist", token );
    return response.data;
} catch (error) {
    return thunkApi.rejectWithValue((error as Error)?.message)
}
})


export const uploadDocument=createAsyncThunk<any,any,{ rejectValue: string }>("upload/Post", async(payload, thunkApi)=>{
try {
    token= await Cookies.get("token");
    const response=await HTTP.doPost("/api/upload", token , payload);

    if(response.status===201){
       await thunkApi.dispatch(fetchDocumentList(null));
    }
    return response.data;
} catch (error) {
    return thunkApi.rejectWithValue((error as Error)?.message)
}
})

export const fetchDeleteList=createAsyncThunk<any,any,{ rejectValue: string }>("upload/Delete", async(filename, thunkApi)=>{
try {
    token= await Cookies.get("token");
    const response=await HTTP.doDelete(`api/documentDelete/id=<typeData>`.replace('<typeData>', encodeURIComponent(filename)), token );
      if(response.status===201){
       await thunkApi.dispatch(fetchDocumentList(null));
    }
    return response.data;
} catch (error) {
    return thunkApi.rejectWithValue((error as Error)?.message)
}
})
