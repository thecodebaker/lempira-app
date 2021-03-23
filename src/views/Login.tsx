import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Text, Button, Input, withTheme } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import LoginResponse from '../Types/LoginResponse';

const Login = ({ navigation }) => {
  const user = useSelector((state: RootStateOrAny) => state.authReducer.user);
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  return (
    <KeyboardAvoidingView behavior="height" style={style.formContainer}>
      <Input
        label="Tu correo"
        placeholder="ejemplo@lempira.com"
        leftIcon={{ type: 'Ionicons', name: 'mail-outline' }}
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <Input
        label="Contraseña"
        secureTextEntry
        placeholder="Contraseña"
        leftIcon={{ type: 'Ionicons', name: 'lock-outline' }}
        onChangeText={(text) => {
          setPassword(text);
        }}
      />
      <Button
        title="Acceder"
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
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Signup');
        }}
      >
        <Text style={{ textDecorationLine: 'underline' }}>
          Crear una cuenta
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  formContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
export default withTheme(Login, 'dark');
