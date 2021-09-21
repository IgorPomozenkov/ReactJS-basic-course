import React, { useEffect, useState } from 'react';
import './Message.css'

export default function Message({text, author}) {
    const [className, setClassName] = useState('messageText');

    useEffect(() => {
        if(author === 'Bot') {
            setClassName('messageBot');
        }else setClassName('messageText');
    }, [author]);

    return (
        <>
            <p className={className}>{text}</p>
        </>
    )
}