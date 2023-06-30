import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { AppContext } from '../context/AppContext';
import { Ionicons } from '@expo/vector-icons';

export default function Contacts({ navigation }) {
  const { cartItems, setCartItems } = useContext(AppContext);
  const [selectedItem, setSelectedItem] = useState(null);

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      const price = item.price || 0;
      total += price * item.quantity;
    });
    return total.toFixed(2);
  };

  const openItemDetails = (item) => {
    setSelectedItem(item);
  };

  const closeItemDetails = () => {
    setSelectedItem(null);
  };

  const increaseQuantity = (item) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        const quantity = cartItem.quantity !== null ? cartItem.quantity + 1 : 1;
        return { ...cartItem, quantity };
      }
      return cartItem;
    });
    setCartItems(updatedCartItems);
  };

  const decreaseQuantity = (item) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        const quantity = cartItem.quantity !== null && cartItem.quantity > 1 ? cartItem.quantity - 1 : 1;
        return { ...cartItem, quantity };
      }
      return cartItem;
    });
    setCartItems(updatedCartItems);
  };

  const removeFromCart = (item) => {
    const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(updatedCartItems);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Carrinho</Text>
      <ScrollView style={styles.scrollView}>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item, index) => (
              <View key={index} style={styles.card}>
                <TouchableOpacity style={styles.itemContainer} onPress={() => openItemDetails(item)}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity onPress={() => decreaseQuantity(item)}>
                        <Ionicons name="remove-circle-outline" size={24} color="black" />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <TouchableOpacity onPress={() => increaseQuantity(item)}>
                        <Ionicons name="add-circle-outline" size={24} color="black" />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
                  </View>
                  <TouchableOpacity onPress={() => removeFromCart(item)}>
                    <Ionicons name="trash-outline" size={24} color="red" />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            ))}
            <Text style={styles.total}>Total: R$ {calculateTotal()}</Text>
          </>
        ) : (
          <Text style={styles.emptyCart}>Carrinho vazio</Text>
        )}
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate('Information')} style={styles.itemLink}>
        <Text style={styles.itemLinkText}>Informações</Text>
      </TouchableOpacity>

      <Modal visible={selectedItem !== null} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{selectedItem?.title}</Text>
          <Image source={{ uri: selectedItem?.image }} style={styles.modalImage} />
          <Text style={styles.modalPrice}>R$ {selectedItem?.price.toFixed(2)}</Text>
          <Text style={styles.modalDescription}>{selectedItem?.description}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={closeItemDetails}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  quantityText: {
    fontSize: 16,
    marginRight: 10,
    color: 'black',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'black',
  },
  emptyCart: {
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 20,
    color: 'black',
  },
  itemLink: {
    marginTop: 20,
  },
  itemLinkText: {
    color: 'blue',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'black',
  },
});
