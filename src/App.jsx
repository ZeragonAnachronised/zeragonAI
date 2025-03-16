import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

function App() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [socket, setSocket] = useState(null)
  const [topK, setTopK] = useState(0.5)

  useEffect(() => {
    const newSocket = io('http://localhost:5000')
    setSocket(newSocket)

    newSocket.on('response', (data) => {
      console.log('Получен ответ от сервера:', data)
      setResponse(data)
    })

    return () => newSocket.close()
  }, [])

  const sendMessage = () => {
    if (socket && message) {
      socket.emit('message', topK + '=' + message)
      setMessage('')
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', width: 'fit-content', margin: 'auto', textAlign: 'center' }}>
      <h1>ZERAGON</h1>
      <h3>Интеллектуальный текстовый помощник</h3>
      <h2>Проект Иоаниди Ильи</h2>
      <input
        type='range'
        min={0.1}
        max={0.8}
        step={0.05}
        value={topK}
        onChange={e => setTopK(e.target.value)}
      /> <h3>top_k: {topK}</h3> <br/>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Введите сообщение"
        style={{ padding: '10px', width: '300px', marginRight: '10px' }}
      />
      <button onClick={sendMessage} style={{ padding: '10px 20px' }}>
        Отправить
      </button>
      <div style={{ marginTop: '20px' }}>
        <h2>Ответ от сервера:</h2>
        <p>{response}</p>
      </div>
    </div>
  )
}

export default App