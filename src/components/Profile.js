import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { TextField, Button } from '@material-ui/core';
import { changeName, toggleShowName } from "../store/profile/actions"
import './Profile.css'


export default function Profile() {
    const [value, setValue] = useState('');
    const { showName, name } = useSelector(state => state.profile);
    const dispatch = useDispatch();

    const setShowName = () => {
        dispatch(toggleShowName);
    }

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(changeName(value));
        setValue('');
    }

    return (
        <div className="profile">
            <form className="profile__form" onSubmit={handleSubmit}>
                <TextField type="text" label="Name" variant="outlined" value={value} onChange={handleChange} />
                <Button type="submit" disabled={!value} variant="outlined">Change name</Button>
            </form>
            <input type="checkbox" id="nameId" checked={showName} onChange={setShowName} />
            <label htmlFor="nameId">My name: </label>{showName && <span>{name}</span>}
        </div>
    )
}