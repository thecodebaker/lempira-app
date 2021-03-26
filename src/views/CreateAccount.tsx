import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { useColorScheme } from 'react-native-appearance';
import User from '../Types/User';

const CreateAccount = () => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const user: User = useSelector((state: RootStateOrAny) => state.auth.user);
  const [currency, setCurrency] = useState('');
  return (
    <View style={style.mainContainer}>
      <Text h1>Crear</Text>
      <Input
        placeholder="Nombre Eje: Efectivo, BAC"
        leftIcon={{ type: 'ionicon', name: 'bookmark-outline' }}
      />
      <Input
        placeholder="Valor inicial"
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
        icon={{
          type: 'ionicon',
          name: 'add',
          color: colorScheme === 'dark' ? 'white' : 'gray',
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: { flex: 1 },
});

export default CreateAccount;
