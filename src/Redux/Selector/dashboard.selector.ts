import { createSelector } from "reselect";

export const getDashboard= createSelector((state)=>state.dashboard.getDashboard, (subState)=>subState?.data??[]);
export const postDashboard= createSelector((state)=>state.dashboard.postDashboard, (subState)=>subState?.data??[]);
export const getDashboardLoading= createSelector((state)=>state.dashboard.getDashboard, (subState)=>subState?.loading??false);