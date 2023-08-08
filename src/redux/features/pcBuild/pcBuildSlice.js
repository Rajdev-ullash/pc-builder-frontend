import { createSlice } from "@reduxjs/toolkit";

const pcBuildSlice = createSlice({
  name: "pcBuild",
  initialState: {
    pcBuild: [],
    loading: false,
    error: null,
  },
  reducers: {
    pcBuildRequest: (state, action) => {
      //add the payload to the state
      //only one category has to be selected one item
      const existingItem = state.pcBuild.find(
        (item) => item.category === action.payload.category
      );
      if (existingItem) {
        //if the item already exists in the state then replace it with the new one
        state.pcBuild = state.pcBuild.map((item) =>
          item.category === action.payload.category ? action.payload : item
        );
      } else {
        state.pcBuild.push(action.payload);
      }
    },
  },
});

export const { pcBuildRequest } = pcBuildSlice.actions;
export default pcBuildSlice.reducer;
