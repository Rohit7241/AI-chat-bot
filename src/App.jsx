import { useState } from 'react'
import styles from './App.module.css'
import { Chat } from './components/Chat/Chat'
import { Controls } from './components/controls/Controls';
import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";
const ai = new GoogleGenAI({ apiKey: "AIzaSyAVvgKim9IZYOCe7nfU1bjkBZH9AHxQ1ac"  });
function App() {
  const [messages,setmessages]=useState([]);
  function addmessage(message){
    setmessages((prev)=>[...prev,message])
  }
  async function onsend(content ){
    addmessage({role:"user",content});
    try {
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash-8b",
        contents: content,
      })
      addmessage({role:"assistant",content:response.candidates[0].content.parts[0].text}); 
     
    } catch (error) {
      addmessage({role:"system",content:"Sorry, the request coudnt be processed "});    
    } 
  }
  return (
 
     <div className={styles.app}>
      <header className={styles.header}>
      <img className={styles.logo} src="/chatbot.png" alt="" />
      <h2 className={styles.title}>AI CHAT BOT</h2>
      </header>
      <div className={styles.chatcontainer}>
        <Chat messages={messages}/>
      </div>
      <Controls onsend={onsend}/>
      </div>
 
  )
}
export default App
