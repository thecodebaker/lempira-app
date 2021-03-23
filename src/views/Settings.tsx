import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';

const Settings = () => {
  const dispatch = useDispatch();
  const list = [
    {
      title: 'Cerrar Sesión',
      icon: 'settings',
      onPress: () => {
        dispatch({
          type: 'SET_USER',
          payload: {
            user: {
              token: undefined,
              name: undefined,
            },
          },
        });
      },
    },
  ];
  return (
    <View>
      {list.map((l, i) => (
        <ListItem key={i} bottomDivider onPress={l.onPress}>
          <Ionicons name={l.icon} size={24} color="gray" />
          <ListItem.Content>
            <ListItem.Title>{l.title}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
};

export default Settings;
