import './App.css';
import Message from './components/Message';
import React, { useEffect, useState } from 'react';

function App() {
  const text = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure repudiandae aliquid quisquam, consectetur harum inventore, iusto ex, soluta eum dolorem quasi libero nostrum pariatur id delectus accusamus assumenda!';
  const [messageList, setMessageList] = useState([]);
  const [value, setValue] = useState('');

  const addMessage = () => {
    // event.preventDefault();
    if(value) {
      setMessageList(messages => [...messages,
        { text: value, author: 'Human' }
      ]);
    }
    setValue('');
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  useEffect(() => {
    if(messageList[messageList.length - 1]?.author === 'Human') {
      setTimeout(() => {
        setMessageList(messages => [...messages,
          { text: 'I am bot', author: 'Bot'}
        ]);
      }, 1500)
    }
  }, [messageList])

  return (
    <div className="app">
      <header className="app__header">
       <h3>My First React App</h3>
      </header>
      <main className="app__main container">
        <Message text={text} />
        <form className="app_form" onSubmit={handleSubmit}>
          <input type="text" value={value} onChange={handleChange} />
          <button onClick={addMessage}>Add message</button>
        </form>
        <div className="app__messages">
          { messageList.map(message => <Message text={message.text} />) }
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App