import React, {useState, useEffect} from 'react';
import { Col, Row } from 'antd';
import './Feed.css'


const Feed = (props) => {
  const [userName, setUserName] = useState(null)
  const [ex1, setEx1] = useState(null)
  const [ex2, setEx2] = useState(null)
  useEffect(()=>{
    async function getUserName(){
      let url = 'http://localhost:5000/user_name'
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          id: props.user
        })
      })
      const data = await res.json()
      setUserName(data.name)
      setEx1(data.ex1)
      setEx2(data.ex2)
    }
    getUserName()
  }, [])
  const execGenerator = (ex) => {
    return ex.text.map((e)=>{
      return <>{e}<br/></>
    })
  }
  return(
    <div className='feed-layout'>
      <Row>
        <Col span={10} className='feed-header'>
          Привет, {userName}!<br/> Отличного тебе дня
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Row>
            <div className='info-block motivation-text'>
              Ты отлично справляешься<br/>
              Продолжай в том же духе и главное -<br/> верь в себя

            </div>
          </Row>
          <Row className='info-block'>
            <div class="ex-header">Упражнение "{ex1 ? ex1.name : null}"</div>
            <div style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{ex1 ? execGenerator(ex1) : null}</div>
          </Row>

        </Col>
        <Col span={12}>
        <Row>
          <Col onClick={() => {props.setPart('chat'); props.setSelected('1')}} span={10} className='info-block talk-button'>
            поговорить<br/> с ease
          </Col>
          <Col span={10} className='info-block help-button'>
          <a className='text' href="tel:+73022401483">
            мне нужна срочная помощь
          </a>
          </Col>
        </Row>
        <Row className='info-block'> 
          <div class="ex-header">Упражнение "{ex2 ? ex2.name : null}"</div>
          <div style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{ex2 ? execGenerator(ex2) : null}</div>
        </Row>
        </Col>
      </Row>
    </div>
  )
}

export default Feed