//File:safe-area.component
import { StatusBar, SafeAreaView, FlatList } from "react-native";
import styled from "styled-components/native";

// export const SafeArea = styled.SafeAreaView`
//   flex: 1;
//   margin-top: ${StatusBar.currentHeight}px;
// `;

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
  background-color: "#e84d4d";
  /* ${(props) => props.theme.colors.bg.primary}; */
`;
