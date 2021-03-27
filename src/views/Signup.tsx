import React, { useEffect, useState } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Button, Input, withTheme } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { SIGNUP } from '../redux/thunks/auth';
import validator from 'validator';

const Signup = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(
      validator.isEmpty(email) ||
        validator.isEmpty(name) ||
        validator.isEmpty(password) ||
        shouldShowError('name') ||
        shouldShowError('email') ||
        shouldShowError('password')
    );
  }, [name, email, password]);

  const shouldShowError = (variable: string) => {
    switch (variable) {
      case 'name': {
        return (
          !validator.isEmpty(name) &&
          !validator.isAlpha(name.replace(/\s/g, ''))
        );
      }
      case 'email': {
        return !validator.isEmpty(email) && !validator.isEmail(email);
      }
      case 'password': {
        return (
          !validator.isEmpty(password) &&
          !validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
          })
        );
      }
    }
    return true;
  };
  return (
    <KeyboardAvoidingView behavior="height" style={style.formContainer}>
      <Input
        label="Tu nombre"
        placeholder="John Doe"
        errorStyle={{ color: '#B34A37' }}
        errorMessage={
          (shouldShowError('name') && 'Su nombre no puede tener numeros') || ''
        }
        leftIcon={{ type: 'ionicon', name: 'person-outline' }}
        value={name}
        onChangeText={(text) => {
          setName(text);
        }}
      />
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
        errorStyle={{ color: '#B34A37' }}
        errorMessage={
          (shouldShowError('password') &&
            'Su contraseña debe ser de 8 o mas caracteres, contener minimo una mayuscula una minuscula y un numero') ||
          ''
        }
        leftIcon={{ type: 'ionicon', name: 'lock-closed-outline' }}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
      />
      <Button
        title="Crear Cuenta"
        disabled={disabled}
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
