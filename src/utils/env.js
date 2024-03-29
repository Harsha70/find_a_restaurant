const liveHost = "https://us-central1-mealstogo-b2612.cloudfunctions.net";
const localHost = "http://127.0.0.1:5001/mealstogo-6a5e0/us-central1";

export const isDevelopment = process.env.NODE_ENV === "development";

export const host = isDevelopment ? localHost : liveHost;
