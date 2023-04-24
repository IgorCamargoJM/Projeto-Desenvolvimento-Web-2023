import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';

function LoginPage() {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
  
    // Função que busca os dados do usuário no Firestore
    function getUserData() {
      if (user) {
        db.collection('users').doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              setUserData(doc.data());
            } else {
              console.log('Usuário não encontrado no Firestore');
            }
          })
          .catch((error) => {
            console.log('Erro ao buscar dados do usuário:', error);
          });
      }
    }
  
    // Utiliza o hook useEffect para buscar os dados do usuário após o carregamento do componente
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          setUser(authUser);
        } else {
          setUser(null);
        }
      });
      return () => {
        unsubscribe();
      };
    }, []);
  
    useEffect(() => {
      getUserData();
    }, [user]);
  
    return (
      <div>
        <h2>Bem-vindo(a), {userData?.nome} {userData?.sobrenome}!</h2>
        <p>Data de nascimento: {userData?.dataNascimento}</p>
      </div>
    );
  }

export default LoginPage;