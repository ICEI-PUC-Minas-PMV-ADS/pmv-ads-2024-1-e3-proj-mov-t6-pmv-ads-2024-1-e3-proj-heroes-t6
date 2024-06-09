import { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import api from '../../api/api';


export default function Sign_up() {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [perguntaSecreta, setPerguntaSecreta] = useState('');


  const addUser = () => {
    if (!nomeCompleto || !email || !senha) return;
    api.post('/signup', {
      name: nomeCompleto,
      email: email,
      password: senha
    }).then(Alert.alert('Cadastro realizado com sucesso.'))
    setNomeCompleto('');
    setEmail('');
    setSenha('');
    setConfirmaSenha('');
  }

  const onPressVerification = () => {
    if (senha != confirmaSenha) {
      console.log('Ambas as senhas precisam ser iguais');
    } else {
      addUser();
    }
  };

  return (
    <ScrollView>
    <View>
      <View>
        <TextInput
          placeholder="Nome Completo"
          style={styles.inputs}
          value={nomeCompleto}
          onChangeText={(text) => setNomeCompleto(text)}></TextInput>

        <TextInput
          placeholder="E-mail"
          style={styles.inputs}
          value={email}
          onChangeText={(text) => setEmail(text)}></TextInput>

        <TextInput
          placeholder="Senha"
          style={styles.inputs}
          value={senha}
          onChangeText={(text) => setSenha(text)}></TextInput>

        <TextInput
          placeholder="Confirmar Senha"
          style={styles.inputs}
          value={confirmaSenha}
          onChangeText={(text) => setConfirmaSenha(text)}></TextInput>

        <TextInput
          placeholder="Qual o nome do seu primeiro animal"
          style={styles.inputs}
          value={perguntaSecreta}
          onChangeText={(text) => setPerguntaSecreta(text)}></TextInput>
      </View>

      <View>
        <TouchableOpacity
          style={styles.btnCadastrar}
          onPress={onPressVerification}>
          <Text style={styles.TxtbtnCadastrar}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  inputs: {
    borderBottomWidth: 1,
    fontSize: 20,
    width: 330,
    height: 60,
    marginTop: 10,
    alignSelf: 'center',
  },

  TxtbtnCadastrar: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'white'
  },

  btnCadastrar: {
    backgroundColor: '#F26430',
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    marginTop: 60,
    borderRadius: 20,
    height: 50,
    alignSelf: 'center',
    fontSize: 60,
  },
});
