import React, { useState } from 'react';
import { View } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';

interface propType {
  title: string;
  children: React.ReactNode;
}
const AccordionItem = ({ title, children }: propType) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <ListItem
        onPress={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <ListItem.Content>
          <ListItem.Title>{title}</ListItem.Title>
        </ListItem.Content>
        <Icon
          type="material-community"
          name={`chevron-${isExpanded ? 'up' : 'down'}`}
        />
      </ListItem>
      <View
        style={{
          backgroundColor: 'red',
          flex: 1,
          display: isExpanded ? 'flex' : 'none',
        }}
      >
        {children}
      </View>
    </>
  );
};

export default AccordionItem;
