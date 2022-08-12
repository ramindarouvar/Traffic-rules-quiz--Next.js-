const QuizNav = ({onQuestionChange, questionId, children}) => {
    return ( 
        <div className="q-nav text-center">
            <div className="slidecontainer my-1">
                <input type="range" className="slider w-75"
                       value={questionId} min="1" max="30" 
                       onChange={e => {
                                // render the question seleted from range input 
                                onQuestionChange(Number(e.target.value));
                            }   
                        }
                />
            </div>
            <div>
                {children}
            </div>
            <div className="pb-3 btn-group">
                    <button type="submit" id="back-q" className="q-nav-botton btn btn-primary d-flex justify-content-center"  
                            onClick={() => {
                                // Send -1 to the method to change the question method to go to the previous question
                                onQuestionChange(questionId-1)
                            }}
                            disabled={questionId===1 ? true : false}
                    >   
                        <i className="fa fa-arrow-right d-none d-md-block pt-1 px-1" aria-hidden="true"></i>{" "}
                        <span className="q-nav-text active pr-1">قبلی</span>
                    </button>
                    <button type="submit" id="next-q" 
                        className={questionId === 30 ? "q-nav-botton btn btn-success col-6 d-flex justify-content-center" : "q-nav-botton btn btn-primary col-6 d-flex justify-content-center"}
                        onClick={() => {
                            // Send +1 to the method to change the question method to go to the next question  
                            onQuestionChange(questionId+1);
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
