import { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import { newQuiz } from '../redux/quizItems/quizItemsThunk';
import { setUserAnswersClear, setUserClear } from '../redux/userItems/userItems';
import { setClearCurrentQuestion } from '../redux/quizItems/quizItems';
import { setUser } from '../redux/userItems/userItemsThunk';
import { useRouter } from 'next/router';
import swal from 'sweetalert';
import Head from 'next/head';

const QuizStart = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [,forceUpdate] = useState();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [nationalId, setNationalId] = useState('');
    // set date of birth input values
    const [birthDay, setBirthDay] = useState(null);
    const [birthMonth, setBirthMonth] = useState(null);
    const [birthYear, setBirthYear] = useState(null);
    const [birthDate, setBirthDate] = useState([birthYear, birthMonth, birthDay]);
    const [birthDateFilled, setBirthDateFilled] = useState('');
    const [acceptRules, setAcceptRules] = useState();
    useEffect(() => {
        // go to top of the page
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    },[])
    // validator for validating form fields
    const validator = useRef(new SimpleReactValidator({
        messages: {
            required: "* وارد کردن اطلاعات این قسمت الزامی است.",
            min: "* ۱۰ رقم کد ملی را کامل وارد کنید.",
            accepted: "برای شرکت در آزمون می بایست قوانین را بپذیرید.",
            numeric: "ورودی باید به عدد باشد."
        },
        element: message => <div className="text-danger position-relative mt-2" style={{fontSize: "16px", right: "9px"}}>{message}</div>
    })) 
    useEffect(() => {
        birthDate.includes(null) ? setBirthDateFilled('') : setBirthDateFilled(true);
    }, [birthDate])
    useEffect(() => {
        // Delete previous test information, if the user has already taken the test.
        dispatch(setUserAnswersClear());
        dispatch(setClearCurrentQuestion());
        dispatch(setUserClear());
        dispatch(newQuiz());
    },[])
    const handleUserFormSubmit = () => {
        if(validator.current.allValid()){
            // current user information
            const currentUser = {id: nationalId, 
                                 firstname: firstName,
                                 lastname: lastName, 
                                 dateOfBirth: `${birthYear}/${birthMonth}/${birthDay}`
                                };
            // set current user
            dispatch(setUser(currentUser));
            swal(`توجه
                    * این آزمون نمره منفی ندارد و پاسخ نادرست یا پاسخ ندادن هر سوال به منزله یک غلط است.
                    * در صورت داشتن بیش از چهار غلط مردود می شوید. 
                `);
            // Going to the URL that renders the questions
            router.push("/quiz-questions");
        } 
        else {
            validator.current.showMessages();
            forceUpdate(1);
        }
    }
    const handlePressEnterKey = event => {
        if(event.code === "Enter" || event.keyCode === 13){
            event.preventDefault()  
            const submitButton = document.getElementById("submitButton");
            // Execute the form submission function performed by Button by pressing Enter
            document.getElementById("user-form").requestSubmit(submitButton);
        }
    }
    return ( 
        <>
            <Head>
                <title>آزمون راهنمایی و رانندگی</title>
            </Head>
            <div className="quiz-section border rounded w-100">
                <h3 className="text-center mt-3 mb-5 start-h" style={{color: "#00558A"}}>شروع آزمون!</h3>
                <form className="form-group" id="user-form" 
                      onSubmit={e=>{
                                    e.preventDefault();
                                    handleUserFormSubmit()
                                    }
                                }
                >
                    <div className="row mx-auto">
                        <div className="col-12 col-sm-6 col-md-4 mb-4">
                            <input type="text" className="form-control" id="firstname" placeholder="نام" 
                                    name="firstname"
                                    onFocus={e => {
                                        e.target.setAttribute('placeholder', '')
                                    }}
                                    onBlur={e => {
                                        e.target.setAttribute('placeholder', "نام")
                                    }}
                                    onChange={e => {
                                        setFirstName(e.target.value);
                                    }}
                            />
                            {
                                validator.current.message("firstname", firstName, "required")
                            }
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 mb-4">
                            <input type="text" className="form-control" id="lastname" placeholder="نام خانوادگی" 
                                    name="lastname"
                                    onFocus={e => {
                                        e.target.setAttribute('placeholder', '')
                                    }}
                                    onBlur={e => {
                                        e.target.setAttribute('placeholder', "نام خانوادگی")
                                    }}
                                    onChange={e => {
                                        setLastName(e.target.value);
                                    }}
                            />
                            {validator.current.message("lastname", lastName, "required")}
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 mb-4">
                            <input type="text" className="form-control persian-number" id="NID" placeholder="کد ملی" 
                                    maxLength="10" 
                                    name="NID"
                                    onFocus={e => {
                                        e.target.setAttribute('placeholder', '')
                                    }}
                                    onBlur={e => {
                                        e.target.setAttribute('placeholder', "کد ملی")
                                    }}
                                    onChange={e => {
                                        if(isNaN(e.target.value)){
                                            // If the input is not a number, do not add anything to the displayed string
                                            e.target.style.backgroundColor = "rgba(231, 76, 60,0.3)";
                                            e.target.setAttribute("placeholder", "لطفا عدد را با کیبرد انگلیسی وارد کنید!")
                                            e.target.value = nationalId + "" ;
                                        } else {
                                            // If the input value is a number
                                            e.target.style.backgroundColor = "white";
                                            e.target.setAttribute("placeholder", "")
                                            setNationalId(e.target.value);
                                        }
                                    }}
                            />
                            {// National code entry is required and national code is 10 digits
                                validator.current.message("NID", nationalId, "required|min:10|numeric")
                            }
                        </div>
                        <div className="col-12 px-4 text-center mb-3" name="birthDate"
                             onKeyDown={e=>handlePressEnterKey(e)}
                             >
                            <label htmlFor="birth" className="d-block d-md-inline">
                                تاریخ تولد: 
                            </label>
                            <div className='d-flex flex-column flex-sm-row justify-content-center mt-1'>
                                <select className="mb-1 birth-select text-center d-block d-md-inline mx-1 rounded border bg-light" name="day" id="birth" 
                                        onChange={e => {
                                            setBirthDay(e.target.value)
                                            setBirthDate([birthYear, birthMonth, e.target.value]);
                                        }}
                                        defaultValue = {0}
                                >
                                    <option value={0} disabled hidden>روز</option>
                                    <option>۰۱</option><option>۰۲</option><option>۰۳</option><option>۰۴</option><option>۰۵</option><option>۰۶</option><option>۰۷</option><option>۰۸</option><option>۰۹</option><option>۱۰</option><option>۱۱</option><option>۱۲</option><option>۱۳</option><option>۱۴</option><option>۱۵</option><option>۱۶</option><option>۱۷</option><option>۱۸</option><option>۱۹</option><option>۲۰</option><option>۲۱</option><option>۲۲</option><option>۲۳</option><option>۲۴</option><option>۲۵</option><option>۲۶</option><option>۲۷</option><option>۲۸</option><option>۲۹</option><option>۳۰</option><option>۳۱</option>
                                </select>
                                <select className="mb-1 birth-select text-center d-block d-md-inline mx-1 rounded border bg-light" name="month" 
                                        onChange={e => {
                                            setBirthMonth(e.target.value)
                                            setBirthDate([birthYear, e.target.value, birthDay ]);
                                        }}
                                        defaultValue = {0}
                                >
                                <option value={0} disabled hidden>ماه</option>
                                    <option>۰۱</option><option>۰۲</option><option>۰۳</option><option>۰۴</option><option>۰۵</option><option>۰۶</option><option>۰۷</option><option>۰۸</option><option>۰۹</option><option>۱۰</option><option>۱۱</option><option>۱۲</option>
                                </select>
                                <select className="mb-1 birth-select text-center d-block d-md-inline mx-1 rounded border bg-light" name="year"
                                        onChange={e => {
                                            setBirthYear(e.target.value)
                                            setBirthDate([e.target.value, birthMonth, birthDay]);
                                        }}
                                        defaultValue = {0}
                                >
                                <option value={0} disabled hidden>سال</option>
                                    <option>۱۳۸۲</option><option>۱۳۸۱</option><option>۱۳۸۰</option><option>۱۳۷۹</option><option>۱۳۷۸</option><option>۱۳۷۷</option><option>۱۳۷۶</option><option>۱۳۷۵</option><option>۱۳۷۴</option><option>۱۳۷۳</option><option>۱۳۷۲</option><option>۱۳۷۱</option><option>۱۳۷۰</option><option>۱۳۶۹</option><option>۱۳۶۸</option><option>۱۳۶۷</option><option>۱۳۶۶</option><option>۱۳۶۵</option><option>۱۳۶۴</option><option>۱۳۶۳</option><option>۱۳۶۲</option><option>۱۳۶۱</option><option>۱۳۶۰</option><option>۱۳۵۹</option><option>۱۳۵۸</option><option>۱۳۵۷</option><option>۱۳۵۶</option><option>۱۳۵۵</option><option>۱۳۵۴</option><option>۱۳۵۳</option><option>۱۳۵۲</option><option>۱۳۵۱</option><option>۱۳۵۰</option><option>۱۳۴۹</option><option>۱۳۴۸</option><option>۱۳۴۷</option><option>۱۳۴۶</option><option>۱۳۴۵</option><option>۱۳۴۴</option><option>۱۳۴۳</option><option>۱۳۴۲</option><option>۱۳۴۱</option><option>۱۳۴۰</option><option>۱۳۳۹</option><option>۱۳۳۸</option><option>۱۳۳۷</option><option>۱۳۳۶</option><option>۱۳۳۵</option><option>۱۳۳۴</option><option>۱۳۳۳</option><option>۱۳۳۲</option><option>۱۳۳۱</option><option>۱۳۳۰</option><option>۱۳۲۹</option><option>۱۳۲۸</option><option>۱۳۲۷</option><option>۱۳۲۶</option><option>۱۳۲۵</option><option>۱۳۲۴</option><option>۱۳۲۳</option><option>۱۳۲۲</option><option>۱۳۲۱</option><option>۱۳۲۰</option><option>۱۳۱۹</option><option>۱۳۱۸</option><option>۱۳۱۷</option><option>۱۳۱۶</option><option>۱۳۱۵</option><option>۱۳۱۴</option><option>۱۳۱۳</option><option>۱۳۱۲</option><option>۱۳۱۱</option><option>۱۳۱۰</option><option>۱۳۰۹</option><option>۱۳۰۸</option><option>۱۳۰۷</option><option>۱۳۰۶</option><option>۱۳۰۵</option><option>۱۳۰۴</option><option>۱۳۰۳</option><option>۱۳۰۲</option><option>۱۳۰۱</option><option>۱۳۰۰</option>
                                </select>
                                {
                                    validator.current.message("birthDate", birthDateFilled, "required: true")
                                }
                            </div>
                        </div>
                        <div className="col-12 text-center mb-3" name="accept-rules" >
                            <input type="checkbox" id="accept-rules" 
                                   value={acceptRules} 
                                   onChange={e => 
                                       setAcceptRules(e.currentTarget.checked)
                                       }
                            />
                            {" "}
                            <label className="accept-rules-label mb-0" htmlFor="accept-rules">
                                <a href="#rules">قوانین آزمون </a>
                                را می پذیرم.
                            </label>
                        {validator.current.message("accept-rules", acceptRules, "accepted")}

                        </div>
                        <div className="col-12 text-center">
                            <button type="submit" id="submitButton" 
                            className="start-button btn btn-success px-2 pb-2 mx-auto">شروع می کنم</button>
                        </div>
                    </div>
                </form>
                <div className="w-100 px-3 py-5">
                    <h3 className="text-center exam-rules-header pt-4" id="rules">** قوانین آزمون **</h3>
                    <div className="py-2 mt-3" style={{fontSize: "20px"}}>
                        * این آزمون نمره منفی ندارد و پاسخ نادرست یا پاسخ ندادن هر سوال به منزله یک غلط است. 
                        <br className="mb-3"/>
                        * در صورت داشتن بیش از چهار غلط مردود می شوید.
                        <br className="mb-3" />
                        * حد اکثر زمان پاسخ دهی در این آزمون 20 دقیقه می باشد.
                        <br className="mb-3" />*
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها
                        و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
                        و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذ
                        شته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری 
                        را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد،
                        در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها،
                        و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی،
                        و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                        <br className="mb-3" />*
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها
                        و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
                        و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذ
                        شته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری 
                        را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد،
                        در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها،
                        و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی،
                        و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.

                    </div>
                </div>
            </div>
        </>
     );
}
 
export default QuizStart;
