import React, { createContext, useState } from 'react';
import firebase from '../modules/firebase';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
     
      setUser(userCredential.user); 
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const userCredential = await firebase.auth().signInWithPopup(provider);
      console.log('Login com o Google bem-sucedido:', userCredential.user);
      setUser(userCredential.user); 
    } catch (error) {
      
      console.error('Erro no login com o Google:', error);
      throw error;
    }
  };

  return (
    <AppContext.Provider value={{ cartItems, setCartItems, user, login, loginWithGoogle }}>
      {children}
    </AppContext.Provider>
  );
};
