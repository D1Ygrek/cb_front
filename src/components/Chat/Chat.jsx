import React, {useState, useEffect} from 'react';
import { message } from 'antd';
import { BotMessage, UserMessage } from '../Messages/Messages';
import UserInput from '../UserInput/UserInput';

import './Chat.css'

async function sendChosenUpdate(
  variant,
  variantMessage, 
  userId,
  setVariants,
  setMessages, 
  chatMain, 
  messages,
  setCantWrite){
  setMessages([...messages, {sender: 'user', message: variantMessage}])
  setTimeout(() => {chatMain.scrollTop = chatMain.scrollHeight}, 40)
  let result = await fetch(
    'http://localhost:5000/user_variant',
    {
      method:'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        id: userId,
        variant: variant,
        message: variantMessage
      })
    }
  )
  let status = result.status
  if(status == 200){
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
  else{
    message.error('Ошибка загрузки данных')
  }
  setTimeout(() => {chatMain.scrollTop = chatMain.scrollHeight}, 200)

}

const Chat = (props) => {
  const [messages, setMessages] = useState(null)
  const [variants, setVariants] = useState(null)
  const [cantWrite, setCantWrite] = useState(true)

  useEffect(() => {
    async function getPrevMessages(){
      let url = 'http://localhost:5000/start_chat'
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          id: props.user
        })
      })
      const status = res.status
      console.log(status)
      if (status === 200){
        const data = await res.json()
        if(data.variants.length === 1 && data.variants[0].variant[0] === '#'){
          console.log('should be false')
          setCantWrite(false)
        }else{
          console.log('should be true')
          setCantWrite(true)
        }
        setMessages(data.messages)
        setVariants(data.variants)
        console.log(data)
      }
      else if(status === 401){
        console.log('f')
        props.switchPage('login')
        localStorage.removeItem('chatUserId')
      }
    }
    getPrevMessages()
    const chatMain = document.getElementById('chatMain')
    setTimeout(() => {chatMain.scrollTop = chatMain.scrollHeight}, 200)
    
  }, [])
  //console.log(document.getElementById('chatMain').sc)
  const messagesGenerator = () =>{
    console.log(messages)
    if(messages){
      return messages.map((item) => {
        if(item.sender === 'bot'){
          return(
            <BotMessage text = {item.message}/>
          )
        }
        else if(item.sender === 'user'){
          return(
            <UserMessage text = {item.message}/>
          )
        }
      })
    }
  }

  const variantsGeneratorr = () => {
    if(variants){
      return variants.map((item) =>{
        console.log(item.variant)
        if(item.direction === "$call_specialist"){
          return (
            <div className='variant'>
              <a className='text' href="tel:+73022401483">
                Вызвать специалиста
              </a>
            </div> 
          )
          }
        if(item.variant[0] !== "#"){
        return <div className='variant' onClick={() => {sendChosenUpdate(
          item.direction,
          item.variant,
          props.user,
          setVariants,
          setMessages,
          document.getElementById('chatMain'),
          messages,
          setCantWrite
        )}}>{item.variant}</div>}
      })
    }
  }

  return(
    <>
      <div className='chat-main' id='chatMain'>
        {messagesGenerator()}
      
      </div>
    <UserInput 
      userId = {props.user} 
      setMessages = {setMessages}
      setVariants = {setVariants}
      chatMain ={document.getElementById('chatMain')}
      messages = {messages}
      variants = {variants}
      canWrite = {cantWrite}
      setCantWrite = {setCantWrite}/>
      <div className='variants-wrapper'>
        {variantsGeneratorr()}
      </div>
    </>
  )
}

export default Chat