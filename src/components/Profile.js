import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { TextField, Button, Checkbox, FormControlLabel } from '@material-ui/core';
import { changeName, toggleShowName } from "../store/profile/actions";
import { selectProfile } from '../store/profile/selectors';
import './Profile.css';

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
                <TextField type="text" label="Name" value={value} onChange={handleChange} />
                <Button type="submit" disabled={!value} variant="outlined">Change name</Button>
            </form>
            <div className="profile__name">
                <FormControlLabel label="My name:" control={<Checkbox color='primary' onChange={setShowName} checked={showName} />} />
                {showName && <span>{name}</span>}
            </div>
        </div>
    )
}