import React from 'react';
import { Input, Button } from 'antd';
import './Registration.css'

async function register(){}

const RegistrationPage = (props) => {

  return(
    <div className='login-background'>
      <p>Регистрация</p>
      <Input style={{borderRadius:'1em'}} id="regInput"/>
      <Button onClick={() => props.switchPage('login')} type='link' style={{alignSelf:'flex-start'}}>Назад</Button>
      <Button type='primary' shape='round'>Зарегистрироваться</Button>
    </div>
  )
}

export default RegistrationPage