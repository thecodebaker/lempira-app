import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { useColorScheme } from 'react-native-appearance';
import User from '../Types/User';
import { createAccount } from '../redux/thunks/accounts';

// @ts-ignore
const CreateAccount = ({ navigation }) => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const user: User = useSelector((state: RootStateOrAny) => state.auth.user);
  const [currency, setCurrency] = useState('HNL');
  const [name, setName] = useState('');
  const [ammount, setAmmount] = useState('');
  return (
    <View style={style.mainContainer}>
      <Input
        value={name}
        onChangeText={(text) => {
          setName(text);
        }}
        placeholder="Nombre Eje: Efectivo, BAC"
        leftIcon={{ type: 'ionicon', name: 'bookmark-outline' }}
      />
      <Input
        placeholder="Valor inicial"
        value={`${ammount}`}
        onChangeText={(text) => {
          setAmmount(text);
        }}
        keyboardType="number-pad"
        leftIcon={{ type: 'ionicon', name: 'cash-outline' }}
      />
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
      <Button
        title="Crear Cuenta"
        onPress={() => {
          dispatch(
            createAccount(
              user.token,
              name,
              currency,
              Math.abs(Number(ammount) || 0),
              (Number(ammount) || 0) >= 0
            )
          );
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
        }}
        icon={{
          type: 'ionicon',
          name: 'add',
          color: 'white',
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: { flex: 1 },
});

export default CreateAccount;
