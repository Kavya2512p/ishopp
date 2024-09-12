import { configureStore } from "@reduxjs/toolkit";
import AdminReducer from '../reducers/Admin'
import CartReducer from '../reducers/Cart'
import UserReducer from '../reducers/User'

const store = configureStore(
    {
        reducer:{
            "admin": AdminReducer,
            "cart": CartReducer,
            "user": UserReducer
        }
    }
)

export default store;