import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    product: [],
    quantity: 0,
    total: 0,
  },
 
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.id = action.payload.id;
      //state.title = action.payload.title;
    //  state.price = action.payload.price;
      state.product.push(action.payload.product[action.payload.index]);
      //state.product.push(action.payload.product);
      //state.product.push(action.payload);
      state.total += action.payload.product[action.payload.index].price * action.payload.quantity;

      console.log("In redux")
      //console.log(action.payload.index.price)
     
  
    },

    
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;