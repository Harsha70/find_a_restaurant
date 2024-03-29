import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";

import {
  restaurantsRequest,
  restaurantsTransform,
} from "./restaurants.service";
import { LocationContext } from "../location/location.context";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { location } = useContext(LocationContext);

  const retrieveRestaurants = (loc) => {
    setIsLoading(true);
    setRestaurants([]);

    restaurantsRequest(loc)
      // .then((response) => console.log(response))
      .then(restaurantsTransform)
      .then((restaurantsresults) => {
        setRestaurants(restaurantsresults);
        setIsLoading(false);
        console.log("restaurants", loc);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (location) {
      const locationString = `${location.lat},${location.lng}`;
      retrieveRestaurants(locationString);
    }
  }, [location]);

  return (
    <RestaurantsContext.Provider
      value={{ restaurants: restaurants, isLoading: isLoading, error }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};
