import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { Input, Button, Text, ButtonGroup } from 'react-native-elements';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import Account from '../Types/Account';
import Category from '../Types/Category';
import User from '../Types/User';
import { createMovement } from '../redux/thunks/movements';

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
  const exchanges: any = useSelector(
    (state: RootStateOrAny) => state.common.exchanges
  );
  const accounts: Account[] = useSelector(
    (state: RootStateOrAny) => state.accounts.accounts
  );
  const categories: Category[] = useSelector(
    (state: RootStateOrAny) => state.common.categories
  );
  const [note, setNote] = useState('');
  const [account, setAccount] = useState(
    accounts.length !== 0 ? accounts[0].accountId : ''
  );
  const [currency, setCurrency] = useState(
    accounts.length !== 0 ? accounts[0].currency : 'HNL'
  );
  const [category, setCategory] = useState(
    categories.find((a) => a.name === 'Sin Categoria')?._id || categories[0]._id
  );
  const [amount, setAmount] = useState('');
  const [disabled, setDisabled] = useState(true);

  const shouldShowError = (variable: string) => {
    switch (variable) {
      case 'amount': {
        return !validator.isEmpty(amount) && !validator.isNumeric(amount);
      }
      default: {
        return false;
      }
    }
  };
  useEffect(() => {
    setDisabled(validator.isEmpty(amount) || shouldShowError('amount'));
  }, [amount]);

  const buttons = ['Ingreso', 'Gasto'];
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <View style={style.mainContainer}>
      <ButtonGroup
        selectedButtonStyle={{
          backgroundColor: selectedIndex === 0 ? '#37B94A' : '#B34A37',
        }}
        onPress={setSelectedIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
      />
      <Input
        labelStyle={{
          color: colorScheme === 'dark' ? 'white' : 'gray',
        }}
        errorStyle={{ color: '#B34A37' }}
        errorMessage={
          (shouldShowError('amount') && 'Ingrese un numero válido') || ''
        }
        label="Total del movimiento"
        placeholder="Total del movimiento"
        value={amount}
        onChangeText={(text) => {
          setAmount(text.trim());
        }}
        keyboardType="number-pad"
        leftIcon={{ type: 'material-community', name: 'cash' }}
      />
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 12 }}>
        Cuenta del movimiento
      </Text>
      <Picker
        selectedValue={account}
        onValueChange={(value) => {
          setAccount(value.toString());
          const selectedAccount = accounts.find(
            (v) => v.accountId === value.toString()
          );
          setCurrency(selectedAccount?.currency || 'HNL');
        }}
        dropdownIconColor={colorScheme === 'dark' ? 'white' : 'gray'}
        itemStyle={{
          color: colorScheme === 'dark' ? 'white' : 'gray',
        }}
        style={{
          color: colorScheme === 'dark' ? 'white' : 'gray',
        }}
      >
        {accounts.map((accountItem: Account) => (
          <Picker.Item
            label={accountItem.name}
            value={accountItem.accountId}
            key={accountItem.accountId}
          />
        ))}
      </Picker>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 12 }}>
        Moneda del movimiento
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
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 12 }}>
        Categoria del movimiento
      </Text>
      <Picker
        selectedValue={category}
        onValueChange={(value) => {
          setCategory(value.toString());
        }}
        dropdownIconColor={colorScheme === 'dark' ? 'white' : 'gray'}
        itemStyle={{
          color: colorScheme === 'dark' ? 'white' : 'gray',
        }}
        style={{
          color: colorScheme === 'dark' ? 'white' : 'gray',
        }}
      >
        {categories.map((category) => (
          <Picker.Item
            key={category._id}
            label={category.name}
            value={category._id}
          />
        ))}
      </Picker>
      <Input
        labelStyle={{
          color: colorScheme === 'dark' ? 'white' : 'gray',
        }}
        label="Nota para el movimiento"
        value={note}
        onChangeText={(text) => {
          setNote(text);
        }}
        placeholder="Nota para el movimiento"
        leftIcon={{ type: 'material-community', name: 'bookmark-outline' }}
      />
      <Button
        title="Crear movimiento"
        disabled={disabled}
        onPress={() => {
          const accountObject = accounts.find((v) => v.accountId === account);
          let finalAmount = Math.abs(Number(amount));
          if (accountObject?.currency !== currency) {
            const exchange =
              exchanges[`${currency}_${accountObject?.currency}`];
            finalAmount *= exchange;
          }
          dispatch(
            createMovement(
              user.token,
              account,
              category,
              finalAmount,
              selectedIndex === 0,
              note,
              () => {
                Alert.alert(
                  'Movimiento Creado',
                  'Movimiento creado con exito',
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
          name: selectedIndex === 0 ? 'arrow-left' : 'arrow-right',
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
