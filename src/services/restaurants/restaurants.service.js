import { mockImages, mocks } from "./mock";
import camelize from "camelize";

export const restaurantsRequest = (location) => {
  const live = "https://placesnearby-zsfkpci42a-uc.a.run.app";
  const local = "http://127.0.0.1:5001/mealstogo-6a5e0/us-central1";
  const host = process.env.NODE_ENV !== "development" ? local : live;
  return fetch(`${host}/placesNearby?location=${location}`).then((res) => {
    return res.json();
    // return new Promise((resolve, reject) => {
    //   const mock = mocks[location];
    //   if (!mock) {
    //     reject("not found");
    //   }
    //   resolve(mock);
  });
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    // restaurant.photos = restaurant.photos.map((p) => {
    //   return mockImages[Math.ceil(Math.random() * mockImages.length)];
    // });
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });
  // console.log("mappedResults---> " + mappedResults);
  return camelize(mappedResults);
};
