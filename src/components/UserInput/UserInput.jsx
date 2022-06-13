import React, { useState } from 'react';
import { Input, Form, message } from 'antd'
import { ArrowUpOutlined } from '@ant-design/icons'
import './UserInput.css'

async function sendUserUpdate(
  message,
  userId,
  setMessages, 
  chatMain, 
  messages,
  variants, 
  setVariants,
  setCantWrite){
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
    if(data.variants.length === 1 && data.variants[0].variant[0] === '#'){
      console.log('should be false')
      setCantWrite(false)
    }else{
      console.log('should be true')
      setCantWrite(true)
    }
    setMessages(data.messages)
    setVariants(data.variants)
  }
  setTimeout(() => {chatMain.scrollTop = chatMain.scrollHeight}, 200)
}

const UserInput = (props) => {

  const onFinish = () => {
    if((Number.isInteger(parseInt(inputValue))) && (parseInt(inputValue)>=0) && (parseInt(inputValue)<=10)){
      setInputValue("")
      sendUserUpdate(
        inputValue,
        props.userId,
        props.setMessages,
        props.chatMain,
        props.messages,
        props.variants,
        props.setVariants,
        props.setCantWrite)
    }else{
      message.error('Введите число от 0 до 10')
    }
    
  }

  const [inputValue, setInputValue] = useState("")
  return(
    <div className='user-input-block'>
      <Form style={{width: '100%'}} className='user-input' onFinish={onFinish}>
      <Input
        disabled = {props.canWrite}
        value = {inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        id="userInput" 
        className='user-input' 
        placeholder='Твое сообщение'/>
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