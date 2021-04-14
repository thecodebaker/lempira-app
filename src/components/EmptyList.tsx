import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon } from 'react-native-elements';

type propType = {
  texto: string;
};
const EmptyList = ({ texto }: propType) => {
  return (
    <View style={styles.noDataContainer}>
      <View style={{ flex: 1 }}>
        <Icon size={64} type="material-community" name="emoticon-sad-outline" />
      </View>
      <View style={{ flex: 2 }}>
        <Text h4>{texto}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
export default EmptyList;
