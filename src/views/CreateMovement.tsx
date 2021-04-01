import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Input, Button, Text, ButtonGroup } from 'react-native-elements';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { useColorScheme } from 'react-native-appearance';
import User from '../Types/User';
import Account from '../Types/Account';
import validator from 'validator';
import { createMovement } from '../redux/thunks/movements';

// @ts-ignore
const CreateAccount = ({ navigation }) => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const user: User = useSelector((state: RootStateOrAny) => state.auth.user);
  const exchanges: any = useSelector(
    (state: RootStateOrAny) => state.common.exchanges
  );
  const accounts: Array<Account> = useSelector(
    (state: RootStateOrAny) => state.accounts.accounts
  );
  const [note, setNote] = useState('');
  const [account, setAccount] = useState(
    accounts.length !== 0 ? accounts[0].accountId : ''
  );
  const [currency, setCurrency] = useState(
    accounts.length !== 0 ? accounts[0].currency : 'HNL'
  );
  const [amount, setAmount] = useState('');
  const [disabled, setDisabled] = useState(true);

  const shouldShowError = (variable: string) => {
    switch (variable) {
      case 'amount': {
        return !validator.isEmpty(amount) && !validator.isNumeric(amount);
      }
    }
    return false;
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
          const account = accounts.find(
            (v) => v.accountId === value.toString()
          );
          setCurrency(account?.currency || 'HNL');
        }}
        dropdownIconColor={colorScheme === 'dark' ? 'white' : 'gray'}
        itemStyle={{
          color: colorScheme === 'dark' ? 'white' : 'gray',
        }}
        style={{
          color: colorScheme === 'dark' ? 'white' : 'gray',
        }}
      >
        {accounts.map((account) => {
          return (
            <Picker.Item
              label={account.name}
              value={account.accountId}
              key={account.accountId}
            />
          );
        })}
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
      <Input
        labelStyle={{
          color: colorScheme === 'dark' ? 'white' : 'gray',
        }}
        label="Nota en el movimiento"
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
