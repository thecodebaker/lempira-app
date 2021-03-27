import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { ButtonGroup, ListItem, Icon } from 'react-native-elements';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getMovements } from '../redux/thunks/movements';
import Movement from '../Types/Movement';
import User from '../Types/User';

const Movements = () => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const user: User = useSelector((state: RootStateOrAny) => state.auth.user);
  const movements: Array<Movement> = useSelector(
    (state: RootStateOrAny) => state.movements.movements
  );
  const buttons = ['Dia', 'Mes', 'Año'];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const signs: any = {
    HNL: 'L',
    USD: '$',
    EUR: '€',
  };
  useEffect(() => {
    dispatch(getMovements(user.token));
  }, []);

  const onRefresh = useCallback(() => {
    dispatch(getMovements(user.token, setRefreshing));
  }, []);

  return (
    <View style={style.mainContainer}>
      {/* <ButtonGroup
        onPress={setSelectedIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
      /> */}
      <ScrollView
        style={style.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {movements.map((movement) => (
          <ListItem key={movement.movementId} bottomDivider onPress={() => {}}>
            <Ionicons
              name={`${
                movement.isIncome
                  ? 'arrow-back-outline'
                  : 'arrow-forward-outline'
              }`}
              size={32}
              color={movement.isIncome ? '#37B94A' : '#B34A37'}
            />
            <ListItem.Content>
              <ListItem.Title>{`${movement.accountName} ${movement.name}`}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Subtitle
              style={{ color: colorScheme === 'dark' ? 'white' : 'gray' }}
            >
              {`${signs[movement.currency || 'HNL']} ${movement.amount.toFixed(
                2
              )}`}
            </ListItem.Subtitle>
          </ListItem>
        ))}
      </ScrollView>
      <View style={style.TAB}>
        <Icon
          raised
          reverse
          size={24}
          reverseColor="white"
          color="#37B94A"
          name="add"
          type="ionicon"
          onPress={() => {
            // navigation.navigate({ name: 'create' });
          }}
        />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  mainContainer: { flex: 1 },
  TAB: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
});
export default Movements;
