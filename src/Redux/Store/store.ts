import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { dashboardPostSlice, dashboardSlice } from "../Reducer/dashboard.reducer";
import { deleteListSlice, getDocumentDownloadSlice, uploadDocumentSlice } from "../Reducer/document.reducer";
import { ShowSelectSlice } from "../Reducer/showSelect.reducer";

const store=configureStore({
    reducer: {
            dashboard:combineReducers({
                postDashboard: dashboardPostSlice.reducer,
                getDashboard: dashboardSlice.reducer,
            }),
            showSelection:ShowSelectSlice,
            documentData:combineReducers({
                uploaded:uploadDocumentSlice.reducer,
                downloaded:getDocumentDownloadSlice.reducer,
                deleteFile:deleteListSlice.reducer
        })
    }    
})
export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch