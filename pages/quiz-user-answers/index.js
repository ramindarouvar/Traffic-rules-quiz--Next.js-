import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { allQuestions, allUserAnswers, quizDone } from '../../redux/store';
import Link from 'next/link';
import { useRouter } from 'next/router';

const AnswersAndOptions = () => {
    const router = useRouter();
    const questions = useSelector(allQuestions);
    const userAnswers = useSelector(allUserAnswers);
    // when quiz done set it true
    const quizEnded = useSelector(quizDone);

    useEffect(() => {
        // go to top of the page
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    },[])
    useEffect(() => {
        // If the exam is not over, redirect to the first page
        if(!quizEnded) 
            router.replace("/");
    },[quizEnded])
   

    if(quizEnded) return ( 
        <div className="quiz-section border rounded w-100">
            <h2 className="text-center text-white bg-dark py-3 mb-0">برگه تصحیح شده</h2>
            <div className="text-center sticky-top mb-5">
                <Link href="/quiz-result" passHref>
                    <a className="btn back-to-result text-white border-top-0">
                        بازگشت به صفحه کارنامه
                    </a>
                </Link>
            </div>
            {Object.keys(questions).map(questionId => {
                var question = questions[questionId];
                if(question.imageUrl===""){
                    // If the question does not have an image.
                    return(
                            <div id="question" key={questionId} className="row h-100 py-3 px-3 px-md-5 mt-2 mb-3">
                                <div className="col-12 d-flex flex-column border-bottom">
                                    <h4 className="font-weight-bold pb-2">{`${question.id} : ${question.text}`}</h4>
                                    <div className="options mr-1 flex-fill row justify-content-around ml-2 pr-3">
                                        { // load and show each option content *
                                            Object.keys(question.options).map(optionId => {
                                                return(
                                                    <label key={`${questionId}${optionId}`} className="option col-12 col-md-6 my-2" htmlFor={`option-${optionId}`}>
                                                        <span className="">
                                                            {optionId})&nbsp; 
                                                            {question.options[optionId].text}
                                                            {question.options[optionId].optionImageUrl === "" 
                                                                ? 
                                                                    null 
                                                                        : 
                                                                    <img className="img-thumbnail" src={question.options[optionId].optionImageUrl} alt="answer-option"/>
                                                            }
                                                        </span>
                                                            {(optionId === userAnswers[questionId-1].userAnswer ? 
                                                                (Number(optionId) === question.rightAnswer ? 
                                                                    <span className="badge badge-success badge-pill mr-2"><i className="fa fa-check-circle" aria-hidden="true"></i> پاسخ شما ({Number(optionId)})</span>
                                                                    : 
                                                                    <span className="badge badge-danger badge-pill mr-2"><i className="fa fa-times" aria-hidden="true"></i> پاسخ شما ({Number(optionId)})</span>)
                                                                : (Number(optionId) === question.rightAnswer ? 
                                                                        <span className="badge badge-secondary badge-pill mr-2"><i className="fa fa-check-circle" aria-hidden="true"></i> گزینه درست ({Number(optionId)})</span>
                                                                        :
                                                                        null
                                                                )
                                                            )}
                                                    </label> 
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div> 
                    ); 
                }
                else {
                    // If the question does has an image.
                    return ( 
                        <div id="question" key={questionId} className="row h-100 py-3 px-3 px-md-5 mt-2 mb-3">
                            <div className="col-md-8 d-flex flex-column">
                                <h4 className="font-weight-bold pb-2">{`${question.id} : ${question.text}`}</h4>
                                <div className="options mr-4 flex-fill d-flex flex-column justify-content-around ml-2 pr-3">
                                    {// loading and showing each answer option content
                                        Object.keys(question.options).map(optionId => {
                                                return(
                                                    <label key={`${questionId}${optionId}`} className="option mb-1" htmlFor={`option-${optionId}`}>
                                                        <span>
                                                            {optionId})&nbsp; 
                                                            {question.options[optionId].text}
                                                            {question.options[optionId].optionImageUrl === "" 
                                                                ? 
                                                                null 
                                                                    : 
                                                                // Show image in reply option if available 
                                                                <img className="img-thumbnail" src={question.options[optionId].optionImageUrl} alt="answer-option"/>
                                                            }
                                                        </span>
                                                        {(optionId === userAnswers[questionId-1].userAnswer ? 
                                                            (Number(optionId) === question.rightAnswer ? 
                                                                <span className="badge badge-success badge-pill mr-2"><i className="fa fa-check-circle" aria-hidden="true"></i> پاسخ شما ({(Number(optionId))})</span>
                                                                : 
                                                                <span className="badge badge-danger badge-pill mr-2"><i className="fa fa-times" aria-hidden="true"></i> پاسخ شما ({(Number(optionId))})</span>)
                                                            : (Number(optionId) === question.rightAnswer ? 
                                                                    <span className="badge badge-secondary badge-pill mr-2"><i className="fa fa-check-circle" aria-hidden="true"></i> گزینه درست ({(Number(optionId))})</span>
                                                                    :
                                                                    null
                                                            )
                                                        )}
                                                    </label> 
                                                )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="col-md-4 text-center text-md-right question-image mt-4 mx-auto mx-md-0 text-center border-bottom">
                                {question.imageUrl === "" 
                                    ? 
                                    null 
                                    : 
                                    // Show the image in question
                                    <img src={question.imageUrl} className="rounded border" alt="option"/>
                                }
                            </div>
                        </div>
                    );
                }
            })
            }
        </div>
     );
}
 
export default AnswersAndOptions;