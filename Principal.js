import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

function Principal() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
  
    // Função que é chamada quando o botão de login é clicado
    function handleLogin() {
      // Utiliza o Firebase Authentication para fazer o login
      auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Se o login for bem sucedido, redireciona para a página Principal
          history.push('/principal');
        })
        .catch((error) => {
          // Se ocorrer um erro no login, exibe uma mensagem na tela
          alert('Usuário não cadastrado');
        });
    }
  
    return (
      <div>
        <h2>Login</h2>
        <form>
          <div>
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="button" onClick={handleLogin}>Acessar</button>
        </form>
      </div>
    );
  }

  export default Principal