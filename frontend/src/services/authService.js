import wiseWasteAPI from "../api/wiseWasteAPI";

export const registerUser = async (userData) => {
  const response = await wiseWasteAPI.post("/users/register", userData);
  return response.data;
};

export const loginUser = async (loginData) => {
  const response = await wiseWasteAPI.post("/users/login", loginData);
  return response.data;
};
