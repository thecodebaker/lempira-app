import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { RootStateOrAny, useSelector } from 'react-redux';

const Movements = () => {
  const user = useSelector((state: RootStateOrAny) => state.authReducer.user);
  return (
    <View>
      <Text>Wenas del Movimientos</Text>
    </View>
  );
};

export default Movements;
