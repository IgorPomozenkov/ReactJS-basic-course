import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useParams, /*useHistory,*/ Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { TextField, Button, List, ListItem, IconButton, ListItemSecondaryAction } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { ref, set, onValue } from "firebase/database";
import { db } from "../services/firebase"

import Message from './Message';
import { addChat, deleteChat } from '../store/chats/actions';
import { addMessageWithReply } from '../store/messages/actions';
import { selectChats } from '../store/chats/selectors';
import { selectMessages } from '../store/messages/selectors';
import { selectProfile } from '../store/profile/selectors';

function Chats() {
    const { chatId } = useParams();
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    //const history = useHistory();
    const { name } = useSelector(selectProfile, shallowEqual);
    //const chatsList = useSelector(selectChats, shallowEqual);
    //const messagesList = useSelector(selectMessages, shallowEqual);
    const [chatsList, setChatsList] = useState([]);
    const [messagesList, setMessagesList] = useState([]);

    const [value, setValue] = useState('');
    const [chatValue, setChatValue] = useState('');

    useEffect(() => {
        const chatsDbRef = ref(db, 'chats');
        onValue(chatsDbRef, (snapshot) => {
            const data = snapshot.val();
            setChatsList(Object.values(data || {}));
        });
    }, []);

    const handleAddChat = (name) => {
        const newId = `chat_${Date.now()}`;
        const chatsDbRef = ref(db, `chats/${newId}`);
        set(chatsDbRef, {
            id: newId,
            name: name,
        });
        //dispatch(addChat(name));
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
        const messagesDbRef = ref(db, `messages/${chatId}`);
        onValue(messagesDbRef, (snapshot) => {
            const data = snapshot.val();
            setMessagesList(Object.values(data || {}));
        });
    }, [chatId]);

    const handleAddMessage = () => {
        if(value) {
            const newId = `message_${Date.now()}`;
            const messagesDbRef = ref(db, `messages/${chatId}/${newId}`);
            set(messagesDbRef, {
                id: newId,
                text: value,
                author: 'Human',
            });
            //dispatch(addMessageWithReply(chatId, value, 'Human', name));
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
                {!chatId && <form className="appMain__form" onSubmit={chatSubmit}>
                    <TextField type="text" label="Chat" variant="outlined" value={chatValue} onChange={chatChange} />
                    <Button type="submit" disabled={!chatValue} variant="outlined">Add<br/>chat</Button>
                </form>}
                {!!chatId && (
                    <>
                    <form className="appMain__form" onSubmit={handleSubmit}>
                        <TextField type="text" fullWidth inputRef={inputRef} autoFocus={true} label="Message" variant="outlined" value={value} onChange={handleChange} />
                        <Button type="submit" variant="outlined">Add message</Button>
                    </form>
                    <div className="appMain__messenges">
                        {(messagesList || []).map((message, idx) => <Message key={idx} text={message.text} author={message.author} />)}
                    </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Chats