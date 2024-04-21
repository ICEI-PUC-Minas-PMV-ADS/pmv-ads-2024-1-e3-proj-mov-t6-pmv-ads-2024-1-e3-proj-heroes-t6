import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

export default function Sign_up() {
  const [db, setDB] = useState(null);
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');

  // Abrir o banco de dados e criar a tabela de usuários na inicialização
  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const dbInstance = await SQLite.openDatabase({
          name: 'UserDatabase.db',
          location: 'default',
        });

        console.log('Banco de dados aberto com sucesso');

        dbInstance.transaction((tx) => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT)',
            [],
            () => console.log('Tabela de usuários criada com sucesso'),
            (error) => console.error('Erro ao criar a tabela de usuários: ', error)
          );
        });

        setDB(dbInstance);
      } catch (error) {
        console.error('Erro ao abrir o banco de dados: ', error);
      }
    };

  initializeDatabase();

  // Não há necessidade de retornar uma função de limpeza aqui
}, []);


  const addUser = () => {
    if (!nomeCompleto || !email || !senha) return;

    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO Users (name, email, password) VALUES (?, ?, ?)',
        [nomeCompleto, email, senha],
        () => {
          console.log('Usuário adicionado com sucesso');
          setNomeCompleto('');
          setEmail('');
          setSenha('');
          fetchUsers();
        },
        (error) => console.error('Erro ao adicionar usuário: ', error)
      );
    });
  };

  const onPressVerification = () => {
    if (senha != confirmaSenha) {
      console.log('Ambas as senhas precisam ser iguais');
    } else {
      addUser();
    }
  };

  return (
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
      </View>

      <View>
        <TouchableOpacity
          style={styles.btnCadastrar}
          onPress={onPressVerification}>
          <Text style={styles.TxtbtnCadastrar}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputs: {
    borderBottomWidth: 1,
    fontSize: 20,
    width: 330,
    height: 60,
    alignSelf: 'center',
  },

  TxtbtnCadastrar: {
    fontSize: 20,
    alignSelf: 'center',
  },

  btnCadastrar: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    marginTop: 100,
    borderRadius: 20,
    height: 50,
    alignSelf: 'center',
    fontSize: 60,
  },
});
