import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Modal } from 'react-native';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import {ChatBox} from '../components/chatbot'

export default function TelaPrincipal() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { cartItems, setCartItems, user } = useContext(AppContext);
  const [productQuestions, setProductQuestions] = useState([]);



  
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  
  const renderCard = (product, index) => {
    const handleCardPress = () => {
      setSelectedProduct(product);
    };

  
    return (
      <TouchableOpacity
        key={index}
        style={styles.card}
        onPress={() => {
          setSelectedProduct(product);
          setIsModalVisible(true);
        }}
      >
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: product.image }} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.category}>{product.category}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const addToCart = () => {
    if (selectedProduct) {
      const newItem = { ...selectedProduct, quantity: 1 };
      setCartItems([...cartItems, newItem]);
      setSelectedProduct(null);
      setIsModalVisible(false);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {user && (
          <>
            <Image style={styles.userImage} source={{ uri: user.photoURL }} />
            <Text style={styles.userName}>{user.displayName}</Text>
          </>
        )}
      </View>
      <Text style={styles.heading}>Tela Principal</Text>
      <ScrollView>
        <View style={styles.gridContainer}>
          {products.map((product, index) => renderCard(product, index))}
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedProduct && (
              <>
                <Text style={styles.modalTitle}>{selectedProduct.title}</Text>
                <Text style={styles.modalPrice}>${selectedProduct.price}</Text>
                <Text style={styles.modalDescription}>{selectedProduct.description}</Text>
                <Text style={styles.modalCategory}>{selectedProduct.category}</Text>

                <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
                  <Text style={styles.addToCartButtonText}>Adicionar ao carrinho</Text>
                </TouchableOpacity>

              </>
            )}

            <TouchableOpacity style={styles.closeModalButton} onPress={closeModal}>
              <Text style={styles.closeModalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
     
      <ChatBox
        user={user}
        product={products}
      />

      <View style={styles.productQuestionsContainer}>
        {productQuestions.map((item, index) => (
          <View key={index} style={styles.productQuestionItem}>
            <Text style={styles.productQuestion}>{item.question}</Text>
            <Text style={styles.productAnswer}>{item.answer}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  
  
  
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  gridContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  card: {
    width: 300,
    height: 400,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  contentContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    marginBottom: 5,
  },
  category: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 10,
  },
  askQuestionButton: {
    backgroundColor: '#3e8eb5',
    padding: 8,
    borderRadius: 5,
  },
  askQuestionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  modalCategory: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: '#3e8eb5',
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
  addToCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeModalButton: {
    backgroundColor: 'gray',
    padding: 8,
    borderRadius: 5,
  },
  closeModalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  productQuestionsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  productQuestionItem: {
    marginBottom: 10,
  },
  productQuestion: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  productAnswer: {
    fontSize: 12,
    marginLeft: 10,
  },
});
