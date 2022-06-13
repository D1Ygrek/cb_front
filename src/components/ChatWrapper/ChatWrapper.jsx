import React, {useState} from 'react';
import Chat from '../Chat/Chat';
import Feed from '../Feed/Feed';
import { Layout, Menu } from 'antd';
import './ChatWrapper.css'

import { HomeSVG, ChatSVG } from '../../icons/home';

const { Sider } = Layout

const ChatWrapper = (props) => {
  const [part, setPart] = useState('feed')
  const [collapsed, setCollapsed] = useState(false)
  const [selected, setSelected] = useState('2')

  let mW = collapsed ? '95%':'88%'
  let clr = collapsed ? 'white':'black'


  return(
    <div className='chat-wrapper'>
      <Sider 
        className='menu-main' 
        collapsible 
        collapsed={collapsed} 
        onCollapse={value => setCollapsed(value)} 
        style={{background:'none'}}>
          <Menu defaultSelectedKeys={['2']} selectedKeys={[selected]} mode="inline">
            <div className='logo'></div>
            <Menu.Item onClick={() => {setPart('feed'); setSelected('2')}} key={'2'} icon = {<HomeSVG/>} style={{color:clr}}>Главная</Menu.Item>
            <Menu.Item onClick={() => {setPart('chat'); setSelected('1')}} key={'1'} icon = {<ChatSVG/>} style={{color:clr}}>Чат</Menu.Item>
          </Menu>
      </Sider>
      <div style = {{minWidth: mW}} className='content'>
        {part === 'chat' ? <Chat user = {props.user} switchPage= {props.setPage}/> : null}
        {part === 'feed' ? <Feed user = {props.user} setPart={setPart} setSelected={setSelected}/> : null}
      </div>
    </div>
    )
}

export default ChatWrapper