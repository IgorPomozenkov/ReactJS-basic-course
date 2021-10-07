import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { TextField, Button } from '@material-ui/core';
import { changeNameFb, initName } from "../store/profile/actions";
import { selectProfile } from '../store/profile/selectors';
import { logOut } from "../services/firebase";
import './Profile.css';

export default function Profile() {
    const dispatch = useDispatch();
    const { name } = useSelector(selectProfile, shallowEqual);
    const [value, setValue] = useState('');

    useEffect(() => {
        dispatch(initName());
        // eslint-disable-next-line
    }, []);

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(changeNameFb(value));
        setValue('');
    }

    const handleLogout = async () => {
        try {
            await logOut();
        } catch (e) {
          console.log(e);
        }
    }

    const handleClick = () => {
        const res = window.confirm('Вы точно хотите выйти?');
        if(res) handleLogout();
    }

    return (
        <div className="profile">
            <form className="profile__form" onSubmit={handleSubmit}>
                <TextField type="text" label="Name" value={value} onChange={handleChange} />
                <Button type="submit" disabled={!value} variant="outlined">Change name</Button>
            </form>
            <p className="profile__name">My name: <span className="name">{name}</span></p>
            <Button variant="outlined" data-testid="button-test" onClick={handleClick}>Logout</Button>
        </div>
    )
}