import { useState } from 'react'
import styles from './App.module.css'
import { Chat } from './components/Chat/Chat'
import { Controls } from './components/controls/Controls';

import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";
const ai = new GoogleGenAI({ apiKey: "AIzaSyDWRJAbDv_LWieYHaQfoe3iWlickhb-SCg"  });
function App() {
  const [loading,setload]=useState(false);
  const [messages,setmessages]=useState([]);
  function addmessage(message){
    setmessages((prev)=>[...prev,message])
  }
  function updatemessage(chunks){
    setmessages((prev)=>
    prev.map((message,index)=>
    index===prev.length-1?{...message,content:`${message.content}${chunks.candidates[0].content.parts[0].text}`}:message))
  }
  async function onsend(content ){
    addmessage({role:"user",content});
    setload(true);
    try {
      const response = await ai.models.generateContentStream({
        model: "gemini-1.5-flash-8b",
        contents: content,
      })
      let isfirstchunk=false;
      for await(const chunks of response){
         if(!isfirstchunk){
          isfirstchunk=true;
          addmessage({role:"assistant",content:""}); 
        }
         updatemessage(chunks);
      }
      setload(false);
    } catch (error) {
      setload(false);
      addmessage({role:"system",content:"Sorry, the request coudnt be processed "});    
    } 
    
  }
  return (
 
      <div className={styles.app}>
      <header className={styles.header}>
      <img className={styles.logo} src="/chatbot.png" alt="" />
      <h2 className={styles.title}>AI CHAT BOT</h2>
      {loading &&<div className={styles.message} style={{display:"flex"}}>ChatBot is typing<div className={styles.loader}></div></div>}
      </header>
      <div className={styles.chatcontainer}>
        <Chat messages={messages} loading={loading}/>
      </div>
      <Controls onsend={onsend} loading={loading}/>
      </div>
 
  )
}
export default App
