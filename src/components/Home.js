import { useState } from "react"

export default function Home({ onLogin, onSignUp, error }) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePassChange = (e) => {
        setPass(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setEmail('');
        setPass('');

        if(!!onLogin) {
            onLogin(email, pass);
        }else onSignUp(email, pass);
    }

    return (
        <>
            <h2>My First React App</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" value={email} onChange={handleEmailChange} />
                <input type="password" value={pass} onChange={handlePassChange} />
                <input type="submit" />
            </form>
            <p>{error}</p>
        </>
    )
}