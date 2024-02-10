import React, { useRef, useState, useContext, useEffect } from "react";
// import { Camera } from "expo-camera";
import { Camera, CameraType } from "expo-camera";
import { IconButton, MD3Colors } from "react-native-paper";
import styled from "styled-components/native";
import { View, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "../../../components/typography/text.component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
`;

export const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef();
  const { user } = useContext(AuthenticationContext);

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
      navigation.goBack();
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <TouchableOpacity onPress={snap} style={styles.cameraContainer}>
      {/* <Text>press</Text> */}
      <IconButton
        icon="camera"
        iconColor={"blue"}
        size={40}
        mode="contained"
        // style={}
      />
      <ProfileCamera
        ref={(camera) => (cameraRef.current = camera)}
        type={Camera.Constants.Type.front}
        ratio={"16:9"}
      ></ProfileCamera>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column-reverse",
    backgroundColor: "transparent",
  },
});
