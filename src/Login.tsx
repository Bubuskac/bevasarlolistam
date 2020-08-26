import React, { FormEvent, KeyboardEvent, Component } from 'react';
import MainView from './MainView';
import config from './api/server.json';

interface LoginState {
    email: string,
    password: string,
    token: string,
    message: string
}

interface LoginProps {
}

class Login extends Component<LoginProps, LoginState> {

    constructor(props:object) {
        super(props);
        let savedToken:string|null = localStorage.getItem('token');
        if (!savedToken) {
            savedToken = '';
        }
        this.state = {
            email: '',
            password: '',
            token: savedToken,
            message: ''
        }
        
    }

    async loginer() {
        const {email, password} = this.state;
        let response = await fetch(`http://${config.host}:${config.port}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                method: 'login',
                email: email,
                password: password
            })
        });
        let data = await response.json();
        if (data.success) {
            this.setState({
                token : data.token,
                password:'',
                email: '',
                message: ''
            });
            localStorage.setItem('token', data.token);
        } else {
            this.setState({
                message: 'Sikertelen belépés'
            });
        }
    }
    
    render() {
        const {email, password, token, message} = this.state;
        return (
            <section>
                {this.state.token && <button className="logout" onClick={() => {
                    this.setState({token: ''});
                    localStorage.clear();
                }}>&#x2190;</button>}
                {token ? <MainView token={token} /> : 
                <div className="login" onKeyPress={(e: KeyboardEvent) => {
                    if (e.key === 'Enter') {
                        this.loginer();
                    }
                }}>
                    <p>Bejelentkezés</p>
                    {message && <p>{message}</p>}
                    <p>
                        <input placeholder="E-mail cím" id="email" 
                            value={email}
                            onChange={(e: FormEvent<HTMLInputElement>) => this.setState({email: e.currentTarget.value})} />
                    </p>
                    <p>
                        <input placeholder="Jelszó" id="password" type="password" 
                            value={password} 
                            onChange={(e: FormEvent<HTMLInputElement>) => this.setState({password: e.currentTarget.value})}/>
                    </p>
                    <p className="login-button">
                        <button onClick={() => {
                            this.loginer();
                        }}>
                            Belépés
                        </button>
                    </p>
                </div>}
            </section>
        );
    }
  }
  
  export default Login;