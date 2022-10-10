import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./wishlist.jsx";
import cartReducer from "./cartRedux.jsx";
import userReducer from "./userReducer.jsx";


export default configureStore({
    reducer : {
        cart : cartReducer,
        counter: counterReducer,
        user: userReducer,

    },
});

