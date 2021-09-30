import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { TextField, Button } from '@material-ui/core';
import { ref, set, onValue } from "firebase/database";
import { db } from "../services/firebase"
import { changeName } from "../store/profile/actions";
import { selectProfile } from '../store/profile/selectors';
import './Profile.css';

export default function Profile({ onLogout }) {
    const dispatch = useDispatch();
    //const { showName, name } = useSelector(selectProfile, shallowEqual);
    const [value, setValue] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        const userDbRef = ref(db, 'user');
        onValue(userDbRef, (snapshot) => {
            const data = snapshot.val();
            setName(data?.username || '');
        });
    }, []);

    // const setShowName = () => {
    //     dispatch(toggleShowName);
    // }

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //dispatch(changeName(value));
        setValue('');
        set(ref(db, 'user'), {
            username: value,
        });
    }

    const handleClick = () => {
        onLogout();
    }

    return (
        <div className="profile">
            <form className="profile__form" onSubmit={handleSubmit}>
                <TextField type="text" label="Name" value={value} onChange={handleChange} />
                <Button type="submit" disabled={!value} variant="outlined">Change name</Button>
            </form>
            <div className="profile__name">
                <p>My name: <span className="name">{name}</span></p>
            </div>
            <Button variant="outlined" onClick={handleClick}>Logout</Button>
        </div>
    )
}