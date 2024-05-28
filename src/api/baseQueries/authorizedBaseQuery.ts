import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { login, logout } from '../../store/slices/authSlice'
import { AuthResponse } from '../../contracts/authTypes';
import { resetWorkday } from '../../store/slices/workdaySlice';
import { BASE_URL } from '../../constants';

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        
        return headers
    }
});

const authorizedBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    const accessToken = localStorage.getItem('token');

    if (result.error?.status === 401 && accessToken) {
        const refreshResult = await baseQuery({
            url: '/auth/refresh-tokens',
            method: 'POST',
            body: {
                accessToken: accessToken
            }
        }, api, extraOptions) as { data: AuthResponse | undefined };

        if (refreshResult.data) {
            api.dispatch(login(refreshResult.data));
            
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logout())
            api.dispatch(resetWorkday())
        }
    }

    return result
};

export default authorizedBaseQuery;
