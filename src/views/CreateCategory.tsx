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
import { addCategory } from '../redux/thunks/common';

type propType = {
  navigation: {
    navigate: Function;
    goBack: Function;
  };
};
const CreateCategory = ({ navigation }: propType) => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const user: User = useSelector((state: RootStateOrAny) => state.auth.user);
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(true);

  const shouldShowError = (variable: string) => {
    switch (variable) {
      case 'name': {
        return validator.isEmpty(name);
      }
      default: {
        return false;
      }
    }
  };
  useEffect(() => {
    setDisabled(shouldShowError('name'));
  }, [name]);

  return (
    <View style={style.mainContainer}>
      <Input
        labelStyle={{
          color: colorScheme === 'dark' ? 'white' : 'gray',
        }}
        label="Nombre de la categoría"
        value={name}
        onChangeText={(text) => {
          setName(text);
        }}
        placeholder="Nombre Eje: Efectivo, BAC"
        leftIcon={{ type: 'material-community', name: 'bookmark-outline' }}
      />
      <Button
        title="Crear Categoria"
        disabled={disabled}
        onPress={() => {
          dispatch(
            addCategory(user.token, name, () => {
              navigation.goBack();
            })
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

export default CreateCategory;
