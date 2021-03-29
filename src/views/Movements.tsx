import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Alert,
} from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { ListItem, Icon, Button } from 'react-native-elements';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import 'moment/locale/es';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { deleteMovement, getMovements } from '../redux/thunks/movements';
import Movement from '../Types/Movement';
import User from '../Types/User';

// @ts-ignore
const Movements = ({ navigation }) => {
  moment.locale('es');
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const user: User = useSelector((state: RootStateOrAny) => state.auth.user);
  const signs: any = useSelector((state: RootStateOrAny) => state.common.signs);
  const movements: Array<Movement> = useSelector(
    (state: RootStateOrAny) => state.movements.movements
  );

  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    dispatch(getMovements(user.token));
  }, []);

  const onRefresh = useCallback(() => {
    dispatch(getMovements(user.token, setRefreshing));
  }, []);

  return (
    <View style={style.mainContainer}>
      <ScrollView
        style={style.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {movements.map((movement) => (
          <ListItem
            key={movement.movementId}
            bottomDivider
            onPress={() => {}}
            onLongPress={() => {
              Alert.alert(
                'Borrar movimiento',
                '¿Seguro que querés borrar este movimiento ?',
                [
                  {
                    text: 'Si',
                    onPress: () => {
                      dispatch(deleteMovement(user.token, movement.movementId));
                    },
                  },
                  { text: 'No' },
                ]
              );
            }}
          >
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
              <ListItem.Title>{`${movement.accountName}`}</ListItem.Title>
              <ListItem.Subtitle style={{ color: 'gray' }}>{`${moment(
                movement.createdAt
              ).format('DD/MM/YYYY HH:mm')}`}</ListItem.Subtitle>
              {movement.note !== '' && (
                <ListItem.Subtitle style={{ color: 'gray' }}>
                  {movement.note}
                </ListItem.Subtitle>
              )}
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
            navigation.navigate({ name: 'create' });
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
