import React, { useState, useContext } from 'react';
import { View, TextInput, Text, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext'
import TouchableScale from 'react-native-touchable-scale';

const LoginScreen = ({ navigation }) => {
  const { login, loginWithGoogle } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (email === '' || password === '') {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      navigation.navigate('TelaPrincipal');
    } catch (error) {
      console.error('Erro na autenticação:', error);
    }

    setLoading(false);
  };

  const handleLoginWithGoogle = async () => {
    setLoading(true);

    try {
      await loginWithGoogle();
      navigation.navigate('TelaPrincipal');
    } catch (error) {
      console.error('Erro na autenticação com o Google:', error);
    }

    setLoading(false);
  };

  return (
    <ImageBackground
      source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/todolist-e1acf.appspot.com/o/Designing%20an%20eCommerce%20Web-Based%20Product_2088x1252%20(1).webp?alt=media&token=152f7dd8-b118-4b39-852c-6c6518c14b53' }}
      style={styles.backgroundImage}
    >
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.7)']}
        style={styles.container}
      >
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <AntDesign name="user" size={24} color="white" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <AntDesign name="lock" size={24} color="white" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableScale
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
            activeScale={0.9}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={styles.buttonText}>Entrar</Text>
            )}
          </TouchableScale>
          <TouchableScale
            style={styles.googleButton}
            onPress={handleLoginWithGoogle}
            disabled={loading}
            activeScale={0.9}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <AntDesign name="google" size={24} color="white" style={styles.googleIcon} />
            )}
          </TouchableScale>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: 'white',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  button: {
    flex: 1,
    backgroundColor: '#3b5998',
    borderRadius: 10,
    paddingVertical: 12,
    marginRight: 12,
  },
  googleButton: {
    flex: 1,
    backgroundColor: '#db4437',
    borderRadius: 10,
    paddingVertical: 12,
    marginLeft: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  googleIcon: {
    alignSelf: 'center',
  },
});
export default LoginScreen;
