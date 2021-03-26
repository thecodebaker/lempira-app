import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { RootStateOrAny, useSelector } from 'react-redux';
import User from '../Types/User';

const Movements = () => {
  const user: User = useSelector((state: RootStateOrAny) => state.auth.user);
  return (
    <View>
      <Text>Wenas del Movimientos</Text>
    </View>
  );
};

export default Movements;
