import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:7000/",
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

/*API calls for User */
export const getUsers = () => {
  return api.get("api/v1/users");
};
export const createUser = (data) => {
  return api.post("api/v1/users", data);
};
export const getUserById = (id) => {
  return api.get(`api/v1/users/${id}`);
};
export const updateUserById = (data) => {
  return api.patch(`api/v1/users/${data.id}`, data);
};
export const deleteUserById = (id) => {
  return api.delete(`api/v1/users/${id}`);
};
