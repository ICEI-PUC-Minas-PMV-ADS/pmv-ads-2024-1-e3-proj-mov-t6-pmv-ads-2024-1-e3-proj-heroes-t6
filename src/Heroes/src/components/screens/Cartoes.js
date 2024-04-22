import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';

const CreditCardScreen = () => {
  const [creditCards, setCreditCards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCreditCard, setNewCreditCard] = useState({
    Titular: '',
    Numero: '',
    Validade: '',
    cvv: ''
  });

  // ver cartões
  const loadCreditCards = () => {

    const mockCreditCards = [
      { id: 1, Titular: 'Gustavo', Numero: '1234 5678 9012 3456', Validade: '12/25', cvv: '123' },
      { id: 2, Titular: 'Bruno', Numero: '9876 5432 1098 7654', Validade: '06/23', cvv: '456' }
    ];
    setCreditCards(mockCreditCards);
  };

  useEffect(() => {
    loadCreditCards();
  }, []);

  // adicionar novo cartão
  const addCreditCard = () => {

    setCreditCards([...creditCards, newCreditCard]);

    setNewCreditCard({ Titular: '', Numero: '', Validade: '', cvv: '' });
    setModalVisible(false);
  };

  // deletar o cartão
  const deleteCreditCard = (id) => {

    const updatedCreditCards = creditCards.filter(card => card.id !== id);
    setCreditCards(updatedCreditCards);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={creditCards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.cardItem}>
            <Text>{item.Titular}</Text>
            <Text>{item.Numero}</Text>
            <Text>{item.Validade}</Text>
            <TouchableOpacity onPress={() => deleteCreditCard(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Credit Card</Text>
      </TouchableOpacity>

      {/* Modal for adding new credit card */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Cardholder Name"
              value={newCreditCard.Titular}
              onChangeText={text => setNewCreditCard({ ...newCreditCard, Titular: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Card Number"
              value={newCreditCard.Numero}
              onChangeText={text => setNewCreditCard({ ...newCreditCard, Numero: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Expiration Date"
              value={newCreditCard.Validade}
              onChangeText={text => setNewCreditCard({ ...newCreditCard, Validade: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="CVV"
              value={newCreditCard.cvv}
              onChangeText={text => setNewCreditCard({ ...newCreditCard, cvv: text })}
            />
            <Button title="Add" onPress={addCreditCard} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cardItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  deleteButton: {
    color: 'red',
    marginTop: 5,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default CreditCardScreen;