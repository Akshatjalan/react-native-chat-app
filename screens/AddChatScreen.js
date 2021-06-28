import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { db } from "../firebase";

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a New Chat",
      headerBackTitle: "Chats",
    });
  }, [navigation]);

  const createChat = async () => {
      await db.collection('chats').add({
          chatName: input,
      }).then(() => {
          navigation.goBack();
      }).catch((error) => alert(error));
  };
  
  
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a name for the Chat Room"
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={createChat}
      />
      <Button 
      buttonStyle={{backgroundColor: '#C41E3A'}}
      containerStyle={styles.button}
      onPress={createChat} title="Create a Chat Room"/>
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
      backgroundColor: "white",
      padding: 30,
      height: "100%",
      alignItems: "center",

  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
