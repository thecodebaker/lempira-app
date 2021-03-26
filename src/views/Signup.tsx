import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Button, Input, withTheme } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { SIGNUP } from '../redux/actions';

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
        leftIcon={{ type: 'ionicon', name: 'person-outline' }}
        value={name}
        onChangeText={(text) => {
          setName(text);
        }}
      />
      <Input
        label="Tu correo"
        placeholder="ejemplo@lempira.com"
        leftIcon={{ type: 'ionicon', name: 'mail-outline' }}
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <Input
        label="Contraseña"
        secureTextEntry
        placeholder="Contraseña"
        leftIcon={{ type: 'ionicon', name: 'lock-closed-outline' }}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
      />
      <Button
        title="Crear Cuenta"
        onPress={() => {
          dispatch(SIGNUP(email, password, name));
        }}
      />
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  formContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
export default withTheme(Signup, 'dark');
