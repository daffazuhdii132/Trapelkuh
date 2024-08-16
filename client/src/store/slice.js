import { createSlice } from "@reduxjs/toolkit";
import apiHelper from "../helpers/apiHelper";

const initialState = {
  allData: [],
};
const fleetSlice = createSlice({
  name: "fleet",
  initialState,
  reducers: {
    getAllData: (state, actions) => {
      state.allData = actions.payload;
      // console.log(state.allData, "OAIDJNGIOLASNDF");
    },
  },
});
// console.log(fleetSlice.actions, "<ZZZZZZZZZZ[]zzzz>");
export const { getAllData } = fleetSlice.actions;

export default fleetSlice.reducer;

export const getData = () => {
  return async function (dispatch) {
    // console.log("MASOKKKKK");
    let { data } = await apiHelper({
      url: "/fleets",
      method: "get",
    });
    // console.log(data);
    dispatch(getAllData(data));
    // console.log(data);
  };
};
