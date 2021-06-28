import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { auth } from "../firebase";
import * as ImagePicker from 'expo-image-picker';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("https://censur.es/wp-content/uploads/2019/03/default-avatar.png");


  const register = async () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL: image,
        });
        console.log(image);
      })
      .catch((error) => alert(error.message));
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginTop: 50, fontSize: 24, marginBottom: 10 }}>
        Create ChatApp Account
      </Text>
      <Image
        source={{
          uri:
            "https://i.postimg.cc/260tnyWx/chat-Appp-1.png",
        }}
        style={{ width: 150, height: 150, marginBottom: 20, borderRadius: 20 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
        />
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
        <TouchableOpacity style={styles.selectImage} onPress={selectImage}>
          <Text style={{ color: "white", alignSelf: "center" }}>Select profile picture (optional)</Text>
        </TouchableOpacity>
      </View>
      <Button 
      buttonStyle={{backgroundColor: '#C41E3A'}}
      containerStyle={styles.button}
       title="REGISTER" onPress={register}

       />
      <Button
        titleStyle={{color: '#C41E3A'}}
        onPress={() => navigation.navigate("Login")}
        buttonStyle={{borderColor: '#C41E3A'}}
        containerStyle={styles.button}
        title="LOGIN"
        type="outline"
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

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
  selectImage: {
    width: 250,
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 1,
    padding: 10,
    marginBottom: 25,
    color: "white",
    backgroundColor: '#d45057',
    borderColor: "transparent"
  }
});
