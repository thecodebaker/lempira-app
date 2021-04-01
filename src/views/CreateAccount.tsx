import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { Input, Button, Text } from 'react-native-elements';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import User from '../Types/User';
import { createAccount } from '../redux/thunks/accounts';

type propType = {
  navigation: {
    navigate: Function;
    goBack: Function;
  };
};
const CreateAccount = ({ navigation }: propType) => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const user: User = useSelector((state: RootStateOrAny) => state.auth.user);
  const [currency, setCurrency] = useState('HNL');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [hasMinimum, setHasMinimum] = useState(false);
  const [minimum, setMinimum] = useState('');
  const [disabled, setDisabled] = useState(true);

  const shouldShowError = (variable: string) => {
    switch (variable) {
      case 'name': {
        return validator.isEmpty(name);
      }
      case 'amount': {
        return !validator.isEmpty(amount) && !validator.isNumeric(amount);
      }
      case 'minimum': {
        return !validator.isEmpty(minimum) && !validator.isNumeric(minimum);
      }
    }
    return false;
  };
  useEffect(() => {
    setDisabled(
      (hasMinimum && validator.isEmpty(minimum)) ||
        validator.isEmpty(amount) ||
        shouldShowError('name') ||
        shouldShowError('amount') ||
        shouldShowError('minimum')
    );
  }, [name, amount, hasMinimum, minimum]);

  return (
    <View style={style.mainContainer}>
      <Input
        labelStyle={{
          color: colorScheme === 'dark' ? 'white' : 'gray',
        }}
        label="Nombre de la cuenta"
        value={name}
        onChangeText={(text) => {
          setName(text);
        }}
        placeholder="Nombre Eje: Efectivo, BAC"
        leftIcon={{ type: 'material-community', name: 'bookmark-outline' }}
      />
      <Input
        labelStyle={{
          color: colorScheme === 'dark' ? 'white' : 'gray',
        }}
        label="Balance Inicial"
        errorStyle={{ color: '#B34A37' }}
        errorMessage={
          (shouldShowError('amount') && 'Ingrese un numero válido') || ''
        }
        placeholder="Balance inicial"
        value={amount}
        onChangeText={(text) => {
          setAmount(text.trim());
        }}
        keyboardType="number-pad"
        leftIcon={{ type: 'material-community', name: 'cash' }}
      />
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 12 }}>
        Moneda de la cuenta
      </Text>
      <Picker
        selectedValue={currency}
        onValueChange={(value) => {
          setCurrency(value.toString());
        }}
        dropdownIconColor={colorScheme === 'dark' ? 'white' : 'gray'}
        itemStyle={{
          color: colorScheme === 'dark' ? 'white' : 'gray',
        }}
        style={{
          color: colorScheme === 'dark' ? 'white' : 'gray',
        }}
      >
        <Picker.Item label="Lempira" value="HNL" />
        <Picker.Item label="Dolar" value="USD" />
        <Picker.Item label="Euro" value="EUR" />
      </Picker>
      <View style={style.section}>
        <Checkbox
          style={style.checkbox}
          value={hasMinimum}
          onValueChange={() => {
            setHasMinimum(!hasMinimum);
          }}
        />
        <Text
          onPress={() => {
            setHasMinimum(!hasMinimum);
          }}
          style={style.paragraph}
        >
          ¿La cuenta tiene balance minimo?
        </Text>
      </View>
      {hasMinimum && (
        <Input
          errorStyle={{ color: '#B34A37' }}
          errorMessage={
            (shouldShowError('minimum') && 'Ingrese un numero válido') || ''
          }
          labelStyle={{
            color: colorScheme === 'dark' ? 'white' : 'gray',
          }}
          label="Balance Mínimo"
          placeholder="Balance Mínimo"
          value={minimum}
          onChangeText={(text) => {
            setMinimum(text.trim());
          }}
          keyboardType="number-pad"
          leftIcon={{ type: 'material-community', name: 'cash' }}
        />
      )}
      <Button
        title="Crear Cuenta"
        disabled={disabled}
        onPress={() => {
          dispatch(
            createAccount(
              user.token,
              name,
              currency,
              Number(amount),
              hasMinimum,
              hasMinimum ? Number(minimum) : 0,
              () => {
                Alert.alert(
                  'Cuenta Creada',
                  `La cuenta ${name} fue creada con exito`,
                  [
                    {
                      text: 'OK',
                      onPress: () => {
                        navigation.goBack();
                      },
                    },
                  ]
                );
              }
            )
          );
        }}
        icon={{
          type: 'material-community',
          name: 'plus',
          color: 'white',
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: { flex: 1 },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});

export default CreateAccount;
