// Code for services available according to the location
import camelize from "camelize";

// import { locations } from "./location.mock";

export const locationRequest = (searchTerm) => {
  const live = "https://geocode-zsfkpci42a-uc.a.run.app";
  const local = "http://127.0.0.1:5001/mealstogo-6a5e0/us-central1";
  const host = process.env.NODE_ENV !== "development" ? local : live;
  console.log("geocode:----> ", host);
  return fetch(`${host}/geocode?city=${searchTerm}`).then((response) => {
    return response.json();
  });

  // return new Promise((resolve, reject) => {
  //   const locationMock = locations[searchTerm];
  //   if (!locationMock) {
  //     reject("not found");
  //   }
  //   resolve(locationMock);
  // });
};

export const locationTransform = (result) => {
  // console.log("result-->", result.results[0].geometry);
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};
