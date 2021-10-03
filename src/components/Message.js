import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteMessageFb } from '../store/messages/actions';
import './Message.css';

export default function Message({chatId, id, text, author}) {
    const dispatch = useDispatch();
    const [className, setClassName] = useState('messageText');

    useEffect(() => {
        if(author === 'Bot') {
            setClassName('messageBot');
        }else setClassName('messageText');
    }, [author]);

    const handleDeleteMessage = () => {
        dispatch(deleteMessageFb(chatId, id));
    }

    return (
        <div className="messageWrap">
            <p className={className}>{text}</p>
            <div className="messageDel">
                <IconButton onClick={handleDeleteMessage} size='small'><DeleteIcon /></IconButton>
            </div>
        </div>
    )
}