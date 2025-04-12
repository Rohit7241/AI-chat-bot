import { useEffect, useRef, useState } from 'react'
import styles from './controls.module.css'
import TextareaAuto from 'react-textarea-autosize'
export function Controls({onsend,loading}){
    const textarearef=useRef(null);
    useEffect(()=>{
        if(!loading){
            textarearef.current.focus();
        }
    },[loading])
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
        if(event.key==='Enter'&&!event.shiftKey&&!loading){
            event.preventDefault();
            handlebutton();
        }
    }
return(
    <div className={styles.controls}>
        <div className={styles.textareacontainer}  >
            <TextareaAuto ref={textarearef} disabled={loading} minRows='2' maxRows='4' className={styles.textarea} onKeyDown={handleenterpress} name="" id="" onChange={handlecontent} placeholder="Message Ai bot" value={content}></TextareaAuto>
        </div>
        <button onClick={handlebutton} disabled={loading} className={styles.button} >Send</button>
    </div>
)
}