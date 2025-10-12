import cleanWasteAPI from '../api/cleanWasteAPI';

export const registerUser = async (userData) => {
  const response = await cleanWasteAPI.post('/users/register', userData);
  return response.data;
};

export const loginUser = async (loginData) => {
  const response = await cleanWasteAPI.post('/users/login', loginData);
  return response.data;
};
