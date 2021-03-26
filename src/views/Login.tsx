import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Text, Button, Input, withTheme } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RootStateOrAny, useDispatch } from 'react-redux';
import { LOGIN } from '../redux/actions';

// @ts-ignore
const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  return (
    <KeyboardAvoidingView behavior="height" style={style.formContainer}>
      <Input
        label="Tu correo"
        placeholder="ejemplo@lempira.com"
        leftIcon={{ type: 'ionicon', name: 'mail-outline' }}
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <Input
        label="Contraseña"
        secureTextEntry
        placeholder="Contraseña"
        leftIcon={{ type: 'ionicon', name: 'lock-closed-outline' }}
        onChangeText={(text) => {
          setPassword(text);
        }}
      />
      <Button
        title="Acceder"
        onPress={() => {
          dispatch(LOGIN(email, password));
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
export default Login;
