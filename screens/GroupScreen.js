import React, { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Image, Text } from "react-native-elements";
import { SocialIcon } from 'react-native-elements'

const GroupScreen = ({ navigation }) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "ChatApp info",
    });
  }, [navigation]);

  
  return (
    <View style={styles.container}>

         <Image
        source={{
          uri:
            "https://i.postimg.cc/260tnyWx/chat-Appp-1.png",
        }}
        style={{ width: 150, height: 150, marginBottom: 20, borderRadius: 20 }}
        />
        <Text style={{ marginTop: 10}} >
            ChatApp is a react native application with firebase as a backend where registered users can create rooms and chat with each others.
        </Text>
        <View style={{  flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <SocialIcon onPress={() => {
                    alert('https://www.linkedin.com/in/akshat-jalan/');
                  }} type='linkedin' />
            <SocialIcon light  onPress={() => {
                    alert('https://www.instagram.com/akshatxjalan/');
                  }} type='instagram'/>
            <SocialIcon onPress={() => {
                    alert('github.com/Akshatjalan');
                  }}  type='github' />

        </View>

        <Text style={{ fontSize: 15, marginTop: '100%'}} >Copyright &copy; Akshat Jalan </Text>
    </View>
    
  );
};

export default GroupScreen;

const styles = StyleSheet.create({
  container: {
      backgroundColor: "white",
      padding: 30,
      height: "100%",
      alignItems: "center",

  },
});
