import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import authAPI from "../../api/authApi";
import { AuthResponse, AuthUser } from "../../contracts/authTypes";
import { RootState } from "../store";

interface AuthState {
    isAuth : boolean;
    user: AuthUser;
}

const initialState: AuthState = {
    isAuth: false,
    user: {
        fullName: "",
        roles: []
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthResponse>) => {
            localStorage.setItem('token', action.payload.accessToken);

            state.isAuth = true;
            state.user =  action.payload.user;
        },
        logout: (state) => {
            localStorage.removeItem('token');

            state.isAuth = false;
            state.user = {
                fullName: "",
                roles: []
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authAPI.endpoints.login.matchFulfilled,
                authSlice.caseReducers.login
            )
            .addMatcher(
                authAPI.endpoints.refreshTokens.matchFulfilled,
                authSlice.caseReducers.login
            )
            .addMatcher(
                authAPI.endpoints.refreshTokens.matchRejected,
                authSlice.caseReducers.logout
            );
    },
});

export const selectRoles = (state: RootState) => state.auth.user.roles;

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
