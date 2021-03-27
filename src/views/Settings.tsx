import React from 'react';
import { View } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { Avatar, ListItem } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { SIGNOUT } from '../redux/thunks/auth';
import User from '../Types/User';

const Settings = () => {
  const colorScheme = useColorScheme();

  const user: User = useSelector((state: RootStateOrAny) => state.auth.user);
  const dispatch = useDispatch();
  const list = [
    {
      title: 'Cerrar Sesión',
      icon: 'settings',
      onPress: () => {
        dispatch(SIGNOUT());
      },
    },
  ];
  return (
    <View>
      <ListItem>
        <Avatar
          rounded
          size={32}
          title={user.name}
          source={require('../L.png')}
        />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      {list.map((l, i) => (
        <ListItem key={i} bottomDivider onPress={l.onPress}>
          <Ionicons
            name={l.icon}
            size={32}
            color={colorScheme === 'dark' ? 'white' : 'gray'}
          />
          <ListItem.Content>
            <ListItem.Title>{l.title}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
};

export default Settings;
