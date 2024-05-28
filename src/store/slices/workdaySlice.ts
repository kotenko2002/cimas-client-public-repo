import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import workdayApi from "../../api/workdayApi";
import { WorkdayResponse } from "../../contracts/workdayTypes";

interface WorkdayState {
    workday: WorkdayResponse | null;
}

const initialState: WorkdayState = {
    workday: null
};

const workdaySlice = createSlice({
    name: 'workday',
    initialState,
    reducers: {
        setWorkday: (state, action: PayloadAction<WorkdayResponse | null>) => {
            state.workday = action.payload;
        },
        resetWorkday: (state) => {
            state.workday = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                workdayApi.endpoints.startWorkday.matchFulfilled,
                workdaySlice.caseReducers.setWorkday
            )
            .addMatcher(
                workdayApi.endpoints.getCurrentWorkday.matchFulfilled,
                workdaySlice.caseReducers.setWorkday
            )
            .addMatcher(
                workdayApi.endpoints.finishWorkday.matchRejected,
                workdaySlice.caseReducers.resetWorkday
            );
    }
});

export const { setWorkday, resetWorkday } = workdaySlice.actions;

export default workdaySlice.reducer;
