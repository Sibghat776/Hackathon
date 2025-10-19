// src/app/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage use hoti hai
import userReducer from "../features/userSlice.js";

const rootReducer = combineReducers({
    userReducer,
});

const persistConfig = {
    key: "root",     // key name for storage
    storage,         // localStorage use karega
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Redux Persist me warning se bachne ke liye
        }),
});

export const persistor = persistStore(store);