import React, {useState} from 'react';
import { Layout } from 'antd';
import './App.css'
import LoginPage from './Login/Login';
import RegistrationPage from './Registration/Registration';
import Chat from './Chat/Chat';

const { Content } = Layout;

const checkUserLogged = (page, setPage, user, setUser) => {
  let userId = localStorage.getItem('chatUserId')
  console.log(userId)
  if(userId){
    console.log('hui')
    if (user === null){
      setUser(userId)
    }
    if (page === 'login'){
      setPage('chat')
    }
  }
  //console.log()
}

const App = () => {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('login')

  checkUserLogged(page, setPage, user, setUser)
  console.log(page)

  return(
    <Layout>
      <Content className="site-layout">
        <div className="site-layout-background">
          {page === 'login' ? <LoginPage switchPage = {setPage} setUser = {setUser}/> : null}
          {page === 'registration' ? <RegistrationPage switchPage = {setPage} setUser = {setUser}/> : null}
          {page === 'chat' ? <Chat/> : null}
        </div>
      </Content>
    </Layout>
  );
}

export default App