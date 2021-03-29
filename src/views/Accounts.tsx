import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useColorScheme } from 'react-native-appearance';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getAccounts, deleteAccount } from '../redux/thunks/accounts';
import Account from '../Types/Account';
import User from '../Types/User';

// @ts-ignore
const Accounts = ({ navigation }) => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const user: User = useSelector((state: RootStateOrAny) => state.auth.user);
  const signs: any = useSelector((state: RootStateOrAny) => state.common.signs);
  const accounts: Array<Account> = useSelector(
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
            onPress={() => {}}
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
            <Ionicons
              name={'cash-outline'}
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

export default Accounts;
