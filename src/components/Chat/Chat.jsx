import styles from "./Chat.module.css"
export function Chat({messages}){
    const WELCOME_MESSAGE={
        role:"assistant",
        content:"Hello! How can i assist you right Now?"
    }
    return <div className={styles.chat}>
        {[WELCOME_MESSAGE,...messages].map(({role,content},index)=>(
        <div key={index} className={styles.message} data-role={role}>
        {content}
        </div>
        ))}
    </div>
}