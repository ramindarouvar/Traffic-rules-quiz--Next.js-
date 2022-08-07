import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import ReactTooltip from 'react-tooltip';
import { calculateMistakes } from './../../utils/calculateMistakes';
import { allQuestions, allUserAnswers, currentUser } from '../../redux/store';
import { newQuiz } from '../../redux/quizItems/quizItemsThunk';
import { setUserAnswersClear } from '../../redux/userItems/userItems';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';

export async function getServerSideProps(context) {
    const questions = useSelector(allQuestions);
    const userAnswers = useSelector(allUserAnswers);
    // current user
    const cUser = useSelector(currentUser);
    return {
      props: {
          st: [questions, userAnswers, cUser]
      }, // will be passed to the page component as props
    }
  }
  

const Result = ({st}) => {
    console.log(st)
    // const router = useRouter();
    // const dispatch = useDispatch();
    // const questions = useSelector(allQuestions);
    // const userAnswers = useSelector(allUserAnswers);
    // // current user
    // const cUser = useSelector(currentUser);
    
    // // if(userAnswers.length !== Object.keys(questions).length && isEmpty(cUser)) 
    // //     return router.replace('/'); // از اینجا
    // // else if(userAnswers.length !== Object.keys(questions).length)
    // //     return router.replace('/quiz-questions');

    // // else{
    //     // calculate the count of all Mistakes(wrong + unanswered) and unanswered questions.
    //     var [allMistakes, unAnswered] = calculateMistakes(questions, userAnswers);
    //     // user passed the exm or not
    //     var passed = allMistakes <= 4 ? true : false ;
    //     // calculate results
    //     var trueAnswers = userAnswers.length - allMistakes;
    //     var trueAnswersPercentage = ((trueAnswers * 100) / userAnswers.length).toFixed(1) ;
    //     // only user mistakes without unanswered percentage
    //     var mistakesPercentage = (((allMistakes - unAnswered) * 100) / userAnswers.length).toFixed(1) ;
    //     // only unanswered percentage
    //     var unAnsweredPercentage = ((unAnswered * 100) / userAnswers.length).toFixed(1) ;
        
    //     useEffect(() => {
    //         // go to top of the page
    //         document.body.scrollTop = 50;
    //         document.documentElement.scrollTop = 50;
    //     },[])
    
    //     return (
    //         <div className="quiz-section border rounded w-100">
    //             <div className="result">
    //                 <div className="text-center">
    //                     {passed ? <img src="./images/success.svg" alt="seccess" style={{width: '10%'}}/> 
    //                                 :
    //                             <img src="./images/warning.svg" alt="seccess" style={{width: '10%'}}/>      
    //                     }
    //                 </div>
    //                 <div className="text-center pb-4">
    //                     شما در این آزمون {" "}
    //                     {passed ? 
    //                         <span className="success text-success">قبول</span>
    //                         : 
    //                         <span className="danger text-danger">مردود</span> 
    //                     }
    //                     {" "}
    //                     شدید.
    //                     <div className="small text-danger">(بیش از چهار غلط داشتید)</div> 
    //                 </div>
    //                 <div className="mx-auto">
    //                     <div className="result-bar progress mx-auto mb-2" style={{height: "2rem", width: "85%"}}>
    //                         <div className="progress-bar bg-success" style={{width: `${trueAnswersPercentage}%`, cursor:"default"}}
    //                              data-tip={`${trueAnswersPercentage}%  (درست)`}    
    //                              data-place="bottom" 
    //                              data-type="success"  
    //                              data-padding="200px 0"
    //                              data-html="true"
    //                         >
    //                             <ReactTooltip />
    //                             {trueAnswersPercentage}%  (درست)
    //                         </div>
    //                         <div className="progress-bar bg-danger" style={{width: `${mistakesPercentage}%`, cursor:"default"}}
    //                              data-tip={`${mistakesPercentage}%  (غلط)`}    
    //                              data-place="bottom" 
    //                              data-type="error"  
    //                              data-padding="200px 0"
    //                              data-html="true"
    //                         >
    //                             <ReactTooltip />
    //                             {mistakesPercentage}%  (غلط)
    //                         </div>
    //                         <div className="progress-bar no-answer" style={{width: `${unAnsweredPercentage}%`, cursor:"default"}}
    //                              data-tip={`${unAnsweredPercentage}% (بی پاسخ)`}  
    //                              data-place="bottom" 
    //                              data-type="dark"  
    //                              data-padding="200px 0"
    //                              data-html="true"
    //                         >
    //                             {unAnsweredPercentage}%  (بی پاسخ)
    //                             <ReactTooltip />
    //                         </div>  
    //                     </div>
    //                     <div className="result-information w-100 mt-2 mx-auto row justify-content-center">
    //                         <div className="quiz-user col-12 col-md-7 row align-content-start">
    //                             <div className="col-sm-5 col-md-12 mb-2 m-md-0"> نام: <span>{cUser.firstname}</span></div>
    //                             <div className="col-sm-7 col-md-12 mb-2 m-md-0"> نام خانوادگی: <span>{cUser.lastname}</span></div>
    //                             <div className="col-sm-12 col-md-12"> شماره ملی: <span>{cUser.id}</span></div>
    //                             <hr className="col-12 d-block d-md-none " />
    //                         </div>
    //                         <div className="quiz-statistics text-right my-2 my-2 mr-4 mr-md-0 col-12 col-md-5">
    //                             <p className=" ">
    //                                 تعداد کل سوالات: {userAnswers.length}
    //                             </p>
    //                             <p className=" text-success trueAnswers">
    //                                 <i className="fa fa-check" aria-hidden="true"></i>
    //                                 {" "}
    //                                     تعداد درست: {trueAnswers}
    //                             </p>
    //                             <p className=" text-danger falseAnswers">
    //                                 <i className="fa fa-times" aria-hidden="true"></i>
    //                                 {" "}
    //                                     تعداد اشتباه: {allMistakes}
    //                             </p> 
    //                             <p className=" text-muted unAnswered">
    //                                     <i className="fa fa-circle-o" aria-hidden="true"></i>
    //                                     {" "}
    //                                     تعداد بدون پاسخ: {unAnswered}
    //                             </p> 
                                
    //                         </div>
    //                         <div className="result-nav col-12 col-lg-9 text-center btn-group mb-1">
    //                             <Link href="/quiz-user-answers" passHref>
    //                                 <a  className="result-nav-link btn btn-info w-50 ">
    //                                     <i className="fa fa-list-alt" aria-hidden="true"></i>
    //                                     {" "}
    //                                         مشاهده برگه تصحیح شده
    //                                 </a>
    //                             </Link>
    //                             <Link href="/quiz-questions" passHref>
    //                                 <a  className="result-nav-link btn btn-warning w-50"
    //                                     onClick={() => {
    //                                         dispatch(setUserAnswersClear());
    //                                         dispatch(newQuiz());
    //                                     }}            
    //                                 >
    //                                     <i className="fa fa-refresh fa-2" aria-hidden="true"></i> 
    //                                     {" "} تکرار آزمون {" "}
    //                                 </a>
    //                             </Link>
    //                         </div>
    //                         <div className="result-nav col-12 col-lg-9 text-center">
    //                             <Link href="/" passHref>
    //                                 <a className="result-nav-link btn btn-success w-100">
    //                                     <i className="fa fa-plus-square-o" aria-hidden="true"></i>
    //                                     {" "}
    //                                     آزمون جدید
    //                                 </a>
    //                             </Link>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>        
    //      );
    // }
}
 
export default Result;