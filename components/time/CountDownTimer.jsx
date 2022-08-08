import { useState, useEffect } from 'react';
import { calculateRemainingTime } from './../../utils/calculateRemainingTime';
import { useDispatch, useSelector } from 'react-redux';
import { quizDone } from '../../redux/store';
import { finishQuiz } from '../../redux/quizItems/quizItemsThunk';
import { useRouter } from 'next/router';

const CountDownTimer = ({replyingDeadline}) => {
    const router = useRouter();
    const quizEnded = useSelector(quizDone);
    const dispatch = useDispatch();
    // If the response time minutes are single digits, display them in double digits (with zero on the back)
    if (replyingDeadline < 10) replyingDeadline = "0" + replyingDeadline;
    const [remainingTime, setRemainingTime] = useState(`${replyingDeadline}:00`)
    // Get the current time and put in the start time
    const [startTime,] = useState(Date.now());
    // Calculate the end point of the response time
    const [endTime,] = useState(startTime + replyingDeadline * 60 * 1000);

    useEffect(() => {
        setTimeout(() => {
            // updating remaining time every second
            setRemainingTime(calculateRemainingTime(endTime));
        }, 1000);
        if(remainingTime === "پایان زمان آزمون"){
            alert("زمان شما به پایان رسید")
            dispatch(finishQuiz())
        }
    })
    useEffect(() => {
        // Redirect to the exam end page If the response time is over. 
        if(quizEnded) router.replace("/quiz-end");
    },[quizEnded])
    
    return ( 
        <div className="text-center">
            <div id="countDownTimer"
                className={remainingTime === "پایان زمان آزمون" ? 
                "countDownTimer rounded-bottom bg-danger d-block d-md-inline-block px-2 text-white mx-auto"
                : 
                "countDownTimer rounded-bottom d-block d-md-inline-block px-2 text-white mx-auto"}
            >
                {remainingTime}
            </div>
        </div>
     );
}
 
export default CountDownTimer;