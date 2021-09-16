import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, Redirect } from "react-router-dom";
import { TextField, Button, List, ListItem, ListItemText } from '@material-ui/core';
import Message from './Message';

const initialMessages = {
    'chat_1': [],
    'chat_2': [],
    'chat_3': [],
}
const initialChats = [
    { name: 'Chat 1', id: 'chat_1'},
    { name: 'Chat 2', id: 'chat_2'},
    { name: 'Chat 3', id: 'chat_3'}
]

function Chats() {
    const { chatId } = useParams();
    const inputRef = useRef(null);
    const [value, setValue] = useState('');
    const [messageList, setMessageList] = useState(initialMessages);
    const [chatsList, setchatsList] = useState(initialChats);

    const addMessage = () => {
        // event.preventDefault();
        if(value) {
            setMessageList(messages => ({...messages,
                [chatId]: [...messages[chatId], { text: value, author: 'Human' },],
            }));
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
        let timeout;
        if(!!chatId && !!messageList[chatId] && messageList[chatId][messageList[chatId].length - 1]?.author === 'Human') {
            timeout = setTimeout(() => {
                setMessageList(messages => ({...messages,
                    [chatId]: [...messages[chatId], { text: 'I am bot', author: 'Bot'},],
                }));
            }, 1500)
        }
        return () => clearTimeout(timeout);
    }, [messageList, chatId]);

    useEffect(() => {
        if(!!messageList[chatId] ) {
            inputRef.current.focus();
        }
    }, [messageList, chatId])

    if(!messageList[chatId] && !!chatId) {
        return <Redirect to="/chats" />
    }

    return (
        <div className="appMain__messenger">
            <List className="appMain__Left">
                { chatsList.map(chat => <ListItem key={chat.id} button divider><Link to={`/chats/${chat.id}`}>{chat.name}</Link></ListItem>) }
            </List>
            <div className="appMain__Right">
                {!!chatId && !!messageList[chatId] && (
                    <>
                    <form className="appMain__form" onSubmit={handleSubmit}>
                        <TextField type="text" fullWidth inputRef={inputRef} autoFocus={true} label="Message" variant="outlined" value={value} onChange={handleChange} />
                        <Button type="submit" variant="outlined">Add message</Button>
                    </form>
                    <div className="appMain__messenges">
                        { messageList[chatId].map((message, idx) => <Message key={idx} text={message.text} />) }
                    </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Chats