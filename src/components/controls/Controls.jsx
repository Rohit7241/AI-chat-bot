import { useState } from 'react'
import styles from './controls.module.css'
export function Controls({onsend}){
    const [content,setcontent]=useState("");
    function handlecontent(event){
        setcontent(event.target.value);
    }
    function handlebutton(event){
       if(content.length){
          onsend(content)
          setcontent("")
       }
    }
    function handleenterpress(event){
        if(event.key==='Enter'&&!event.shiftKey){
            event.preventDefault();
            handlebutton();
        }
    }
return(
    <div className={styles.controls}>
        <div className={styles.textareacontainer}  >
            <textarea className={styles.textarea} onKeyDown={handleenterpress} name="" id="" onChange={handlecontent} placeholder="Message Ai bot" value={content}></textarea>
        </div>
        <button onClick={handlebutton} className={styles.button} >Send</button>
    </div>
)
}