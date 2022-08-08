import {
    createSlice
} from "@reduxjs/toolkit";
import questionsJson from "../../questionsJson/questions.json"

const initialState = {
    questions: questionsJson,
    currentQuestion: {},
    quizEnded: false,
}
export const quizItems = createSlice({
    name: "quizItems",
    initialState,
    reducers: {
        setQuestions: (state, action) => {
            state.questions = {...action.payload};
        },
        setCurrentQuestion: (state, action) => {
            state.currentQuestion = {...action.payload};
        },
        setClearCurrentQuestion: (state, action) => {
            state.currentQuestion = {...action.payload};
        },
        setQuizEnded: (state, action) => {
            state.quizEnded = action.payload;
        },
    }
});

export const {
    setQuestions,
    setCurrentQuestion,
    setClearCurrentQuestion,
    setQuizEnded,
} = quizItems.actions;

export default quizItems.reducer;