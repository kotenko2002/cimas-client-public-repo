import { combineReducers, configureStore } from "@reduxjs/toolkit";
import errorHandlingMiddleware from "../api/middlewares/errorHandlingMiddleware";
import authAPI from "../api/authApi";
import authReducer from './slices/authSlice';
import workdayReducer from './slices/workdaySlice';
import cinemaApi from "../api/cinemaApi";
import hallApi from "../api/hallApi";
import filmApi from "../api/filmApi";
import workdayApi from "../api/workdayApi";
import sessionApi from "../api/sessionApi";
import productApi from "../api/productApi";
import ticketApi from "../api/ticketApi";
import reportApi from "../api/reportApi";
import userApi from "../api/userApi";

const rootReducer = combineReducers({
    [authAPI.reducerPath]: authAPI.reducer,
    [cinemaApi.reducerPath]: cinemaApi.reducer,
    [hallApi.reducerPath]: hallApi.reducer,
    [filmApi.reducerPath]: filmApi.reducer,
    [workdayApi.reducerPath]: workdayApi.reducer,
    [sessionApi.reducerPath]: sessionApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [ticketApi.reducerPath]: ticketApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
    workday: workdayReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false
            }).concat(
                authAPI.middleware,
                cinemaApi.middleware,
                hallApi.middleware,
                filmApi.middleware,
                workdayApi.middleware,
                sessionApi.middleware,
                productApi.middleware,
                ticketApi.middleware,
                reportApi.middleware,
                userApi.middleware,
                errorHandlingMiddleware
            )
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
