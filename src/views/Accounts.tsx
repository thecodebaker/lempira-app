import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { ListItem, Icon } from 'react-native-elements';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import Account from '../Types/Account';
import User from '../Types/User';
import EmptyList from '../components/EmptyList';
import { getAccounts, deleteAccount } from '../redux/thunks/accounts';

type propType = {
  navigation: {
    navigate: Function;
  };
};
const Accounts = ({ navigation }: propType) => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const user: User = useSelector((state: RootStateOrAny) => state.auth.user);
  const signs: any = useSelector((state: RootStateOrAny) => state.common.signs);
  const accounts: Account[] = useSelector(
    (state: RootStateOrAny) => state.accounts.accounts
  );
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    dispatch(getAccounts(user.token));
  }, []);

  const onRefresh = useCallback(() => {
    dispatch(getAccounts(user.token, setRefreshing));
  }, []);

  return (
    <View style={style.mainContainer}>
      {accounts.length !== 0 ? (
        <ScrollView
          style={style.scrollContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {accounts.map((account) => (
            <ListItem
              key={account.accountId}
              bottomDivider
              onPress={() => {
                navigation.navigate({
                  name: 'AccountInfo',
                  params: {
                    account,
                  },
                });
              }}
              onLongPress={() => {
                Alert.alert(
                  'Borrar cuenta',
                  `¿Seguro que querés borrar la cuenta ${account.name}?`,
                  [
                    {
                      text: 'Si',
                      onPress: () => {
                        dispatch(deleteAccount(user.token, account.accountId));
                      },
                    },
                    { text: 'No' },
                  ]
                );
              }}
            >
              <Icon
                type="material-community"
                name={'cash-multiple'}
                size={32}
                color={colorScheme === 'dark' ? 'white' : 'gray'}
              />
              <ListItem.Content>
                <ListItem.Title>{account.name}</ListItem.Title>
                {account.hasMinimum && (
                  <ListItem.Subtitle style={{ color: 'gray' }}>
                    {`Balance Mínimo: ${
                      signs[account.currency]
                    } ${account.minimum.toFixed(2)}`}
                  </ListItem.Subtitle>
                )}
              </ListItem.Content>
              <ListItem.Subtitle
                style={{
                  color: account.balance < 0 ? '#B34A37' : '#37B94A',
                }}
              >
                {`${signs[account.currency]} ${account.balance.toFixed(2)}`}
              </ListItem.Subtitle>
            </ListItem>
          ))}
        </ScrollView>
      ) : (
        <EmptyList texto="No se encontraron cuentas para tu usuario" />
      )}
      <TouchableOpacity
        style={style.TAB}
        onPress={() => {
          navigation.navigate({ name: 'CreateAccount' });
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

export default Accounts;
