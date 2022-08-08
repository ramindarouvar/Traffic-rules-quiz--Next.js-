import {
    createSlice
} from "@reduxjs/toolkit";

// first user answers array whith zero values
const answersArrayInit = userAnswersInitialState();

const initialState = {
    user: {},
    userAnswers: answersArrayInit,
}
function userAnswersInitialState() {
    const answersArray = []
    for (let index = 0; index < 30; index++) {
        answersArray.push({
            questionId: index+1,
            userAnswer: 0
        })
    }
    console.log(answersArray);
    return answersArray;
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
            state.userAnswers = [...answersArrayInit];
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