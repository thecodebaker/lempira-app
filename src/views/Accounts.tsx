import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, ListItem, Icon } from 'react-native-elements';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useColorScheme } from 'react-native-appearance';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getAccounts } from '../redux/actions';
import Account from '../Types/Account';
import User from '../Types/User';

// @ts-ignore
const Accounts = ({ navigation }) => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const user: User = useSelector((state: RootStateOrAny) => state.auth.user);
  const accounts: Array<Account> = useSelector(
    (state: RootStateOrAny) => state.accounts.accounts
  );

  useEffect(() => {
    dispatch(getAccounts(user.token));
  }, []);
  return (
    <View style={style.mainContainer}>
      {accounts.map((account) => (
        <ListItem key={account.accountId} bottomDivider onPress={() => {}}>
          <Ionicons
            name={'cash-outline'}
            size={32}
            color={colorScheme === 'dark' ? 'white' : 'gray'}
          />
          <ListItem.Content>
            <ListItem.Title>{account.name}</ListItem.Title>
            <ListItem.Subtitle
              style={{
                color: 'gray',
              }}
            >
              {account.currency}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
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
  mainContainer: { flex: 1 },
  TAB: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
});

export default Accounts;
