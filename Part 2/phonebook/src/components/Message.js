import React from 'react'

const Message = ({message}) => {
    if(message === null){
        return null
    }
    return(<div className={message.class}>
        {message.text}
    </div>)
}


export default Message