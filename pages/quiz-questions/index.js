import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import Question from './../../components/quiz/Question';
import QuizNav from './../../components/quiz/QuizNav';
import CountDownTimer from './../../components/time/CountDownTimer';
import { finishQuiz } from '../../redux/quizItems/quizItemsThunk';
import { allUserAnswers, currentUser, quizDone } from '../../redux/store';
import { useRouter } from 'next/router';

const Questions = () => {
    const router = useRouter();
    const [questionId, setQuestionId] = useState(1);
    const userAnswers = useSelector(allUserAnswers);
    // current user
    const cUser = useSelector(currentUser);
    // when quiz done set it true
    const quizEnded = useSelector(quizDone)
    const dispatch = useDispatch()
    
    useEffect(() => {
        // go to top of the page
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    },[])

    const handleQuestionChange = (questionNumber) => {
        if(30 >= questionNumber)
            // Set the ID of the new question for rendering 
            setQuestionId(questionNumber);
        // end of quiz
        if(30 < questionNumber){
            // set quizEnded true(in store)
            dispatch(finishQuiz())
        }
    }
    // This page will be rendered only if the user has filled in the start form, otherwise it will be redirected to the data entry page 
    if(isEmpty(cUser)) router.replace('/');

    if(quizEnded === true) router.replace('/quiz-end');
    else{
        return (
            <div className="quiz-section border rounded w-100">
                <form className="question h-100" id="questionForm" onSubmit = {e => e.preventDefault()}>
                    {/* countdown timer component for showing remaining time */}
                    <CountDownTimer replyingDeadline={20}/>
                    {/* navigation for change questions */}
                    <QuizNav onQuestionChange={handleQuestionChange} questionId={questionId}/>
                    {/* render each question */}
                    <Question key={`q${questionId}`} questionId={questionId}/>
                </form>
            </div>
         );
    }
}
 
export default Questions;