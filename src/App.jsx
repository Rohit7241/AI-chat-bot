import { useState } from 'react'
import styles from './App.module.css'
import { Chat } from './components/Chat/Chat'
import { Controls } from './components/controls/Controls';
import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_API  });
function App() {
  const [messages,setmessages]=useState([]);
  function addmessage(message){
    setmessages((prev)=>[...prev,message])
  }
  async function onsend(content ){
    addmessage({role:"user",content});
    try {
      const response = await ai.models.generateContentStream({
        model: "gemini-1.5-flash-8b",
        contents: content,
      })

    for await (const chunk of response) {
      setmessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        const lastMessage = updatedMessages[updatedMessages.length - 1];
        if (lastMessage.role === "assistant") {
          lastMessage.content += chunk.text;
        }
        return updatedMessages;
      })
     
    }
     
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
