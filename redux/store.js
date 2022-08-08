import {
    combineReducers,
    configureStore
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import quizItems from './quizItems/quizItems';
import userItems from './userItems/userItems';

const rootReducer = combineReducers({
    quizItems,
    userItems,
})

export const store = configureStore({
            reducer: rootReducer,
            middleware: [thunk]
        },
    );

// states;
// auiz items
export const allQuestions = (state) => state.quizItems.questions;
export const question = (state) => state.quizItems.currentQuestion;
export const quizDone = (state) => state.quizItems.quizEnded;

// user items
export const currentUser = (state) => state.userItems.user;
export const allUserAnswers = (state) => state.userItems.userAnswers;