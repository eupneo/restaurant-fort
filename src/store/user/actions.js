import { api } from "boot/axios";

export async function login({ commit, getters, dispatch }, payload) {
  const { username, password } = payload;
  console.log(payload);
  const { data } = await api.post(
    "auth/login",
    { username, password },
    {
      headers: {
        Authorization: "Basic " + btoa(username + ":" + password),
      },
    }
  );
  console.log(data);
  commit("updateToken", data.access_token);
  commit("updateDetails", data?.user);
  return data.user;
}
