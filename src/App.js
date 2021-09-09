import './App.css';
import Message from './components/Message';
import React, { useEffect, useState, useRef } from 'react';
import { TextField, Button, List, ListItem, ListItemText } from '@material-ui/core';

function App() {
  const text = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure repudiandae aliquid quisquam, consectetur harum inventore, iusto ex, soluta eum dolorem quasi libero nostrum pariatur id delectus accusamus assumenda!';
  const [messageList, setMessageList] = useState([]);
  const [value, setValue] = useState('');
  const inputRef = useRef(null);
  const chatsList = [
    { name: 'chat1', id: 'chat_1'},
    { name: 'chat2', id: 'chat_2'},
    { name: 'chat3', id: 'chat_3'}
  ];

  const addMessage = () => {
    // event.preventDefault();
    if(value) {
      setMessageList(messages => [...messages,
        { text: value, author: 'Human' }
      ]);
    }
    setValue('');
    inputRef.current.focus();
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addMessage();
  }

  useEffect(() => {
    if(messageList[messageList.length - 1]?.author === 'Human') {
      setTimeout(() => {
        setMessageList(messages => [...messages,
          { text: 'I am bot', author: 'Bot'}
        ]);
      }, 1500)
    }
  }, [messageList]);

  // useEffect(() => {
  //   inputRef.current.focus();
  // }, [])

  return (
    <div className="app">
      <header className="app__header">
       <h3>My First React App</h3>
      </header>
      <main className="app__main container">
        <Message text={text} />
        <form className="app_form" onSubmit={handleSubmit}>
          <TextField type="text" fullWidth inputRef={inputRef} autoFocus={true} label="Message" variant="outlined" value={value} onChange={handleChange} />
          <Button type="submit" variant="outlined">Add message</Button>
        </form>
        <div className="app__messages">
          <List className="app__messagesLeft">
            { chatsList.map(chat => <ListItem key={chat.id} button divider><ListItemText primary={chat.name} /></ListItem>) }
          </List>
          <div className="app__messagesRight">
            { messageList.map((message, idx) => <Message key={idx} text={message.text} />) }
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App