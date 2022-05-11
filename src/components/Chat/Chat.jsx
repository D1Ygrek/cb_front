import React, {useState, useEffect} from 'react';

import { BotMessage, UserMessage } from '../Messages/Messages';
import UserInput from '../UserInput/UserInput';

import './Chat.css'

const Chat = (props) => {
  const [messages, setMessages] = useState(null)

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
      const data = await res.json()
      setMessages(data)
      console.log(data)
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

  return(
    <div className='chat-wrapper'>
      <div className='chat-main' id='chatMain'>
        {messagesGenerator()}
      
      </div>
    <UserInput 
      userId = {props.user} 
      setMessages = {setMessages} 
      chatMain ={document.getElementById('chatMain')}
      messages = {messages}/>
    </div>
  )
}

export default Chat