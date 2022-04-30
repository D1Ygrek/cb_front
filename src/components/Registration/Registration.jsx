import React from 'react';
import { Input, Button, message } from 'antd';
import './Registration.css'

async function register(userName, setUser, switchPage){
  let result = await fetch(
    'http://localhost:5000/new_user',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        login: userName
      })
    }
  )
  let status = result.status
  switch(status){
    case 409:
      message.info('Пользователь с таким именем уже существует')
      break;
    case 422:
      message.info('Недопустимые символы в логине')
      break;
    case 200:
      let data = await result.json()
      console.log(data)
      message.info('Здравствуйте, '+data.name)
      localStorage.setItem('chatUserId', data.id)
      setUser(data.id)
      switchPage('chat')
      break;
    default:
      message.info('Ошибка. Повторите попытку позднее')
  }
}

const RegistrationPage = (props) => {

  return(
    <div className='login-background'>
      <p>Регистрация</p>
      <Input style={{borderRadius:'1em'}} id="regInput"/>
      <Button
        onClick={() => props.switchPage('login')} 
        type='link' 
        style={{alignSelf:'flex-start'}}>
          Назад
      </Button>
      <Button
        onClick={() => register(
          document.getElementById('regInput').value,
          props.setUser,
          props.switchPage
        )}
        type='primary' 
        shape='round'>
          Зарегистрироваться
      </Button>
    </div>
  )
}

export default RegistrationPage