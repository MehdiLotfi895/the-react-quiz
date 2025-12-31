import { useEffect, useReducer } from 'react';
import './App.css';
//به دلیل نبود ای پی ای از ارایه استفاده شده که خوب نیست و در اصل باید از ای پی ایی که سوال های رندوم بفرسته کمک گرفت
const questions = [
  {
    question: "Which is the most popular JavaScript framework?",
    options: ["Angular", "React", "Svelte", "Vue"],
    answer: "React"
  },
  {
    question: "Which hook is used to manage state in React?",
    options: ["useEffect", "useContext", "useState", "useRef"],
    answer: "useState"
  },
  {
    question: "Which hook is used for side effects?",
    options: ["useState", "useEffect", "useMemo", "useReducer"],
    answer: "useEffect"
  },
  {
    question: "What is JSX?",
    options: [
      "A JavaScript framework",
      "A CSS preprocessor",
      "A syntax extension for JavaScript",
      "A database"
    ],
    answer: "A syntax extension for JavaScript"
  },
  {
    question: "Which method is used to render React to the DOM?",
    options: ["render()", "createRoot()", "append()", "mount()"],
    answer: "createRoot()"
  },
  {
    question: "What is a React component?",
    options: [
      "A JavaScript function or class",
      "A CSS file",
      "An HTML template",
      "A database table"
    ],
    answer: "A JavaScript function or class"
  },
  {
    question: "Which hook is used to access DOM elements?",
    options: ["useState", "useEffect", "useRef", "useMemo"],
    answer: "useRef"
  },
  {
    question: "What is the default behavior of React state updates?",
    options: ["Synchronous", "Asynchronous", "Blocking", "Parallel"],
    answer: "Asynchronous"
  },
  {
    question: "Which prop is used to pass data to a component?",
    options: ["state", "props", "setState", "data"],
    answer: "props"
  },
  {
    question: "Which hook is used for global state management?",
    options: ["useState", "useEffect", "useContext", "useRef"],
    answer: "useContext"
  },
  {
    question: "What does virtual DOM improve?",
    options: ["Security", "Performance", "Styling", "SEO"],
    answer: "Performance"
  },
  {
    question: "Which lifecycle is replaced by hooks?",
    options: [
      "Component methods",
      "Lifecycle methods in class components",
      "CSS lifecycle",
      "HTML lifecycle"
    ],
    answer: "Lifecycle methods in class components"
  },
  {
    question: "Which keyword is used to export a component?",
    options: ["import", "export", "default", "return"],
    answer: "export"
  },
  {
    question: "What is the correct way to update state?",
    options: [
      "state = value",
      "this.state.value = x",
      "setState(value)",
      "setValue(newValue)"
    ],
    answer: "setValue(newValue)"
  },
  {
    question: "Which tool is commonly used for routing in React?",
    options: ["Redux", "Axios", "React Router", "Webpack"],
    answer: "React Router"
  }
];
const falseAnswersStyle={backgroundColor:"#fd9f41",color:"black"}
const trueAnswersStyle={backgroundColor:"#0f8ca2",color:"white"}
const notSelct={width:"450px",height:"50px",backgroundColor:"#3c484bff",marginTop:"20px",borderRadius:"40px",color:"white",padding:"15px 30px"}
const x={start:false,questionNumber:1,points:0,applye:false,advance:0,time:600,resualt:false,heightScore:Number(localStorage.getItem("heightScore")||0),active:false}
function reducer(state,action){
  switch(action.type){
    case "start":
      if(action.payLoad){
        return({...state,start:true,time:state.time-1})}
      else{
        return({...state,start:false})
      }
    case "point":
      return({...state,points:state.points+10});
    case "applye":
      return({...state,applye:action.payLoad});
    case "questionNumber":
      return({...state,questionNumber:state.questionNumber+1});
      case "advance":
        return({...state,advance:state.advance+1});
      case "resualt":
        if(action.payLoad){
        return({...state,resualt:true,active:false})}
        else{
          return({...state,resualt:false,active:true})}
      case "heightScore":
          return({...state,heightScore:action.payLoad})
      case "restart":
          return({...x,start:true,active:true});
      case "active":
        return({...state,active:true});
        }

  }

let select =-1;
function App() {
  const[state,dispatch]=useReducer(reducer,x);
  const{start,questionNumber,points,applye,advance,time,resualt,heightScore,active}=state;
  const y=(applye)?"x":"options";
  useEffect(()=>{
    if(active && time>=0){
      setTimeout(() => {
        dispatch({type:"start",payLoad:"true"})
      }, 1000);
    }
   else{
    if(time<=0){
     
      dispatch({type:"resualt",payLoad:"true"})
    }
   }
  },[time])
  

useEffect(
  ()=>{
    localStorage.setItem("heightScore",String(heightScore))
  }
  ,[heightScore])
console.log(heightScore)
  return (
    
    <div id="container">
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"3vw",paddingTop:"2.5rem"}}>
        <img src="./logo.png" style={{width:"8vw",height:"auto"}}/>
        <div style={{color:"white",fontSize:"3rem"}}>THE REACT QUIZ</div>
      </div>
      {
        (start)?(resualt)?
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"2.5rem"}}>
        <div style={{width:"29.5vw",height:"10vh",borderRadius:"2.5rem",backgroundColor:"#0f8ca2",display:"flex",justifyContent:"center",alignItems:"center",color:"white",fontSize:"1.25rem"}}>
          your score {points} out of 150({Math.floor(points/150*100)}%)
        </div>
        <div style={{color:"white",marginTop:"1.8rem",fontSize:"1.25rem"}}>Hightscore : {heightScore}</div>
        <button id="restart" style={{backgroundColor:"#3c484bff",padding:"0.625rem 3.1rem",color:"white",fontSize:"1.25rem",border:"none",borderRadius:"2.5rem",marginTop:"1.25rem"}}onClick={()=>{
           dispatch({type:"restart"});
           dispatch({type:"resualt",payLoad:false});
           select=-1;
        }}>Restart quiz</button>
        </div>:
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"2.5rem"}}>
            <div style={{width:"29.5vw",height:"1.3vh",backgroundColor:"white",borderRadius:"0.625rem"}}>
              <div style={{width:`${advance*1.966}vw`,height:"1.3vh",borderRadius:"0.625rem",backgroundColor:"#0b8da5"}}></div>
            </div>
            <div style={{width:"29.5vw",display:"flex",justifyContent:"space-between",marginTop:"0.625rem",color:"white"}}>
              <div>Question {questionNumber}/15</div>
              <div>{points}/150 points</div>
            </div>
            <div style={{color:"white",marginTop:"3.1rem",fontSize:"1.2rem",width:"29.5vw"}}>
              {questions[questionNumber-1].question}
            </div>
            {
              questions[questionNumber-1].options.map((value,index)=>{
                return(
                  <div id={(index==select)?"clickedOption":""} className={y}style={(applye)?(value==questions[questionNumber-1].answer)?{...notSelct,...trueAnswersStyle}:{...notSelct,...falseAnswersStyle}:{...notSelct}}
                  onClick={()=>{if(!applye){dispatch({type:"applye",payLoad:true});select=index;dispatch({type:"advance"});(value==questions[questionNumber-1].answer)?dispatch({type:"point"}):console.log("nope")}}}>
                    {value}
                  </div>
                )
              })
            }
            <div style={{width:"29.5vw",display:"flex",justifyContent:"space-between",marginTop:"3.1rem"}}>
             <div style={{backgroundColor:"transparent",padding:"0.625rem 1.9rem",color:"white",fontSize:"1.25rem",border:"1px solid rgba(183, 179, 179, 1)",borderRadius:"2.5rem"}}>{Math.floor(time/60)}:{(time%60)>9?<>{time%60}</>:<>0{time%60}</>}</div>
             {
              (applye)?(questionNumber<=14)?
              <button id="next"style={{backgroundColor:"#3c484bff",padding:"0.625rem 1.9rem",color:"white",fontSize:"1.25rem",border:"none",borderRadius:"2.5rem"}}onClick={()=>{
                dispatch({type:"questionNumber"});dispatch({type:"applye",payLoad:false});select=-1;
              }}>next</button>
              :<>
              <button id="finish"style={{backgroundColor:"#3c484bff",padding:"0.625rem 1.9rem",color:"white",fontSize:"1.25rem",border:"none",borderRadius:"2.5rem"}}
              onClick={()=>{
                dispatch({type:"resualt",payLoad:true});
                if(points>heightScore){
                  dispatch({type:"heightScore",payLoad:points})
                }
              }}>Finish</button>
              </>:<></>
             }
            </div>
        </div>
        :
        <div style={{color:"white",textAlign:"center",marginTop:"2.5rem"}}>
          <div style={{fontSize:"2.25rem"}}>
            Welcome to The React Quiz!
          </div>
          <div style={{fontSize:"1.5rem",marginTop:"1.25rem"}}>
            15 quesitions to test your React mastery
          </div>
          <button id="startButton"style={{backgroundColor:"#3c484bff",marginTop:"2.5rem",padding:"1rem 1.9rem",border:"none",borderRadius:"1.9rem",border:"none",fontSize:"1.25rem",color:"white"}}onClick={()=>{
            dispatch({type:"start",payLoad:true});dispatch({type:"active"})
          }}>lets start!</button>
        </div>
      }
    </div>

  );
  
}

export default App;

