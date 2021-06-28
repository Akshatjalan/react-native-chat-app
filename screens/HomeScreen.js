import React, { useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native";
import { StyleSheet, ScrollView } from "react-native";
import { Avatar } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomListItem from "../components/CustomListItem";
import { auth, db } from "../firebase";
import { SimpleLineIcons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    setLoading(false);

    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    setLoading(true);
    navigation.setOptions({
      title: "ChatApp Rooms",
      headerStyle: { backgroundColor: "#C41E3A" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
      headerLeft: () => (
        <View style={{ marginLeft: 15 }}>
            <Avatar rounded source={{ uri: "https://i.postimg.cc/260tnyWx/chat-Appp-1.png" }} />

        </View>
      ),
      headerRight: () => (
        <View
          style={{
            marginRight: 15,
            flexDirection: "row",
            width: 60,
            justifyContent: "space-between",
          }}
        >
        <TouchableOpacity
            onPress={() => navigation.navigate("AddChat")}
            activeOpacity={0.5}
          >
            <SimpleLineIcons name="bubble" size={24} color="white" />
          </TouchableOpacity>
        <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
        <SimpleLineIcons name="logout" size={24} color="white" />
        </TouchableOpacity>
        </View>
      ),
    });
    setLoading(false);
  }, [navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id: id,
      chatName: chatName,
    });
  };

  return (
    loading ? <ActivityIndicator size="large" color="gray" style={{ flex: 0.7 }}/> :
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
