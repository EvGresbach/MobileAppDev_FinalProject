import React, {useState, useEffect, useRef} from 'react';
import { View, Text } from 'react-native';
import CheckBox from 'expo-checkbox';
import { styles } from '../Style';

function ListItem(props) {

    return (
      <View style={styles.listItem}>
         <CheckBox color="#247BA0" value={props.item.completed} onValueChange={() => props.toggleComplete(props.item)}/>
          <View style={styles.listItemRow}>
            <Text style={[styles.listItemText, props.item.completed ? styles.listItemCompleted : '']}> {props.item.title} </Text> 
            <Text style={props.item.completed ? styles.listItemCompleted : ''}> {props.item.date} </Text> 
          </View>
      </View>
    );
  }

  export default ListItem; 