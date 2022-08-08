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
    var userAnswers = [...state.userItems.userAnswers];
    const singleAnswer = {
        questionId: questionId,
        userAnswer: userAnswerOption
    }
    userAnswers[questionId-1] = singleAnswer;
    dispatch(setUserAnswers(userAnswers));
}