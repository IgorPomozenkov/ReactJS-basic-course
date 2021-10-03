import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useParams, /*useHistory,*/ Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { TextField, Button, List, ListItem, IconButton, ListItemSecondaryAction } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import Message from './Message';
import { addChatFb, deleteChatFb, initChats } from '../store/chats/actions';
import { addMessageFb, initMessages } from '../store/messages/actions';
import { selectChats } from '../store/chats/selectors';
import { selectMessages } from '../store/messages/selectors';
import { selectProfile } from '../store/profile/selectors';

function Chats() {
    //const history = useHistory();
    const { chatId } = useParams();
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const { name } = useSelector(selectProfile, shallowEqual);
    const chatsList = useSelector(selectChats, shallowEqual);
    const messagesList = useSelector(selectMessages, shallowEqual);
    const [value, setValue] = useState('');
    const [chatValue, setChatValue] = useState('');

    useEffect(() => {
        dispatch(initChats());
        dispatch(initMessages());
        // eslint-disable-next-line
    }, []);

    const handleAddChat = (e) => {
        e.preventDefault();
        dispatch(addChatFb(chatValue));
        setChatValue('');
    }

    const handleDeleteChat = (id) => {
        dispatch(deleteChatFb(id));
    }

    const chatChange = (e) => {
        setChatValue(e.target.value);
    }

    const handleAddMessage = (e) => {
        e.preventDefault();
        if(value) {
            dispatch(addMessageFb(chatId, value, 'Human', name));
        }
        setValue('');
        inputRef.current.focus();
    }

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const chatExists = useMemo(() => (chatsList || []).find(({ id }) => id === chatId), [chatId, chatsList]);

    useEffect(() => {
        if(!!chatId && chatExists) {
            inputRef.current.focus();
        }
    }, [chatId, chatExists])

    if(chatId && !chatExists) {
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
                {!chatId && <form className="appMain__form" onSubmit={handleAddChat}>
                    <TextField type="text" label="Chat" variant="outlined" value={chatValue} onChange={chatChange} />
                    <Button type="submit" disabled={!chatValue} variant="outlined">Add<br/>chat</Button>
                </form>}
                {!!chatId && (
                    <>
                    <form className="appMain__form" onSubmit={handleAddMessage}>
                        <TextField type="text" fullWidth inputRef={inputRef} autoFocus={true} label="Message" variant="outlined" value={value} onChange={handleChange} />
                        <Button type="submit" variant="outlined">Add message</Button>
                    </form>
                    <div className="appMain__messages">
                        {(Object.values(messagesList[chatId] || {}) || []).map(message => <Message key={message.id} chatId={chatId} id={message.id} text={message.text} author={message.author} />)}
                    </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Chats