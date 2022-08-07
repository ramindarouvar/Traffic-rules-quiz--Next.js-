export const calculateMistakes = (questions, userAnswers) => {
    var allMistakes = 0 ;
    var unAnswered = 0;
    for (const id in questions) {
        if(questions[id].rightAnswer !== Number(userAnswers[id-1].userAnswer) ){
        // allMistakes variable contain number of wrong user answers and unanswered questions.
            allMistakes = allMistakes + 1 ; 
        } 
        if(Number(userAnswers[id-1].userAnswer) === 0){
        // allMistakes variable contain only number of unanswered questions.
            unAnswered = unAnswered + 1 ;
        }
    }
    return [allMistakes, unAnswered];
}