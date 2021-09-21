import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { TextField, Button } from '@material-ui/core';
import { changeName, toggleShowName } from "../store/profile/actions";
import './Profile.css';
import { selectProfile } from '../store/profile/selectors';

export default function Profile() {
    const dispatch = useDispatch();
    const { showName, name } = useSelector(selectProfile, shallowEqual);
    const [value, setValue] = useState('');

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