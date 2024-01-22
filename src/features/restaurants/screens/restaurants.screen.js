import React, { useContext, useState } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";
import { StatusBar, TouchableOpacity, FlatList, View } from "react-native";

import { SafeArea } from "../../../components/utility/safe-area.component";

import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { FavouritesContext } from "../../../services/favourites/favourites.context";

import { Search } from "../components/search.component";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";

// import { blue500 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

// const SafeArea = styled.SafeAreaView`
//   flex: 1;
//   margin-top: ${StatusBar.currentHeight}px;
// `;

// const SearchContainer = styled.View`
//   padding: ${(props) => props.theme.space[3]};
// `;

export const RestaurantsScreen = ({ navigation }) => {
  // console.log(navigation);
  const { restaurants, isLoading, error } = useContext(RestaurantsContext);
  const [isToggled, setIsToggled] = useState(false);
  const { favourites } = useContext(FavouritesContext);

  return (
    <SafeArea>
      {isLoading && (
        <View style={{ position: "absolute", top: "50%", left: "50%" }}>
          <ActivityIndicator
            size={50}
            style={{ marginLeft: -25 }}
            animating={true}
            // color={blue500}
          />
        </View>
      )}
      {/* <SearchContainer>
        <Searchbar />
      </SearchContainer> */}
      {/* <Search /> */}
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {/* {isToggled && <FavouritesBar />}
       */}
      {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )}
      <FlatList
        data={restaurants}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RestaurantDetail", {
                  restaurant: item,
                })
              }
            >
              <Spacer position="bottom" size="large">
                <RestaurantInfoCard restaurant={item} />
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeArea>
  );
};
