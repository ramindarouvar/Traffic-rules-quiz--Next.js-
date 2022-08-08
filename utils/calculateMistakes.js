export const calculateMistakes = (questions, userAnswers) => {
    // all mistakes is (userMistakes + unAnswered)
    var allMistakes = 0 ;
    var mistakes = 0 ;
    var unAnswered = 0;
    for (const id in questions) {
        if(
            questions[id].rightAnswer !== Number(userAnswers[id-1].userAnswer)
            && Number(userAnswers[id-1].userAnswer !== 0)
        ){
        // allMistakes variable contain number of wrong user answers and unanswered questions.
            mistakes = mistakes + 1 ; 
        } 
        if(Number(userAnswers[id-1].userAnswer) === 0){
        // allMistakes variable contain only number of unanswered questions.
            unAnswered = unAnswered + 1 ;
        }
    }

    allMistakes = mistakes + unAnswered;

    return [mistakes, allMistakes, unAnswered];
}