import React from 'react';

const Login: React.FunctionComponent<{}> = () => {
    return (
        <div className="login">
            <p>Bejelentkezés</p>
            <p><input placeholder="E-mail cím"/></p>
            <p><input placeholder="Jelszó"/></p>
            <p className="login-button"><button>Belépés</button></p>
        </div>
    );
  }
  
  export default Login;