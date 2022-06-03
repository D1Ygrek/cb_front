import React, { useState } from 'react';
import { Input, Form } from 'antd'
import { ArrowUpOutlined } from '@ant-design/icons'
import './UserInput.css'

async function sendUserUpdate(message, userId, setMessages , chatMain, messages, variants, setVariants){
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
        message:message,
        variants: variants
      })
    })
  let status = result.status
  if(status === 200){
    let data = await result.json()
    console.log(data)
    setMessages(data.messages)
    setVariants(data.variants)
  }
  setTimeout(() => {chatMain.scrollTop = chatMain.scrollHeight}, 200)
}

const UserInput = (props) => {

  const onFinish = () => {
    setInputValue("")
    sendUserUpdate(
      inputValue,
      props.userId,
      props.setMessages,
      props.chatMain,
      props.messages,
      props.variants,
      props.setVariants)
  }

  const [inputValue, setInputValue] = useState("")
  return(
    <div className='user-input-block'>
      <Form style={{width: '100%'}} className='user-input' onFinish={onFinish}>
      <Input value = {inputValue} onChange={(e) => setInputValue(e.target.value)} id="userInput" className='user-input' placeholder='Твое сообщение'/>
      </Form>
        <button 
          className='user-input-button'
          onClick={onFinish}>
            <ArrowUpOutlined style={{color: 'white'}}/>
        </button>
      
    </div>
  )
}

export default UserInput