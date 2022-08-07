const QuizNav = ({onQuestionChange, questionId}) => {
    return ( 
        <div className="q-nav text-center">
            <div className="slidecontainer my-1">
                <input type="range" className="slider"
                       value={questionId} min="1" max="30" 
                       onChange={e => {
                           const difference = e.target.value - questionId
                           // render the question seleted from range input 
                           onQuestionChange(difference);
                            }   
                        }
                />
            </div>
            <div className="btn-group row justify-content-around" style={{width: "30%"}}>

                {questionId===1 ? 
                    // Do not display the Go to "Previous" button when the user is on the first question.
                    null
                    :
                    <button type="submit" id="back-q" className="q-nav-botton btn btn-primary col-6 d-flex justify-content-center"  
                            onClick={() => {
                                // Send -1 to the method to change the question method to go to the previous question
                                onQuestionChange(-1)
                            }}
                    >   
                        <i className="fa fa-arrow-right d-none d-md-block pt-1 px-1" aria-hidden="true"></i>{" "}
                        <span className="q-nav-text active pr-1">قبلی</span>
                    </button>
                }
                    <button type="submit" id="next-q" 
                        className={questionId === 30 ? "q-nav-botton btn btn-success col-6 d-flex justify-content-center" : "q-nav-botton btn btn-primary col-6 d-flex justify-content-center"}
                        onClick={() => {
                            // Send +1 to the method to change the question method to go to the next question  
                            onQuestionChange(1);
                        }}
                    >
                        <span className="q-nav-text pl-1">{questionId === 30 ? "نتیجه" : "بعدی"}</span>{" "}
                        <i className="fa fa-arrow-left d-none d-md-block pt-1 px-1" aria-hidden="true"></i>
                    </button>
            </div>
        </div>
     );
}

export default QuizNav;
