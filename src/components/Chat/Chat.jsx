import { useEffect, useMemo, useRef } from "react"
import styles from "./Chat.module.css"
import Markdown from 'react-markdown'

export function Chat({messages,loading}){
    const messageref=useRef(null);
    const WELCOME_MESSAGE=[{
        role:"assistant",
        content:"Hello! How can i assist you right Now?"
    },]
    const messagesGroups = useMemo(
        () =>
          messages.reduce((groups, message) => {
            if (message.role === "user") groups.push([]);
            groups[groups.length - 1].push(message);
            return groups;
          }, []),
        [messages]
      );
    useEffect(()=>{
       messageref.current?.scrollIntoView({behavior:"smooth"});
    },[messages])
     return <div className={styles.chat}>
       {[WELCOME_MESSAGE,...messagesGroups].map(
        (messages,groupIndex)=>(
            <div key={groupIndex} className={styles.Group}>
            {messages.map(({ role , content }, index) => (
              <div key={index} className={styles.message} data-role={role}>
                <Markdown>{content}</Markdown>
              </div>
                ))}
        </div>
        )
        )
        }
        <div ref={messageref}></div>
           </div>
}
