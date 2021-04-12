import moment from 'moment';
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { ListItem, Icon, ButtonGroup, Text } from 'react-native-elements';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';

import 'moment/locale/es';
import Movement from '../Types/Movement';
import User from '../Types/User';
import AccordionItem from '../components/AccordionItem';
import { deleteMovement, getMovements } from '../redux/thunks/movements';

type propType = {
  navigation: {
    navigate: Function;
  };
};
const Movements = ({ navigation }: propType) => {
  moment.locale('es');
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const user: User = useSelector((state: RootStateOrAny) => state.auth.user);
  const signs: any = useSelector((state: RootStateOrAny) => state.common.signs);
  const movements: Movement[] = useSelector(
    (state: RootStateOrAny) => state.movements.movements
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [segmentedMoves, setSegmentedMoves] = useState<any[]>([]);
  const buttons = ['Mes', 'Cuentas'];

  useEffect(() => {
    dispatch(getMovements(user.token));
  }, []);

  useEffect(() => {
    const segment =
      selectedIndex === 0
        ? movements
            .map((m) => ({
              id: moment(m.createdAt).month(),
              name: moment(m.createdAt).format('MMMM'),
            }))
            .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
        : movements
            .map((m) => ({ id: m.accountId, name: m.accountName }))
            .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);
    setSegmentedMoves(segment);
  }, [movements, selectedIndex]);

  const onRefresh = useCallback(() => {
    dispatch(getMovements(user.token, setRefreshing));
  }, []);
  return (
    <View style={style.mainContainer}>
      <Text h4>Separar movimientos por:</Text>
      <ButtonGroup
        onPress={(s) => setSelectedIndex(s)}
        selectedIndex={selectedIndex}
        buttons={buttons}
      />
      <ScrollView
        style={style.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {segmentedMoves.map((segment) => {
          return (
            <AccordionItem title={segment.name} key={segment.id}>
              {movements
                .filter((m) =>
                  selectedIndex === 0
                    ? moment(m.createdAt).month() === segment.id
                    : segment.id === m.accountId
                )
                .map((movement) => (
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
                              dispatch(
                                deleteMovement(user.token, movement.movementId)
                              );
                            },
                          },
                          { text: 'No' },
                        ]
                      );
                    }}
                  >
                    <Icon
                      type="material-community"
                      name={`${
                        movement.isIncome ? 'arrow-left' : 'arrow-right'
                      }`}
                      size={32}
                      color={movement.isIncome ? '#37B94A' : '#B34A37'}
                    />
                    <ListItem.Content>
                      <ListItem.Title>{`${movement.accountName}`}</ListItem.Title>
                      <ListItem.Subtitle style={{ color: 'gray' }}>{`${moment(
                        movement.createdAt
                      ).format('DD/MM/YYYY hh:mm A')}`}</ListItem.Subtitle>
                      {movement.note !== '' && movement.note !== undefined && (
                        <ListItem.Subtitle style={{ color: 'gray' }}>
                          {movement.note}
                        </ListItem.Subtitle>
                      )}
                    </ListItem.Content>
                    <ListItem.Subtitle
                      style={{
                        color: colorScheme === 'dark' ? 'white' : 'gray',
                      }}
                    >
                      {`${
                        signs[movement.currency || 'HNL']
                      } ${movement.amount.toFixed(2)}`}
                    </ListItem.Subtitle>
                  </ListItem>
                ))}
            </AccordionItem>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        style={style.TAB}
        onPress={() => {
          navigation.navigate({ name: 'CreateMovement' });
        }}
      >
        <Icon
          raised
          reverse
          size={24}
          reverseColor="white"
          color="#37B94A"
          name="plus"
          type="material-community"
        />
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  mainContainer: { flex: 1 },
  TAB: {
    borderRadius: 100,
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
});
export default Movements;
