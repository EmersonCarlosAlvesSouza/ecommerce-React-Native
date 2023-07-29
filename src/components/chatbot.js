import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, FlatList, Image } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import defaultUserImage from '../../assets/diegodefante.jpg';

export const ChatBox = ({ onSendMessage, user, product }) => {
  const [newMessage, setNewMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [openAiResponses, setOpenAiResponses] = useState([]); // Estado para armazenar as respostas da OpenAI

  console.log(openAiResponses);

  const askProductQuestion = async (question, productId) => {
    console.log(product)
    try {
      const apiKey = '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'; // Substitua YOUR_API_KEY pela sua chave de API da OpenAI

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      };

      const data = {
        "prompt": `lista de produtos: ${JSON.stringify(productId)} \nQuestion: ${question}`,
        "model": "text-davinci-003",
        "max_tokens": 1024,
        "temperature": 0,
      };

      const apiUrl = 'https://api.openai.com/v1/completions';

      const response = await axios.post(apiUrl, data, { headers });

      if (response.data && response.data.choices && response.data.choices.length > 0) {
        const answer = response.data.choices[0].text.trim();
        
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: 'answer', text: answer },
        ]);
      } else {
        throw new Error('Resposta vazia ou formato de resposta inválido.');
      }
    } catch (error) {
      console.error('Erro ao obter resposta da API da OpenAI:', error);
    }
  };

  const handleSend = () => {
    if (newMessage.trim() !== '') {
      // Adicionar a pergunta ao array de mensagens
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'question', text: newMessage },
      ]);
  
      askProductQuestion(newMessage, product);
  
      setNewMessage('');
  
      onSendMessage(newMessage);
    }
  };
  
  const closeModal = () => {
    setModalVisible(false);
    setNewMessage('');
  };

  const renderOpenAIImage = () => {
    // Exibir a imagem ou elemento visual da OpenAI, se desejar
    // Por exemplo, você pode retornar um ícone ou uma imagem específica da OpenAI
    return <Image source={defaultUserImage} style={styles.openAIImage} />;
  };

  const renderUserImage = () => {
    if (user && user.photoURL) {
      return (
        <View style={styles.userImageContainer}>
          <Image
            source={{ uri: user.photoURL }}
            style={styles.userImage}
            onError={(error) => console.log('Erro ao carregar a imagem do usuário:', error)}
          />
        </View>
      );
    } else {
      return <Image source={defaultUserImage} style={styles.userImage} />;
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.messageContainer}>
      {item.type === 'question' ? (
        <View style={styles.userMessageContainer}>
          <View style={styles.clientMessage}>
            <Text numberOfLines={100} style={styles.messageText}>{item.text}</Text>
          </View>
          <View style={styles.userImageContainer}>
            {/* Render the user image here */}
            {renderUserImage()}
          </View>
        </View>
      ) : (
        <View style={styles.botMessageContainer}>
          <View style={styles.openAIImageContainer}>
            {/* Render the OpenAI image here */}
            {renderOpenAIImage()}
          </View>
          <View style={styles.botMessage}>
            <Text numberOfLines={100} style={styles.botMessageText}>
              {item.text}
            </Text>
            {item.responses && item.responses.length > 0 && (
              <View style={styles.openAIResponse}>
                {item.responses.map((response, index) => (
                  <Text key={index} style={styles.openAIText}>
                    {response.text}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={() => setModalVisible(true)}>
        <Ionicons name="chatbubbles" size={30} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chat com a OpenAI</Text>
            <FlatList
              data={[...messages, ...openAiResponses].reverse()} // Combine messages and OpenAI responses
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.messagesContainer}
              inverted // Inverte a ordem da lista para exibir corretamente
            />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.modalInput}
                placeholder="Digite sua pergunta..."
                value={newMessage}
                onChangeText={setNewMessage}
                autoFocus={true}
              />
              <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                <Ionicons name="send" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.modalCancelButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
    
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#3e8eb5',
    borderRadius: 25,
    position: 'absolute',
    right: 15,
    left:110,
    bottom: -1, // Ajuste o valor de bottom para posicionar o ícone para cima
    zIndex: 1,
  },
  
  chatMessagesContainer: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  chatMessage: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  userMessageContainer: {
    flexDirection: 'row', // Alteração para posicionar a imagem do usuário à direita
    alignItems: 'center',
  },
  openAIImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 10,
  },
  
  openAIImage: {
    width: '100%',
    height: '100%',
  },
  openAIResponse: {
    marginTop: 5, // Add some margin between the bot message and OpenAI response
  },
  openAIText: {
    color: '#000000',
    fontSize: 16,
  },
  clientMessage: {
    backgroundColor: '#3e8eb5',
    alignSelf: 'flex-end',
    marginRight: 10,
    marginLeft: 50,
  },
  botMessage: {
    backgroundColor: '#E0E0E0', // Change background color to match user messages
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#D3D3D3',
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 5,
  },
  sendButton: {
    backgroundColor: '#3e8eb5',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  sendButton: {
    backgroundColor: '#3e8eb5',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    maxHeight: '70%',
    justifyContent: 'space-between', // Adicionamos essa propriedade para separar o TextInput e a FlatList
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Align items to the end of the row
    marginBottom: 5, // Add some margin to separate messages
  },
  clientMessage: {
    backgroundColor: '#3e8eb5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10, // Add margin to the right to separate the image from the message
  },
  botMessage: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10,
    flex: 1,
  },
  botMessageContainer: {
    marginRight:105,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    maxWidth: '70%',
    alignSelf: 'flex-start', // Adicione a propriedade alignSelf para alinhar à esquerda
  },
  botMessageText: {
    color: '#000000',
    fontSize: 16,
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  messageContent: {
    flex: 1,
    flexDirection: 'row', // Adicionamos um flexDirection para que o ícone de envio fique ao lado da caixa de entrada de texto
    alignItems: 'center', // Centraliza verticalmente o ícone de envio e a caixa de entrada de texto
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  modalInput: {
    flex: 1, // Ocupa todo o espaço disponível horizontalmente
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  modalButton: {
    backgroundColor: '#3e8eb5',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  userImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden', // Ensure the image is clipped within the container
  },
  userImage: {
    width: '100%',
    height: '100%',
  },
});
