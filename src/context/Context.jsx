import { createContext, useEffect } from "react";
import { generateResponse } from "../config/gemini"; 
import { useState } from "react";


export const Context = createContext();

const[input,setInput]=useState("");
const[recentPrompt,setRecentPrompt] = useState("");
const[prevPrompts,setPrevPrompts]=useState([]);
const [showResult,setShowResult] = useState(false);
const [loading,setLoading] = useState(false);
const[resultData,setResultData] = useState("");

const delayPara=(index,nextWord)=>{

}


const ContextProvider = (props) => {
  const onSent = async (prompt) => {
    setResultData("")
    setLoading(true)
    setShowResult(true)
    setRecentPrompt(input)

    const response = await generateResponse(input)
    let responseArray =response.split("**");
    let newArray;
    for(let i=0;i<responseArray.length;i++){
      if(i===0||i%2 !==1){
        newArray+=responseArray[i];
      }
      else{
        newArray+= "<b>"+responseArray[i]+"</b"
      }
    }
    console.log("From onSent:", response); 
    setResultData(response)
    setLoading(false);
    setInput("")

    return response;
  };

  useEffect(() => {
    onSent("What is React JS?");
  }, []);

  const contextValue = {
    generateResponse,
    onSent,
    prevPrompts,
    setPrevPrompts,
    setRecentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
