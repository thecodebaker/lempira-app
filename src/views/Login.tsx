import React, { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Text, Button, Input, withTheme } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import validator from 'validator';
import { LOGIN } from '../redux/thunks/auth';

// @ts-ignore
const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    setDisabled(
      validator.isEmpty(email) ||
        shouldShowError('email') ||
        shouldShowError('password')
    );
  }, [email, password]);

  const shouldShowError = (variable: string) => {
    switch (variable) {
      case 'email': {
        return !validator.isEmpty(email) && !validator.isEmail(email);
      }
      case 'password': {
        return validator.isEmpty(password);
      }
    }
    return false;
  };
  return (
    <KeyboardAvoidingView behavior="height" style={style.formContainer}>
      <Input
        label="Tu correo"
        placeholder="ejemplo@lempira.com"
        errorStyle={{ color: '#B34A37' }}
        errorMessage={
          (shouldShowError('email') && 'Ingrese un correo valido') || ''
        }
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
        disabled={disabled}
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
