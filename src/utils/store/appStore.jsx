import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/es/storage/session";

import userReducer from "../slice/userSlice";
import moviesReducer from "../slice/movieSlice";
import typeIdReducer from "../slice/TypeIdSlice";
import detailsReducer from "../slice/detailInfoSlice";
import gptInfoReducer from "../slice/gptSlice";

const persistConfig = {
    key: "root",
    storage: storageSession,
    blacklist:["movies"],
};

const rootReducer = combineReducers({
    user: userReducer,
    movies:  moviesReducer,
    typeId:typeIdReducer,
    details: detailsReducer,
    info : gptInfoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const  appStore = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(appStore);

/* const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    typeId : typeIdReducer,
  },
});

export default appStore; */