import React, {  useLayoutEffect, useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  StatusBar,
  View,
} from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Akshat ChatApp",
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const signin = async () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri:
            "https://i.postimg.cc/260tnyWx/chat-Appp-1.png",
        }}
        style={{ width: 170, height: 170, marginBottom: 30, borderRadius: 20 }}
      />
     
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Button 
        containerStyle={styles.button}
        buttonStyle={{backgroundColor: '#C41E3A'}}
        title="LOGIN"
        onPress={signin} />
      <Button
        onPress={() => navigation.navigate("Register")}
        titleStyle={{color: '#C41E3A'}}
        buttonStyle={{borderColor: '#C41E3A'}}
        containerStyle={styles.button}
        title="SIGN UP"
        type="outline"
      />
      
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
