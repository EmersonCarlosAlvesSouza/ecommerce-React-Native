import React, { createContext, useState } from 'react';
import firebase from '../modules/firebase';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      // O login foi bem-sucedido, você pode adicionar lógica adicional aqui se necessário
      console.log('Login bem-sucedido:', userCredential.user);
      setUser(userCredential.user); // Salva os dados do usuário no estado
    } catch (error) {
      // Ocorreu um erro durante o login, você pode tratar o erro aqui
      console.error('Erro no login:', error);
      throw error; // Lança o erro para ser capturado no componente
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const userCredential = await firebase.auth().signInWithPopup(provider);
      // O login com o Google foi bem-sucedido, você pode adicionar lógica adicional aqui se necessário
      console.log('Login com o Google bem-sucedido:', userCredential.user);
      setUser(userCredential.user); // Salva os dados do usuário no estado
    } catch (error) {
      // Ocorreu um erro durante o login com o Google, você pode tratar o erro aqui
      console.error('Erro no login com o Google:', error);
      throw error; // Lança o erro para ser capturado no componente
    }
  };

  return (
    <AppContext.Provider value={{ cartItems, setCartItems, user, login, loginWithGoogle }}>
      {children}
    </AppContext.Provider>
  );
};
