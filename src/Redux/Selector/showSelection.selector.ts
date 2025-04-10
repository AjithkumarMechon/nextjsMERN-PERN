import { createSelector } from "reselect"

export const showSelectionSelector=createSelector((state)=>state.showSelection, (subState)=>subState.data);
export const showSelectionLoading=createSelector((state)=>state.showSelection, (subState)=>subState.loading??false);