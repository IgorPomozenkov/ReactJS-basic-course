import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { TextField, Button, List, ListItem, IconButton, ListItemSecondaryAction } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Message from './Message';
import { addChat, deleteChat } from '../store/chats/actions';
import { addMessage } from '../store/messages/actions';

function Chats() {
    const { chatId } = useParams();
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const [value, setValue] = useState('');
    const [chatValue, setChatValue] = useState('');
    const { name } = useSelector(state => state.profile);
    const chatsList = useSelector(state => state.chats.chatsList);
    const messagesList = useSelector(state => state.messages.messagesList);

    const handleAddMessage = () => {
        if(value) {
            dispatch(addMessage(chatId, value, 'Human'));
        }
        setValue('');
        inputRef.current.focus();
    }

    const handleChange = (event) => {
        setValue(event.target.value);
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        handleAddMessage();
    }

    const handleAddChat = (name) => {
        dispatch(addChat(name));
        setChatValue('');
    }

    const handleDeleteChat = (id) => {
        dispatch(deleteChat(id));
    }

    const chatChange = (e) => {
        setChatValue(e.target.value);
    }

    const chatSubmit = (e) => {
        e.preventDefault();
        handleAddChat(chatValue);
    }
    
    useEffect(() => {
        let timeout;
        if(!!chatId && !!messagesList[chatId] && messagesList[chatId][messagesList[chatId].length - 1]?.author === 'Human') {
            timeout = setTimeout(() => {
                dispatch(addMessage(chatId, `Author: ${name}`, 'Bot'));
            }, 1000)
        }
        return () => clearTimeout(timeout);
    }, [messagesList, chatId, name, dispatch]);

    useEffect(() => {
        if(!!messagesList[chatId] ) {
            inputRef.current.focus();
        }
    }, [messagesList, chatId])

    if(!messagesList[chatId] && !!chatId) {
        debugger
        return <Redirect to="/chats" />
    }

    return (
        <div className="appMain__messenger">
            <List className="appMain__Left">
                {chatsList.map(chat => <ListItem key={chat.id} button divider>
                    <Link to={`/chats/${chat.id}`}>{chat.name}</Link>
                    <ListItemSecondaryAction children={<IconButton onClick={() => handleDeleteChat(chat.id)} edge="end" size='small'><DeleteIcon /></IconButton>} />
                </ListItem>)}
            </List>
            <div className="appMain__Right">
                {!chatId && <form className="appMain__form" onSubmit={chatSubmit}>
                    <TextField type="text" label="Chat" variant="outlined" value={chatValue} onChange={chatChange} />
                    <Button type="submit" disabled={!chatValue} variant="outlined">Add<br/>chat</Button>
                </form>}
                {!!chatId && !!messagesList[chatId] && (
                    <>
                    <form className="appMain__form" onSubmit={handleSubmit}>
                        <TextField type="text" fullWidth inputRef={inputRef} autoFocus={true} label="Message" variant="outlined" value={value} onChange={handleChange} />
                        <Button type="submit" variant="outlined">Add message</Button>
                    </form>
                    <div className="appMain__messenges">
                        {messagesList[chatId].map((message, idx) => <Message key={idx} text={message.text} author={message.author} />)}
                    </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Chats