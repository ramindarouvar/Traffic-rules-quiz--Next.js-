import { setCurrentQuestion, setQuizEnded } from "./quizItems";

export const getSingleQuestion = (questionId) => (dispatch, getState) => {
    const state = getState();
    const questions = state.quizItems.questions; 
    const question = questions[questionId];
    dispatch(setCurrentQuestion(question));
};
export const finishQuiz = () => (dispatch, getState) => {
    dispatch(setQuizEnded(true));
};
export const newQuiz = () => (dispatch, getState) => {
    dispatch(setQuizEnded(false));
};