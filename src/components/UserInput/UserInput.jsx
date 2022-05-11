import React from 'react';
import { Input } from 'antd'
import { ArrowUpOutlined } from '@ant-design/icons'
import './UserInput.css'

async function sendUserUpdate(message, userId, setMessages , chatMain, messages){
  setMessages([...messages, {sender: 'user', message: message}])
  setTimeout(() => {chatMain.scrollTop = chatMain.scrollHeight}, 40)
  //console.log(message, userId)
  let result = await fetch(
    'http://localhost:5000/user_message',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        id:userId,
        message:message
      })
    })
  let status = result.status
  if(status === 200){
    let data = await result.json()
    console.log(data)
    setMessages(data)
  }
  setTimeout(() => {chatMain.scrollTop = chatMain.scrollHeight}, 200)
}

const UserInput = (props) => {
  return(
    <div className='user-input-block'>
      <Input id="userInput" className='user-input' placeholder='Твое сообщение'/>
        <button 
          className='user-input-button'
          onClick={() => sendUserUpdate(
            document.getElementById('userInput').value,
            props.userId,
            props.setMessages,
            props.chatMain,
            props.messages)
            }>
            <ArrowUpOutlined style={{color: 'white'}}/>
        </button>
    </div>
  )
}

export default UserInput