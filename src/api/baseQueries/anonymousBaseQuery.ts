import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../constants';

const anonymousBaseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include'
});

export default anonymousBaseQuery;
