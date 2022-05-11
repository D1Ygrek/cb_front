import React, {useState, useEffect} from 'react';
import './Messages.css'

export const BotMessage = (props) => {
    return(
        <div className='message-bot'>
            {props.text}
        </div>
    )
}

export const UserMessage = (props) => {
    return(
        <div className='message-user'>
            {props.text}
        </div>
    )
}


