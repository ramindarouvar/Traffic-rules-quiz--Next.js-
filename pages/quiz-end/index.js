import { useState , useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setClearCurrentQuestion } from '../../redux/quizItems/quizItems';
import { quizDone } from '../../redux/store';
import { useRouter } from 'next/router';

const QuizEnd = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    // when quiz done set it true
    const quizEnded = useSelector(quizDone);
    const dispatch = useDispatch()

    useEffect(() => {
        // go to top of the page
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        dispatch(setClearCurrentQuestion());
        setTimeout(() => {
            // After 1000 milliseconds, set the loading state to "false" to render the result component
            setLoading(false);
        }, 1000);
    },[]);

    useEffect(() => {
        if(!loading) router.replace('/quiz-result');
        // If the exam is not over, redirect to the first page
        if(!quizEnded) router.replace("/");
    },[loading, quizEnded]);

    if(loading) return ( 
        <div className="quiz-section border rounded w-100">
            {/* {loading ?  */}
                {/* // show spinner for 1500 milliseconds */}
                    <div className="text-center py-5" style={{height: "400px"}}>
                        <div className="mt-5">
                            <div class="spinner-border text-info p-5" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                        <span className="h2 text-info mt-2">محاسبه نمره ...</span>
                    </div>
                {/* // : */}
                {/* // then show result component */}
                {/* // <Redirect to="/quiz-result" /> */}
            {/* } */}
        </div>
     );
}
 
export default QuizEnd;
