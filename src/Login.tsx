import React, { useState, FormEvent, FunctionComponent } from 'react';
import List from './List';

const Login: FunctionComponent<{}> = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    return (
        <section>
            {token !== '' ? <List /> : 
            <div className="login">
                <p>Bejelentkezés</p>
                <p>
                    <input placeholder="E-mail cím" id="email" 
                        value={email} onChange={(e: FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} />
                </p>
                <p>
                    <input placeholder="Jelszó" id="password" 
                        value={password} onChange={(e: FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}/>
                </p>
                <p className="login-button">
                    <button onClick={async (event) => {
                        let response = await fetch('http://localhost:8080', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                email: email,
                                password: password
                            })
                        });
                        let json = await response.json();
                        setToken(json.token);
                    }}>
                        Belépés
                    </button>
                </p>
            </div>}
        </section>
    );
  }
  
  export default Login;