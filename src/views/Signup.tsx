import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Text, Button, Input, Image, withTheme } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import LoginResponse from '../Types/LoginResponse';

const Signup = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  return (
    <KeyboardAvoidingView behavior="height" style={style.formContainer}>
      <Input
        label="Tu nombre"
        placeholder="John Doe"
        leftIcon={{ type: 'Ionicons', name: 'person-outline' }}
        value={name}
        onChangeText={(text) => {
          setName(text);
        }}
      />
      <Input
        label="Tu correo"
        placeholder="ejemplo@lempira.com"
        leftIcon={{ type: 'Ionicons', name: 'mail-outline' }}
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <Input
        label="Contraseña"
        secureTextEntry
        placeholder="Contraseña"
        leftIcon={{ type: 'Ionicons', name: 'lock-outline' }}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
      />
      <Button
        title="Crear Cuenta"
        onPress={() => {
          axios
            .post('http://192.168.1.6:3001/auth/login', { password, email })
            .then((resp: AxiosResponse<LoginResponse>) => {
              dispatch({
                type: 'SET_USER',
                payload: {
                  user: { token: resp.data.token, name: resp.data.name },
                },
              });
            })
            .catch((err) => {
              console.error(err);
            });
        }}
      />
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  formContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
export default withTheme(Signup, 'dark');
