import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import ReactTooltip from 'react-tooltip';
import { calculateMistakes } from './../../utils/calculateMistakes';
import { allQuestions, allUserAnswers, currentUser } from '../../redux/store';
import { newQuiz } from '../../redux/quizItems/quizItemsThunk';
import { setUserAnswersClear } from '../../redux/userItems/userItems';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';

const Result = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const questions = useSelector(allQuestions);
    const userAnswers = useSelector(allUserAnswers);
    // current user
    const cUser = useSelector(currentUser);

    const [results, setResults] = useState({
        mistakes: 0,
        allMistakes: 0,
        unAnswered: 0,
        passed: false,
        trueAnswers: 0,
        trueAnswersPercentage: 0,
        mistakesPercentage: 0,
        unAnsweredPercentage: 0,
    })

    useEffect(() => {
        // go to top of the page
        document.body.scrollTop = 50;
        document.documentElement.scrollTop = 50;
        // set result values
        // if(userAnswers.length == Object.keys(questions).length){
            // calculate the count of all Mistakes(wrong + unanswered) and unanswered questions.
            var [mistakes, allMistakes, unAnswered] = calculateMistakes(questions, userAnswers);
            // user passed the exm or not
            var passed = allMistakes <= 4 ? true : false ;
            // calculate results
            var trueAnswers = userAnswers.length - allMistakes;
            var trueAnswersPercentage = ((trueAnswers * 100) / userAnswers.length).toFixed(1) ;
            // only user mistakes without unanswered percentage
            var mistakesPercentage = ((mistakes * 100) / userAnswers.length).toFixed(1) ;
            // only unanswered percentage
            var unAnsweredPercentage = ((unAnswered * 100) / userAnswers.length).toFixed(1) ;
            // set resul state whith top values
            setResults({
               mistakes,
               allMistakes,
               unAnswered,
               passed,
               trueAnswers,
               trueAnswersPercentage,
               mistakesPercentage,
               unAnsweredPercentage,    
            })
        // }
    },[])
    useEffect(() => {
      if(isEmpty(cUser)) 
        router.replace('/');
    },[userAnswers])

    return (
       <div className="quiz-section border rounded w-100">
           <div className="result">
               <div className="text-center">
                   {results.passed ? <img src="./images/success.svg" alt="seccess" style={{width: '10%'}}/> 
                               :
                           <img src="./images/warning.svg" alt="seccess" style={{width: '10%'}}/>      
                   }
               </div>
               <div className="text-center pb-4">
                   ?????? ???? ?????? ?????????? {" "}
                   {results.passed ? 
                       <span className="success text-success">????????</span>
                       : 
                       <span className="danger text-danger">??????????</span> 
                   }
                   {" "}
                   ????????.
                   <div className="small text-danger">(?????? ???? ???????? ?????? (???? ???????? ????????) ????????????)</div> 
               </div>
               <div className="mx-auto">
                   <div className="result-bar progress mx-auto mb-2" style={{height: "2rem", width: "85%"}}>
                       <div className="progress-bar bg-success" style={{width: `${results.trueAnswersPercentage}%`, cursor:"default"}}
                             data-tip={`${results.trueAnswersPercentage}%  (????????)`}    
                             data-place="bottom" 
                             data-type="success"  
                             data-padding="200px 0"
                             data-html="true"
                       >
                           <ReactTooltip />
                           {results.trueAnswersPercentage}%  (????????)
                       </div>
                       <div className="progress-bar bg-danger" style={{width: `${results.mistakesPercentage}%`, cursor:"default"}}
                             data-tip={`${results.mistakesPercentage}%  (??????)`}    
                             data-place="bottom" 
                             data-type="error"  
                             data-padding="200px 0"
                             data-html="true"
                       >
                           <ReactTooltip />
                           {results.mistakesPercentage}%  (??????)
                       </div>
                       <div className="progress-bar no-answer" style={{width: `${results.unAnsweredPercentage}%`, cursor:"default"}}
                             data-tip={`${results.unAnsweredPercentage}% (???? ????????)`}  
                             data-place="bottom" 
                             data-type="dark"  
                             data-padding="200px 0"
                             data-html="true"
                       >
                           {results.unAnsweredPercentage}%  (???? ????????)
                           <ReactTooltip />
                       </div>  
                   </div>
                   <div className="result-information w-100 mt-2 mx-auto row justify-content-center">
                       <div className="quiz-user col-12 col-md-7 px-0 row align-content-start">
                           <div className="col-sm-5 col-md-12 mb-2 m-md-0"> ??????: <span>{cUser.firstname}</span></div>
                           <div className="col-sm-7 col-md-12 mb-2 m-md-0"> ?????? ????????????????: <span>{cUser.lastname}</span></div>
                           <div className="col-sm-12 col-md-12"> ?????????? ??????: <span>{cUser.id}</span></div>
                           <hr className="col-12 d-block d-md-none " />
                       </div>
                       <div className="quiz-statistics text-right my-2 my-2 mr-4 mr-md-0 col-12 col-md-5 px-0">
                           <p className=" ">
                               ?????????? ???? ????????????: {userAnswers.length}
                           </p>
                           <p className=" text-success trueAnswers">
                               <i className="fa fa-check" aria-hidden="true"></i>
                               {" "}
                                   ?????????? ????????: {results.trueAnswers}
                           </p>
                           <p className=" text-danger falseAnswers">
                               <i className="fa fa-times" aria-hidden="true"></i>
                               {" "}
                                   ?????????? ????????????: {results.mistakes}
                           </p> 
                           <p className=" text-muted unAnswered">
                                   <i className="fa fa-circle-o" aria-hidden="true"></i>
                                   {" "}
                                   ?????????? ???????? ????????: {results.unAnswered}
                           </p> 
                           
                       </div>
                       <div className='pb-3'>
                            <div className="result-nav text-center btn-group-vertical mb-1">
                                <Link href="/quiz-user-answers" passHref>
                                    <a  className="result-nav-link btn btn-info">
                                        <i className="fa fa-list-alt" aria-hidden="true"></i>
                                        {" "}
                                            ???????????? ???????? ?????????? ??????
                                    </a>
                                </Link>
                                <Link href="/quiz-questions" passHref>
                                    <a  className="result-nav-link btn btn-warning"
                                        onClick={() => {
                                            dispatch(setUserAnswersClear());
                                            dispatch(newQuiz());
                                        }}            
                                    >
                                        <i className="fa fa-refresh fa-2" aria-hidden="true"></i> 
                                        {" "} ?????????? ?????????? {" "}
                                    </a>
                                </Link>
                            </div>
                            <div className="result-nav text-center">
                                <Link href="/" passHref>
                                    <a className="result-nav-link btn btn-success w-100">
                                        <i className="fa fa-plus-square-o" aria-hidden="true"></i>
                                        {" "}
                                        ?????????? ????????
                                    </a>
                                </Link>
                            </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>        
     );
}
 
export default Result;