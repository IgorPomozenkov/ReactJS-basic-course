import { React, useState } from "react"
import { Link, useHistory } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core";
import { login, signUp } from "../services/firebase";
import './Home.css';

export default function Home() {
    const history = useHistory()
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const hlpLogin = history.location.pathname === '/login';
    const hlpSignup = history.location.pathname === '/signup';

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePassChange = (e) => {
        setPass(e.target.value);
    }

    const handleClick = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setError('');
    }

    const handleLogin = async (email, pass) => {
        try {
            await login(email, pass);
        } catch (e) {
            console.log(e);
            setError(e.message);
        }
    }

    const handleSignUp = async (email, pass) => {
        try {
            await signUp(email, pass);
        } catch (e) {
            console.log(e);
            setError(e.message);
        }
    }

    const handleSubmit = () => {
        if(!email && pass) setError('Введите email!');
        if(email && !pass) setError('Введите пароль!');
        if(!email && !pass) setError('Введите email и пароль!');
        
        if(hlpLogin && email && pass) {
            handleLogin(email, pass);
            setEmail('');
            setPass('');
        }
        if(hlpSignup && email && pass) {
            handleSignUp(email, pass);
            setEmail('');
            setPass('');
        }
    }

    return (
        <div className="homePage">
            <h2>My First React App</h2>
            <nav className="homePage__nav">
                <Link to="/login">Авторизоваться</Link>
                <Link to="/signup">Зарегистрироваться</Link>
            </nav>
            {(hlpLogin || hlpSignup) && (
                <div className="homePage__dialog">
                <Button variant="outlined" color="primary" onClick={handleClick}>Click me</Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText>
                        <TextField type="email" name="email" label="Email" required fullWidth autoFocus margin="dense" value={email} onChange={handleEmailChange} />
                        <TextField type="password" label="Password" required fullWidth margin="dense" value={pass} onChange={handlePassChange} />
                        <p className="dialogError">{error}</p>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" color="primary" onClick={handleSubmit}>Submit</Button>
                        <Button color="primary" onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
                </div>
            )}
        </div>
    )
}