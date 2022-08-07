import {
    setUserAnswers,
    setUserState
} from "./userItems";

export const setUser = (currentUser) => (dispatch, getState) => {
    const user = currentUser;
    dispatch(setUserState(user));
}
export const addAnswer = (questionId, userAnswerOption) => (dispatch, getState) => {
    const state = getState();
    const userAnswers = [...state.userItems.userAnswers];
    const singleAnswer = {
        questionId: questionId,
        userAnswer: userAnswerOption
    }
    userAnswers.push(singleAnswer);
    dispatch(setUserAnswers(userAnswers));
}
export const updateAnswer = (questionId, userAnswerOption) => (dispatch, getState) => {
    const state = getState();
    var userAnswers = [...state.userItems.userAnswers];
    // update value to new answer
    userAnswers[questionId - 1] = {
        questionId: questionId,
        userAnswer: userAnswerOption
    }
    dispatch(setUserAnswers(userAnswers));
}