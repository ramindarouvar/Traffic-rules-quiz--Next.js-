import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { allUserAnswers, question } from '../../redux/store';
import { getSingleQuestion } from './../../redux/quizItems/quizItemsThunk';
import { addAnswer } from './../../redux/userItems/userItemsThunk';

const Question = ({questionId}) => {
    const dispatch = useDispatch()
    // get current question from store after dispatching in useEffect
    const currentQuestion = useSelector(question)
    const [answer, setAnswer] = useState(0)
    // get user answers array from store
    const userAnswers = useSelector(allUserAnswers);
    
    useEffect(() => {
        // action for get specified current question
        dispatch(getSingleQuestion(questionId));
    },[])
    useEffect(() => {
        // If this is the first time the user has answered this question
        if( answer !== 0 
            && (
                // if user answered (first answer)
                userAnswers[questionId-1].userAnswer === 0
                // if user changed the answer 
                || answer !== userAnswers[questionId-1].userAnswer
                )
            ){
            // add answer
            dispatch(addAnswer(questionId, answer));
        }
    })
    
    const handleAnswering = event => {
        // update answer state with entered option value
        setAnswer(event.target.value);
    }
    // For the first rendering that has not yet received the content of the question from the store, return the null to avoid rendering errors
    if(isEmpty(currentQuestion)) {
        return null;
    }
    // After receiving the question from the store 
    else {
        if(currentQuestion.imageUrl===""){  
            // If the question does not have an image.
            return(
                    <div id="question" key={questionId} className="row h-100 py-3 px-3 px-sm-5 mt-2 mb-3" style={{minHeight: "300px"}}>
                        <div className="col-12 d-flex flex-column">
                            <h4 className="font-weight-bold pb-2 mb-4 text-center">{`${currentQuestion.id} : ${currentQuestion.text}`}</h4>
                            <div className="options mr-1 flex-fill row justify-content-around ml-2 pr-3 text-center">
                                { // loading and showing each answer option content
                                    Object.keys(currentQuestion.options).map(optionId => {
                                        return(
                                            <label key={`${questionId}${optionId}`} className="option col-12 col-sm-6 my-2" htmlFor={`option-${optionId}`}>
                                                <div className="position-relative d-inline-block">
                                                    <input type="radio" id={`option-${optionId}`} name="options" className="d-none" 
                                                            value={Number(optionId)}
                                                            onChange = {e => handleAnswering(e)}
                                                            style={{border: '3px solid black'}}
                                                    />
                                                        <span className={userAnswers.length >= questionId 
                                                                            // If the question has already been answered, make the color inside the circle blue
                                                                                ? 
                                                                            (userAnswers[questionId-1].userAnswer === optionId ? 
                                                                                "checkmark option-hover selected-option bg-primary"
                                                                                : "checkmark option-hover"
                                                                            )
                                                                            : "checkmark option-hover"
                                                                        }
                                                        >
                                                        </span>
                                                </div>
                                                <span className="option-hover">
                                                    {optionId})&nbsp; 
                                                    {currentQuestion.options[optionId].text}
                                                    {currentQuestion.options[optionId].optionImageUrl === "" 
                                                        ? 
                                                            null 
                                                                : 
                                                            // Show image in reply option if available 
                                                            <img className="img-thumbnail" src={currentQuestion.options[optionId].optionImageUrl} alt="answer-option" />
                                                    }
                                                </span>
                                            </label>    
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
            )   
        }
        else {
            // If the question has an image.
            return ( 
                <div id="question" key={questionId} className="row h-100 py-3 px-3 px-sm-5 mt-2 mb-3" style={{minHeight: "300px"}}>
                    <div className="col-sm-8 d-flex flex-column">
                        <h4 className="font-weight-bold pb-2 mb-4">{`${currentQuestion.id} : ${currentQuestion.text}`}</h4>
                        <div className="options mr-4 flex-fill d-flex flex-column justify-content-around ml-2 pr-3">
                            {// loading and showing each answer option content
                                Object.keys(currentQuestion.options).map(optionId => {
                                    return(
                                        <label key={`${questionId}${optionId}`} className="option mb-1" htmlFor={`option-${optionId}`}>
                                            <div className="position-relative d-inline-block">
                                                {/* Main radio button (not displayed) */}
                                                <input type="radio" id={`option-${optionId}`} name="options" className="d-none" 
                                                        value={Number(optionId)}
                                                        onChange = {e => handleAnswering(e)}
                                                        style={{border: '3px solid black'}}
                                                />
                                                {/* The custom button radio button element that is displayed */}
                                                <span className={userAnswers.length >= questionId ?
                                                                    // If the question has already been answered, make the color inside the circle blue
                                                                    (userAnswers[questionId-1].userAnswer === optionId ? 
                                                                        "checkmark option-hover selected-option bg-primary"
                                                                        : "checkmark option-hover"
                                                                    )
                                                                    : "checkmark option-hover"
                                                                }
                                                ></span>
                                            </div>
                                            <span className="option-hover">
                                                {optionId})&nbsp; 
                                                {currentQuestion.options[optionId].text}
                                                {currentQuestion.options[optionId].optionImageUrl === "" 
                                                    ? 
                                                    null 
                                                        :
                                                    // Show image in reply option if available 
                                                    <img className="img-thumbnail" src={currentQuestion.options[optionId].optionImageUrl} alt="answer-option"/>
                                                }
                                            </span>
                                        </label> 
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="col-sm-4 text-center text-sm-right question-image mt-4 mx-auto mx-md-0 text-center">
                        {currentQuestion.imageUrl === "" 
                            ? 
                            null 
                            : 
                            // Show the image in question
                            <img src={currentQuestion.imageUrl} className="rounded border" alt="question"/>
                        }
                    </div>
                </div>
            );
        }
    }
}

export default Question;