import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components/native";
// import { theme } from "./src/infrastructure/theme"; it also works without index.js
import { theme } from "./src/infrastructure/theme/index";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { Navigation } from "./src/infrastructure/navigation";

import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLsZJD3AiJMVx5qr1CufMbiOnLxm12htY",
  authDomain: "mealstogo-6a5e0.firebaseapp.com",
  projectId: "mealstogo-6a5e0",
  storageBucket: "mealstogo-6a5e0.appspot.com",
  messagingSenderId: "523925758476",
  appId: "1:523925758476:web:ffc3a142ab17ec1cb24429",
};

const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

export default function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // useEffect(() => {
  //   setTimeout(() => {
  //     signInWithEmailAndPassword(auth, "manyamharsha112@gmail.com", "123456")
  //       .then((user) => {
  //         console.log(user);
  //         setIsAuthenticated(true);
  //       })
  //       .catch((e) => {
  //         console.log("Authentication error:", e);
  //       });
  //   }, 2000);
  // }, []);

  let [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });
  let [latoLoaded] = useLato({
    Lato_400Regular,
  });
  if (!latoLoaded || !oswaldLoaded) return;

  // if (!isAuthenticated) return null;
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
// Code for App.js all modules involved here 
