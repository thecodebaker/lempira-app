import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { ListItem, Icon } from 'react-native-elements';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import Category from '../Types/Category';
import User from '../Types/User';
import { getCategories, removeCategory } from '../redux/thunks/common';

type propType = {
  navigation: {
    navigate: Function;
  };
};
const Categories = ({ navigation }: propType) => {
  const colorScheme = useColorScheme();

  const user: User = useSelector((state: RootStateOrAny) => state.auth.user);
  const categories: Category[] = useSelector(
    (state: RootStateOrAny) => state.common.categories
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories(user.token));
  }, []);
  return (
    <View style={style.mainContainer}>
      {categories.map((cat) => {
        return (
          <ListItem key={cat._id} bottomDivider>
            <Icon
              type="material-community"
              name="tag"
              size={32}
              color={colorScheme === 'dark' ? 'white' : 'gray'}
            />
            <ListItem.Content>
              <ListItem.Title>{cat.name}</ListItem.Title>
            </ListItem.Content>
            {cat.userId !== '-1' && (
              <Icon
                type="material-community"
                name="delete"
                size={32}
                onPress={() => {
                  Alert.alert(
                    'Borrar categoria',
                    `¿Seguro queres borrar la categoria ${cat.name}?`,
                    [
                      {
                        text: 'Si',
                        onPress: () => {
                          dispatch(removeCategory(user.token, cat._id));
                        },
                      },
                      { text: 'no' },
                    ]
                  );
                }}
                color={colorScheme === 'dark' ? 'white' : 'gray'}
              />
            )}
          </ListItem>
        );
      })}
      <TouchableOpacity
        style={style.TAB}
        onPress={() => {
          navigation.navigate({ name: 'CreateCategory' });
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
export default Categories;
