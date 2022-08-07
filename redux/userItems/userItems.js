import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    user: {},
    userAnswers: [],
}
export const userItems = createSlice({
    name: "userItems",
    initialState,
    reducers: {
        setUserState: (state, action) => {
            state.user = {...action.payload};
        },
        setUserClear: (state, action) => {
            state.user = {};
        },
        setUserAnswers: (state, action) => {
            state.userAnswers = [...action.payload];
        },
        setUserAnswersClear: (state, action) => {
            state.userAnswers = [];
        },
    }
});

export const {
    setUserState,
    setUserClear,
    setUserAnswers,
    setUserAnswersClear,
} = userItems.actions;

export default userItems.reducer;