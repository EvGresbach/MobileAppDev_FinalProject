import React, {useState, useEffect, useRef} from 'react';
import { Button, Modal, Pressable, View, SafeAreaView, ScrollView, Text, TextInput } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { styles } from './Style';
import ListItem from './components/ListItem';

// const Tab = createBottomTabNavigator();
function App() {

  const [toDo, setToDo] = useState([]);
  const [text, onChangeText] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {

  }, [toDo]);

  const handleAddItem = () => {
    //close the modal
    setModalVisible(!modalVisible)

    //add the new item
    let newToDo = [...toDo]; 
    const date = new Date(); 
    let dateString = date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear();
    newToDo.push({title: text, date: dateString, completed:false});
    setToDo( newToDo); 

    //reset the text
    onChangeText("");
  }
  const handleCancelItem = () => {
    //close the modal
    setModalVisible(!modalVisible)
    //reset the text
    onChangeText("");
  }

  const handleToggleComplete = (item) => {
      const idx = toDo.findIndex(i => i.title == item.title);
      let newToDo = [...toDo]; 
      newToDo[idx].completed = !newToDo[idx].completed; 
      setToDo(newToDo);
  }

  // const listItems = toDo.map((i) => <Text> {i} </Text>)
  const currentTasks = useRef(null);
  currentTasks.current = toDo.filter(item => !item.completed).map((i) => 
    <ListItem item={i} toggleComplete={handleToggleComplete}/>
    // <View style={styles.toDoList}>
    //   <Text> {i.title} </Text> 
    //   <Text> {i.date} </Text> 
    // </View>
  );

  const completedTasks = useRef(null);
  completedTasks.current = toDo.filter(item => item.completed).map((i) => 
    <ListItem item={i} toggleComplete={handleToggleComplete}/>
    // <View style={styles.toDoList}>
    //   <Text> {i.title} </Text> 
    //   <Text> {i.date} </Text> 
    // </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to ToDoable!</Text>
      <Text style={styles.subtitle}>Current Tasks</Text>
      <ScrollView style={styles.scrollView}>
        <View>{currentTasks.current}</View>
      </ScrollView>
      <Text style={styles.subtitle}>Completed Tasks</Text>
      <ScrollView style={styles.scrollView}>
        <View>{completedTasks.current}</View>
      </ScrollView>
      <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Please enter a title</Text>
            <TextInput style={styles.input} onChangeText={onChangeText} value={text} placeholder="Exmple Title"/>
            <View style={styles.modalButtons}>
                <Pressable style={[styles.button, styles.buttonClose]} onPress={handleCancelItem}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={handleAddItem}
              >
                <Text style={styles.textStyle}>Add Item</Text>
              </Pressable>
            </View>
            
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Add Item</Text>
      </Pressable>
    </View>
    </SafeAreaView>
  );

  
}



export default App;

