import React from 'react';
import { Input, Button, message } from 'antd';
import './Login.css'

async function authentificate(userName, password, setUser, switchPage){
  let result = await fetch(
    'http://localhost:5000/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        login: userName,
        password: password
      })
    }
  )
  let status = result.status
  console.log(status)
  switch(status){
    case 401:
      message.info('Вы не авторизованы')
      break;
    case 422:
      message.info('Недопустимые символы в логине')
      break;
    case 200:
      let data = await result.json()
      message.info('Здравствуйте, '+data.name)
      localStorage.setItem('chatUserId', data.id)
      setUser(data.id)
      switchPage('chat')
      break;
    default:
      message.info('Ошибка. Повторите попытку позднее')
  }
}

const LoginPage = (props) => {

  return(
    <div className='login-background'>
      <p>Авторизация</p>
      <Input placeholder='Логин' className='log-input' id="loginInput"/>
      <Input.Password placeholder='Пароль' className='log-input' id="passwordInput"/>
      <Button 
        onClick={() => props.switchPage('registration')} 
        type='link' 
        style={{alignSelf:'flex-start'}}>
          Регистрация
      </Button>
      <Button
        onClick={() => authentificate(
          document.getElementById('loginInput').value,
          document.getElementById('passwordInput').value,
          props.setUser, 
          props.switchPage)} 
        type='primary' 
        shape='round'>
          Войти
        </Button>
    </div>
  )
}

export default LoginPage