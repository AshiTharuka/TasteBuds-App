import { createSlice } from "@reduxjs/toolkit";



 const counterSlice = createSlice({
  
  name: "counter",
   initialState : {
    quantity: 0,
  },
  reducers: {
    
    incrementByAmount: (state, action) => {
      
      state.quantity = action.payload
    },
  },
})


export const { incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;